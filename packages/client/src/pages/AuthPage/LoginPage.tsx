import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { InputAdornment } from '@mui/material'

import { EAuthType } from '../../variables/eNums'

import { MAIN_PAGE, SIGN_UP_PAGE } from '../../variables/linksUrls'
import { AuthTextField } from '../../components/UI/MuiUI/TextFields/AuthTextField.styled'
import { AuthButton } from '../../components/UI/MuiUI/Buttons/AuthButton.styled'

import logoImage from '../../assets/logo.svg'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import './AuthPage.scss'

const LoginPage = () => {
  const [showPassword, isShowPassword] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleVisibilityPassword = useCallback(() => {
    isShowPassword(!showPassword)
  }, [showPassword])

  const handleNavigate = useCallback((path: string | undefined) => {
    if (path) {
      navigate(path)
    }
  }, [])

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">LOGIN</h1>
        <div className="auth_inputs">
          <AuthTextField
            variant="outlined"
            type="text"
            margin="none"
            size="small"
            label="Enter your login"
          />
          <AuthTextField
            variant="outlined"
            type={showPassword ? EAuthType.password : EAuthType.text}
            margin="none"
            size="small"
            label="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  className="auth_visibility"
                  onClick={() => {
                    handleVisibilityPassword()
                  }}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="auth_buttons">
          <AuthButton
            variant="contained"
            className="auth_btn login"
            onClick={() => handleNavigate(MAIN_PAGE)}
          >
            Login
          </AuthButton>
          <AuthButton
            variant="contained"
            className="auth_btn sign_up"
            onClick={() => handleNavigate(SIGN_UP_PAGE)}
          >
            Sign Up
          </AuthButton>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
