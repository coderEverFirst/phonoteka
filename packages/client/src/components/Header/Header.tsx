import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

import logoImage from '../../assets/logo.svg'

import { SearchTextField } from '../UI/MuiUI/SearchTextField.styled'

const Header = () => {
  return (
    <div className="header_container">
      <div className="header_wrapper">
        <div className="header_logo_content">
          <img className="header_logo" src={logoImage} alt="logo" />
          <div className="header_name">
            <span>Ph</span>onoteka
          </div>
        </div>
        <div className="header_function_content">
          <SearchTextField id="header_search" label="Search..." variant="outlined" />

          <Link to="/" className="header_log_out_link">
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
