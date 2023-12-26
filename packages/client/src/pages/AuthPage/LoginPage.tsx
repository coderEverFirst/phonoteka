import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { fromError, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { InputAdornment } from '@mui/material'
import { useCookies } from 'react-cookie'

import { LOGIN_MUTATION } from '../../apollo/mutation/authPage'
import { loginSchema } from '../../validations/authPageSchemas'

import { EAuthType } from '../../variables/eNums'

import LoaderOval from '../../components/UI/Loader/LoaderOval'
import Error from '../../components/UI/Error/Error'

import { MAIN_PAGE, SIGN_UP_PAGE } from '../../variables/linksUrls'
import { AuthTextField } from '../../components/UI/MuiUI/TextFields.styled/AuthTextField.styled'
import { AuthButton } from '../../components/UI/MuiUI/Buttons.styled/AuthButton.styled'

import logoImage from '../../assets/logo.svg'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import './AuthPage.scss'

const LoginPage = () => {
  const [showPassword, isShowPassword] = useState<boolean>(true)

  const navigate = useNavigate()

  const [LoginMutation, { data, loading, error: serverError }] = useMutation(LOGIN_MUTATION)

  const [, setCookie] = useCookies(['token'])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,

    onSubmit: async values => {
      try {
        await LoginMutation({
          variables: values,
        })
      } catch (serverError) {
        console.error('Sign up error!', fromError(serverError))
      }
    },
  })

  const { handleSubmit, handleChange, values, errors, touched, isValid } = formik

  const handleVisibilityPassword = useCallback(() => {
    isShowPassword(!showPassword)
  }, [showPassword])

  const handleNavigate = useCallback((path: string | undefined) => {
    if (path) {
      navigate(path)
    }
  }, [])

  useEffect(() => {
    const hasEmptyFields = Object.values(values).some(value => value === '')
    if (isValid && !hasEmptyFields) {
      if (data) {
        setCookie('token', data.login.token) //push token to cookies
        handleNavigate(MAIN_PAGE)
      }
    }
  }, [data])

  if (loading) return <LoaderOval height={50} width={50} label="Loading..." />

  const invalidLoginOrPassword = serverError?.message === 'Invalid login credentials'

  if (!invalidLoginOrPassword) {
    if (serverError) return <Error label={serverError?.message} />
  }

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">LOGIN</h1>

        <form className="auth_inputs" onSubmit={handleSubmit}>
          <AuthTextField
            variant="outlined"
            type={EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.email}
            label="Enter your email"
            value={values.email}
            onChange={handleChange}
            error={invalidLoginOrPassword ? true : touched.email && Boolean(errors.email)}
            helperText={invalidLoginOrPassword ? '' : touched.email && errors.email}
          />
          <AuthTextField
            variant="outlined"
            type={showPassword ? EAuthType.password : EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.password}
            label="Enter your password"
            value={values.password}
            onChange={handleChange}
            error={invalidLoginOrPassword ? true : touched.password && Boolean(errors.password)}
            helperText={invalidLoginOrPassword ? '' : touched.password && errors.password}
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

          {invalidLoginOrPassword && <div className="server_message">{serverError?.message}</div>}

          <div className="auth_buttons">
            <AuthButton variant="contained" className="auth_btn login" type="submit">
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
        </form>
      </div>
    </div>
  )
}

export default LoginPage
