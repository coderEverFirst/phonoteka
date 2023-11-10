import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import {
  MAIN_BLUE_COLOR,
  MAIN_DARKCREAM_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const SearchTextField = styled(TextField)({
  '&.MuiTextField-root': {
    width: '100%',
    height: '100%',
    maxWidth: '500px',
  },

  '& .MuiFormLabel-root': {
    transition: '0.15s ease-out',
    fontSize: '18px',
    width: '100%',
    color: MAIN_GRAY_COLOR,
  },

  '& label.Mui-focused': {
    color: MAIN_BLUE_COLOR,
  },

  '& .MuiInputBase-input': {
    color: MAIN_BLUE_COLOR,
  },

  '& .MuiInputBase-root': {
    width: '100%',
    height: '100%',
    borderRadius: '10px',

    '& fieldset': {
      transition: '0.2s linear',
      border: `1px solid  ${MAIN_DARKCREAM_COLOR}`,
    },

    '&.Mui-focused fieldset': {
      border: `1px solid  ${MAIN_BLUE_COLOR}`,
    },
  },

  '&:hover': {
    '& .MuiFormLabel-root': {
      color: MAIN_BLUE_COLOR,
    },

    '& .MuiInputBase-root': {
      '& fieldset': {
        color: MAIN_BLUE_COLOR,
        borderColor: MAIN_BLUE_COLOR,
      },
    },
  },
  '& .MuiSvgIcon-root': {
    cursor: 'pointer',
    transition: '0.3s linear',
    color: MAIN_GRAY_COLOR,
    '&:hover': { color: MAIN_BLUE_COLOR },
  },
})
