import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_CREAM_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const AuthTextField = styled(TextField)({
  '&.MuiTextField-root': {
    width: '100%',
    transition: '0.2s linear',

    '&:hover .MuiFormLabel-root': {
      color: MAIN_BLUE_COLOR,
    },
  },

  '& .MuiFormLabel-root': {
    color: MAIN_GRAY_COLOR,

    transition: '0.15s ease-out',
  },

  '& .MuiInputBase-root': {
    color: MAIN_GRAY_COLOR,

    '& fieldset': {
      transition: '0.2s linear',
      border: `1px solid  ${MAIN_DARK_CREAM_COLOR}`,
    },

    '&:hover fieldset': {
      borderColor: MAIN_BLUE_COLOR,
    },

    '&.Mui-focused fieldset': {
      border: `1px solid  ${MAIN_BLUE_COLOR}`,
    },
  },

  '&fieldset': {
    borderColor: MAIN_BLUE_COLOR,
  },

  '& label.Mui-focused': {
    color: MAIN_BLUE_COLOR,
  },
}) as typeof TextField
