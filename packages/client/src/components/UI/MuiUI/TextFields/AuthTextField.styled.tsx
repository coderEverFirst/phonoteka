import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import { MAIN_BLUE_COLOR, MAIN_GRAY_COLOR } from '../../../../variables/variables'

export const AuthTextField = styled(TextField)({
  '&.MuiTextField-root': {
    width: '100%',
    height: '100%',
  },

  '& .MuiFormLabel-root': {
    transition: '0.15s ease-out',
    top: '2px',
    left: '15px',
    width: '100%',
    color: MAIN_GRAY_COLOR,
  },
  // '& label': {
  //   top: '-5px',
  // },

  '& .MuiFormLabel-root.Mui-focused': {
    top: '2px',
  },

  '& label.Mui-focused': {
    color: MAIN_BLUE_COLOR,
  },

  '& .MuiInputBase-input': {
    padding: '8px 20px',
    color: MAIN_BLUE_COLOR,
  },

  '& .MuiInput-underline:after': {
    borderBottom: `2px solid ${MAIN_BLUE_COLOR}`,
  },
})
