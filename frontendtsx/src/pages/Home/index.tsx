import React from 'react'
import Card from '../../components/card';
import Navbar from '../../components/navbar';

const Home = () => {

  return (
    <div className="flex">
        <Navbar />
        <div className="flex-grow p-4">
        <Card />
        </div>
      </div>
  )
}

export default Home