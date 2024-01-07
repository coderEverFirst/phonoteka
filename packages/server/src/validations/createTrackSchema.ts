import * as yup from 'yup'

export const createTrackSchema = yup.object().shape({
  bandId: yup.number().required('Band name is a required field'),
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
})
