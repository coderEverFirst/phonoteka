import React, { useCallback, useMemo } from 'react'
import './AuthPage.scss'
import { AuthTextField } from '../../components/UI/MuiUI/TextFields/AuthTextField.styled'
import logoImage from '../../assets/logo.svg'
import { AuthButton } from '../../components/UI/MuiUI/Buttons/AuthButton.styled'
import { useLocation, useNavigate } from 'react-router'

const RENDER_AUTH_LOGIN_DATA = {
  title: 'LOGIN',
  inputs: [
    {
      name: 'login',
      type: 'text',
      label: 'Enter your login',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Enter your password',
    },
  ],
  buttons: [
    {
      name: 'login',
      path: '/', //go to main component
      label: 'login',
    },
    {
      name: 'sign up',
      path: '/sign-up',
      label: 'to sign up',
      className: 'auth_registration_btn',
    },
  ],
}

const RENDER_AUTH_SIGNUP_DATA = {
  title: 'SIGN UP',
  inputs: [
    {
      name: 'login',
      type: 'text',
      label: 'Enter your login',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Enter your password',
    },
    {
      name: 'rePassword',
      type: 'password',
      label: 'Enter password again',
    },
  ],

  buttons: [
    {
      name: 'sign up',
      path: '/', //need create new user on server
      label: 'sign up',
      className: 'auth_registration_btn',
    },
    {
      name: 'login',
      label: 'to login',
      path: '/login',
    },
  ],
}

const AuthPage = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const renderData = useMemo(
    () => (pathname === '/login' ? RENDER_AUTH_LOGIN_DATA : RENDER_AUTH_SIGNUP_DATA),
    [pathname],
  )

  const handleNavigate = useCallback((path: string) => {
    navigate(path)
  }, [])

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">{renderData.title}</h1>
        {renderData.inputs.map(item => (
          <AuthTextField
            id={item.name}
            key={item.name}
            type={item.type}
            className="auth_input"
            variant="standard"
            label={item.label}
          />
        ))}

        <div className="auth_button_block">
          {renderData.buttons.map(item => (
            <AuthButton
              id={item.name}
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
