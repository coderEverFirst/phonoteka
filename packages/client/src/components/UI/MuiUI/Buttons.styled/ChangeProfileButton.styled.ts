import styled from '@emotion/styled'
import { Button } from '@mui/material'
import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_CREAM_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const ChangeProfileButton = styled(Button)({
  '&.MuiButtonBase-root': {
    height: '100%',
    padding: '5px 20px',
    borderRadius: '10px',

    color: MAIN_GRAY_COLOR,
    backgroundColor: MAIN_DARK_CREAM_COLOR,

    fontWeight: 600,

    whiteSpace: 'nowrap',
    transition: '0.3s linear',

    '&:hover': {
      filter: 'contrast(105%) drop-shadow(0 0 5px #dac0a3)',
      color: MAIN_BLUE_COLOR,
    },
  },
}) as typeof Button
