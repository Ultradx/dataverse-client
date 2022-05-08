import React from 'react'
import Articles from '../articles/Articles'
import Sidebar from '../sidebar/Sidebar'
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <Articles />
    </div>
  )
}

export default Home
