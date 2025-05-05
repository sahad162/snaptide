const multer = require('multer');
const path = require('path'); 

const fs = require('fs');
const dir = './uploads';
const imageDir = './uploads/images';
const videoDir = './uploads/videos';


[dir, imageDir, videoDir].forEach(directory => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const fileType = file.mimetype.split('/')[0]; 

    if (fileType === 'image') {
      callback(null, './uploads/images'); 
    } else if (fileType === 'video') {
      callback(null, './uploads/videos'); 
    } else {
      callback(new Error('Invalid file type'), './uploads'); 
    }
  },
  filename: (req, file, callback) => {
    
    const filename = `file-${Date.now()}${path.extname(file.originalname)}`; 
    callback(null, filename); 
  }
});

// File filter to only allow certain types
const fileFilter = (req, file, callback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
  
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true); // Accept file
  } else {
    callback(new Error('Unsupported file type'), false); // Reject file
  }
};

// Create the multer upload instance
const uploadfile = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 
  }
});

module.exports = uploadfile.array('postMedia');