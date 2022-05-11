import React, { useEffect, useState } from 'react'
import './header.css'
import './style.css'
import './sideNav.css'
import Logo from '../../assets/logo-xl.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchQuery, selectQuery } from '../../redux/search'
import { show, hide, check, selectShow } from '../../redux/showCategory'

const Header = () => {
  const navigate = useNavigate()
  const showValue = useSelector(selectShow)
  const dispatch = useDispatch()
  const [inputValue, setInputValue] = useState('')
  // const [headerQuery, setHeaderQuery] = useState('')

  useEffect(() => {}, [])

  const searchButton = (e) => {
    e.preventDefault()
    dispatch(searchQuery(inputValue))
  }

  const showCategory = (e) => {
    e.preventDefault()
    if (showValue.show) {
      dispatch(hide())
    } else {
      dispatch(show())
    }
  }

  useEffect(() => {
  }, [showValue])

  return (
    <div className="header">
      <div className="header-left">
        <a className="header-logo" href="/">
          <img src={Logo} />
        </a>
        <div className="search-box">
          <input
            type="text"
            className="search-txt"
            placeholder="Type to search"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <a className="search-btn" onClick={searchButton}>
            <i className="pi pi-search"></i>
          </a>
        </div>
        <button className="button-shower" onClick={showCategory}>
          <i className="pi pi-bars"></i>
        </button>
      </div>
      <div className="header-center"></div>
      <ul className={`${showValue.show == false ? 'header-right' : 'header-right-show'}`}>
        <li onClick={() => navigate('/')}>Home</li>
        <li onClick={() => navigate('/createArticle')}>Create</li>
        <li>About</li>
      </ul>
    </div>
  )
}

export default Header
