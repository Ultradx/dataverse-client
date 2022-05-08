import React from 'react'
import './header.css'
import Logo from '../../assets/logo-xl.png'
import { useNavigate} from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className="header">
      <div className="header-left">
        <a className="header-logo" href="/">
          <img src={Logo} />
        </a>
        <button type="button" className="header-button pi pi-align-justify" />
      </div>
      <ul className='header-right'>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/createArticle')}>Create</li>
        <li>About</li>
      </ul>
    </div>
  )
}

export default Header
