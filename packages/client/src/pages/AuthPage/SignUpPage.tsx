import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'

import { InputAdornment } from '@mui/material'

import { EAuthType } from '../../variables/eNums'
import { LOGIN_PAGE, MAIN_PAGE } from '../../variables/linksUrls'

import { AuthTextField } from '../../components/UI/MuiUI/TextFields/AuthTextField.styled'
import { AuthButton } from '../../components/UI/MuiUI/Buttons/AuthButton.styled'

import logoImage from '../../assets/logo.svg'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import './AuthPage.scss'

const SignUpPage = () => {
  const [showPassword, isShowPassword] = useState<boolean>(false)
  const [showRePassword, isShowRePassword] = useState<boolean>(false)

  const navigate = useNavigate()

  const handleVisibilityPassword = useCallback(
    (name: string) => {
      if (name === 'password') return isShowPassword(!showPassword)
      isShowRePassword(!showRePassword)
    },
    [showPassword, showRePassword],
  )

  const handleNavigate = useCallback((path: string | undefined) => {
    if (path) {
      navigate(path)
    }
  }, [])

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">Sign Up</h1>
        <div className="auth_inputs">
          <AuthTextField
            variant="outlined"
            type="text"
            margin="none"
            size="small"
            name="login"
            label="Enter your login"
          />
          <AuthTextField
            variant="outlined"
            type={showPassword ? EAuthType.password : EAuthType.text}
            margin="none"
            size="small"
            name="password"
            label="Enter your password"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  className="auth_visibility"
                  onClick={() => {
                    handleVisibilityPassword('password')
                  }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </InputAdornment>
              ),
            }}
          />
          <AuthTextField
            variant="outlined"
            type={showRePassword ? EAuthType.password : EAuthType.text}
            margin="none"
            size="small"
            name="rePassword"
            label="Enter again your password"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="start"
                  className="auth_visibility"
                  onClick={() => {
                    handleVisibilityPassword('rePassword')
                  }}
                >
                  {showRePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            Sign Up
          </AuthButton>
          <AuthButton
            variant="contained"
            className="auth_btn sign_up"
            onClick={() => handleNavigate(LOGIN_PAGE)}
          >
            Login
          </AuthButton>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
