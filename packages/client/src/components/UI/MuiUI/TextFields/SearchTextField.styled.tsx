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
    maxWidth: '180px',
  },

  '& .MuiFormLabel-root': {
    transition: '0.15s ease-out',
    top: '-8px',
    fontSize: '18px',
    width: '100%',
    color: MAIN_GRAY_COLOR,
  },

  '$ .MuiInputLabel-animated': {
    top: '10px',
  },

  '& label.Mui-focused': {
    top: '-8px',
    color: MAIN_BLUE_COLOR,
  },

  '& .MuiInputBase-input': {
    padding: '8px 20px',
    color: MAIN_BLUE_COLOR,
  },

  '& .MuiInputBase-root': {
    width: '100%',
    height: '100%',
    borderRadius: '10px',

    '& legend': {
      width: '45%',
    },

    '& fieldset': {
      transition: '0.2s linear',
      border: `solid 1px ${MAIN_DARKCREAM_COLOR}`,
    },

    '&.Mui-focused fieldset': {
      border: `solid 1px ${MAIN_BLUE_COLOR}`,
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
})
