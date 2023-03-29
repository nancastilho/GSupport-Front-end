import React from 'react';

function TrelloCard() {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-80">
      <h2 className="text-lg font-medium mb-2">Card Title</h2>
      <p className="text-gray-600 mb-4">Card description goes here</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src="https://i.pravatar.cc/32" alt="User avatar" className="rounded-full w-6 h-6 mr-2" />
          <span className="text-gray-600 text-sm font-medium">User Name</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 text-sm font-medium mr-2">4 comments</span>
          <span className="text-gray-600 text-sm font-medium">6 days ago</span>
        </div>
      </div>
    </div>
  );
}

export default TrelloCard;
