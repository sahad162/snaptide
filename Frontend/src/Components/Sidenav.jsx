import React from 'react'
import icon from '../assets/logosnap.png'
import { Link } from 'react-router-dom'

function Sidenav() {
  return (
    <div className='d-flex justify-content-center align-items-center mt-1'>
      <ul className='mt-5 ms-5 nav-list'>
        <li className='list-style' style={{height:'80px',width:'80px'}}>
          <Link style={{textDecoration:'none',color:'#fff'}}>
            <img src={icon} className='img-fluid' alt="icon snaptide" />
          </Link>
        </li>
        <li className='list-style'>
          <Link style={{textDecoration:'none',color:'#fff'}}>
            <span className='d-flex align-items-center gap-3'>
              <i className="fa-solid fa-house"></i>
              <span className='fw-semibold'>Home</span>
            </span>
          </Link>
        </li>
        <li className='list-style'>
          <Link style={{textDecoration:'none',color:'#fff'}}>
            <span className='d-flex align-items-center gap-3'>
              <i className="fa-solid fa-magnifying-glass"></i>
              <span className='fw-semibold'>Explore</span>
            </span>
          </Link>
        </li>
        <li className='list-style'>
          <Link style={{textDecoration:'none',color:'#fff'}}>
            <span className='d-flex align-items-center gap-3'>
              <i className="fa-solid fa-bell"></i>
              <span className='fw-semibold'>Notifications</span>
            </span>
          </Link>
        </li>
        <li className='list-style'>
          <Link style={{textDecoration:'none',color:'#fff'}}>
            <span className='d-flex align-items-center gap-3'>
              <i className="fa-solid fa-envelope"></i>
              <span className='fw-semibold'>Messages</span>
            </span>
          </Link>
        </li>
        <li className='list-style'>
          <Link style={{textDecoration:'none',color:'#fff'}}>
            <span className='d-flex align-items-center gap-3'>
              <i className="fa-solid fa-user"></i>
              <span className='fw-semibold'>Profile</span>
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidenav