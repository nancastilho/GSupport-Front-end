import React from 'react'
import Card from '../../components/card';
import Navbar from '../../components/navbar';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {BsFillPlusSquareFill} from 'react-icons/bs'

const Home = () => {
  const navigate: NavigateFunction = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token")
    navigate("/")
  }
  return (
    <div className="flex">
        <Navbar handleLogout={handleLogout} />
        <div className="flex-grow p-4">
        <Card />
        </div>
        <div className='absolute bottom-10 right-10'>
        <BsFillPlusSquareFill size={60}/>
        </div>
        
      </div>

  )
}

export default Home