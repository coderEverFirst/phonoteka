import React from 'react'
import { Link } from 'react-router-dom'
import { InputAdornment } from '@mui/material'
import logoImage from '../../assets/logo.svg'
import SearchIcon from '@mui/icons-material/Search'
import { SearchTextField } from '../UI/MuiUI/TextFields/SearchTextField.styled'

import './Header.scss'

const Header = () => {
  const scrollUpWindow = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <div className="header_wrapper">
      <div className="header_container">
        <div className="header_logo_content" onClick={scrollUpWindow}>
          <img className="header_logo" src={logoImage} alt="logo" />
          <div className="header_name">
            <span>Ph</span>onoteka
          </div>
        </div>
        <div className="header_function_content">
          <SearchTextField
            id="header_search"
            label="Search..."
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className="header_input_block">
                  <div className="header_input_hotkey">Ctrl+K</div>
                  <SearchIcon className="header_input_search" />
                </InputAdornment>
              ),
            }}
          />
          <Link to="/login" className="header_log_out_link">
            Log out
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
