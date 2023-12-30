import * as yup from 'yup'

export const createBandSchema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  foundationDate: yup.string().required('Foundation date is a required field'),
  image: yup.string(),
  location: yup.string(),
  tracks: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Track name is required'),
      album: yup.string().required('Track album is required'),
      genre: yup.string().required('Genre is a required field'),
      year: yup
        .string()
        .required('Track year is required')
        .matches(/^\d{4}$/, 'Must be exactly 4 digits'),
      format: yup
        .string()
        .required('Track format is required')
        .matches(
          /^(mp3|wav|flac|ogg|m4a|aac|wma)$/i,
          'Invalid music format, allowed: mp3, wav, flac, ogg, m4a, aac, wma',
        ),
      url: yup.string(),
    }),
  ),
  about: yup.string(),
  description: yup.string(),
  members: yup.string(),
})
