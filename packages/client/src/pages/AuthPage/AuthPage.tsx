import React, { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { InputAdornment, Checkbox } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import { EAuthType } from '../../variables/eNums'
import {
  MAIN_BLUE_COLOR,
  MAIN_GRAY_COLOR,
  RENDER_AUTH_LOGIN_DATA,
  RENDER_AUTH_SIGNUP_DATA,
} from '../../variables/variables'

import { AuthTextField } from '../../components/UI/MuiUI/TextFields/AuthTextField.styled'
import { AuthButton } from '../../components/UI/MuiUI/Buttons/AuthButton.styled'

import logoImage from '../../assets/logo.svg'

import './AuthPage.scss'

const AuthPage = () => {
  const [showPassword, isShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const renderData = useMemo(
    () => (pathname === '/login' ? RENDER_AUTH_LOGIN_DATA : RENDER_AUTH_SIGNUP_DATA),
    [pathname],
  )

  const handleNavigate = useCallback((path: string | undefined) => {
    if (path) {
      navigate(path)
    }
  }, [])

  const handleVisibilityPassword = useCallback(() => {
    isShowPassword(!showPassword)
  }, [showPassword])

  const getVisibilityPassword = (type: string) => {
    if (type === EAuthType.password) {
      return showPassword ? EAuthType.text : EAuthType.password
    }
    return type
  }

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">{renderData.title}</h1>
        {renderData.inputs.map(item => (
          <AuthTextField
            key={item.id}
            type={getVisibilityPassword(item.type)}
            InputProps={
              item.type === EAuthType.password && pathname === '/login'
                ? {
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
                  }
                : undefined
            }
            className="auth_input"
            variant="standard"
            label={item.label}
          />
        ))}
        {pathname === '/sign-up' && (
          <div className="auth_showvisibility">
            <Checkbox
              checked={showPassword}
              onChange={handleVisibilityPassword}
              sx={{
                color: MAIN_GRAY_COLOR,
                '&.Mui-checked': {
                  color: MAIN_BLUE_COLOR,
                },
              }}
            />
            <span className={`auth_showvisibility_text ${showPassword && 'active'}`}>
              Show Password
            </span>
          </div>
        )}
        <div className={`auth_button_block ${pathname === '/login' ? 'auth_login' : ''}`}>
          {renderData.buttons.map(item => (
            <AuthButton
              key={item.name}
              variant="contained"
              className={`auth_btn ${item.name === 'login' ? '' : 'auth_registration_btn'}`}
              onClick={() => handleNavigate(item.path)}
            >
              {item.label}
            </AuthButton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
