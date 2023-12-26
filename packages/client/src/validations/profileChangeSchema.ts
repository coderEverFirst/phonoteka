import * as yup from 'yup'

export const profileChangesSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid').required('Email is a required field'),
  name: yup.string().required('Username is a required field'),
})
