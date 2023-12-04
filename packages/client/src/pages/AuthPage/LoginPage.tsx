import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router'
import { fromError, useMutation } from '@apollo/client'
import { useFormik } from 'formik'
import { InputAdornment } from '@mui/material'
import { useCookies } from 'react-cookie'

import { LOGIN_MUTATION } from '../../apollo/mutation/authPage'
import { loginSchema } from '../../validations/authPageSchemas'

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

  const [LoginMutation, { data, loading, error }] = useMutation(LOGIN_MUTATION)
  console.log(data)

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
      } catch (error) {
        console.error('Sign up error!', fromError(error))
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

  const handleOnSubmitForm = () => {
    const hasEmptyFields = Object.values(values).some(value => value === '')

    handleSubmit()

    // returns first undefined
    if (isValid && !hasEmptyFields && data) {
      console.log('token', data?.login.token)
      setCookie('token', data?.login.token)
      handleNavigate(MAIN_PAGE)
    }
  }

  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`

  return (
    <div className="auth_wrapper">
      <div className="auth_container">
        <img src={logoImage} alt="Logo" className="auth_logo" />
        <h1 className="auth_title">LOGIN</h1>
        <form className="auth_inputs" onSubmit={handleOnSubmitForm}>
          <AuthTextField
            variant="outlined"
            type={EAuthType.text}
            margin="none"
            size="small"
            name={EAuthType.email}
            label="Enter your email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
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
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
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
          <div className="auth_buttons">
            <AuthButton variant="contained" className="auth_btn login" onClick={handleOnSubmitForm}>
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
