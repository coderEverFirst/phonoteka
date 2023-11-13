import styled from '@emotion/styled'
import { Button } from '@mui/material'
import {
  MAIN_DARK_CREAM_COLOR,
  MAIN_DARK_CREAM_HOVER_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const AuthButton = styled(Button)({
  '&.MuiButtonBase-root': {
    height: '100%',
    padding: '5px 40px',
    borderRadius: '5px',
    color: MAIN_GRAY_COLOR,
    backgroundColor: MAIN_DARK_CREAM_HOVER_COLOR,
    whiteSpace: 'nowrap',
  },

  '& .MuiTouchRipple-root': {
    color: MAIN_DARK_CREAM_COLOR,
  },
})
