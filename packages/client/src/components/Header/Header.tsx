import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

import logoImage from '../../assets/logo.svg'

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_wrapper">
        <div className="header_logo_name">
          <img className="header_logo" src={logoImage} alt="logo" />
          <div className="header_name">
            <span>Ph</span>onoteka
          </div>
        </div>
        <Link to="/" className="header_log_out_link">
          Log out
        </Link>
      </div>
    </div>
  )
}

export default Header
