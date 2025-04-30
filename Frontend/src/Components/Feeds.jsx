import React from 'react';
import { useState } from 'react';

function Feeds() {
  const [activeTab, setActiveTab] = useState('forYou');
  return (
    <div className="container">
      <div className="tab-container">
        <div 
          className={`tab-btn ${activeTab === 'forYou' ? 'active' : ''}`}
          onClick={() => setActiveTab('forYou')}
        >
          For you
        </div>
        <div 
          className={`tab-btn ${activeTab === 'following' ? 'active' : ''}`}
          onClick={() => setActiveTab('following')}
        >
          Following
        </div>
      </div>
      
      <div className="tab-content">
        {activeTab === 'forYou' && (
          <div className="for-you-content">
            <p>For you content will appear here</p>
          </div>
        )}
        
        {activeTab === 'following' && (
          <div className="following-content">
            <p>Following content will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
  
}

export default Feeds
