import React, { useEffect, useState } from 'react';
import Posts from './Posts';
import { allposts } from '../services/allAPI';

function Feeds() {
  const [activeTab, setActiveTab] = useState('forYou');
  const [postdata,setpostdata]=useState([]);

  const allpostfeed=async ()=>{
    try{
      let reqHeader={
        "authorization":`Bearer ${localStorage.getItem('token')}`
      }
      let response=await allposts(reqHeader);
      if(response.status==200){
        setpostdata(response.data.posts)
      }
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    allpostfeed()
  },[])



  return (
    <div
      className="container feeds"
      style={{ maxHeight: '100vh', overflowY: 'auto'}}
    >
      {/* Sticky Tabs */}
      <div
        className="tab-container"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: "rgba(255, 255, 255, 0.4)",  // White background with transparency
          backdropFilter: "blur(10px)",  // Blur effect behind the container
          border: "1px solid rgba(255, 255, 255, 0.2)",  // Subtle white border
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: '10px 0',
        }}
      >
        <div
          className={`tab-btn ${activeTab === 'forYou' ? 'active' : ''}`}
          onClick={() => setActiveTab('forYou')}
          style={{ cursor: 'pointer', color: '#fff' }}
        >
          For you
        </div>
        <div
          className={`tab-btn ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
          style={{ cursor: 'pointer', color: '#fff' }}
        >
          Following
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="tab-content " style={{marginTop:'-30px'}}>
        {activeTab === 'forYou' && (
          <div className="for-you-content">
            {
              postdata.length>0&&
              postdata.map((post)=>(
                <Posts activeTab={activeTab} post={post}/>
              ))

            }

          </div>
        )}
        {activeTab === 'following' && (
          <div className="following-content">
            <Posts activeTab={activeTab} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Feeds;
