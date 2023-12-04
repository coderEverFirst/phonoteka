import * as yup from 'yup'

export const signUpSchema = yup.object().shape({
  username: yup.string().required('Username is a required field'),
  email: yup.string().email().required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(5, 'Password is too short - should be 5 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  rePassword: yup
    .string()
    .required('Confirm password is a required field')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .min(5, 'Password is too short - should be 5 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})

export const loginSchema = yup.object().shape({
  email: yup.string().email().required('Email is a required field'),
  password: yup
    .string()
    .required('Password is a required field')
    .min(5, 'Password is too short - should be 5 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
})
