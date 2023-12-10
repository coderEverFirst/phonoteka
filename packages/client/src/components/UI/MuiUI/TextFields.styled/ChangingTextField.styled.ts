import styled from '@emotion/styled'
import { TextField } from '@mui/material'
import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_CREAM_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const ChangingTextField = styled(TextField)({
  '&.MuiTextField-root': {
    width: '100%',
    transition: '0.2s linear',
    paddingTop: '5px',

    '& .MuiInputBase-root.Mui-focused': {
      '& input': {
        color: MAIN_BLUE_COLOR,
      },
    },

    '& .MuiInputBase-root': {
      transition: '0.3s linear',

      '& input': {
        paddingLeft: '3px',
        color: MAIN_GRAY_COLOR,
        '&.Mui-focused': {
          color: 'red',
        },
      },

      '&::before': {
        borderBottomColor: MAIN_DARK_CREAM_COLOR,
      },
      '&::after': {
        borderBottomColor: MAIN_BLUE_COLOR,
      },
    },

    // '& .MuiInput-underline': {
    //   borderBottomColor: MAIN_BLUE_COLOR, // Change the color accordingly
    // },
  },

  //   '& .MuiFormLabel-root': {
  //     color: MAIN_GRAY_COLOR,

  //     transition: '0.15s ease-out',
  //   },

  //   '& .MuiInputBase-root': {
  //     color: MAIN_GRAY_COLOR,

  //     '& fieldset': {
  //       transition: '0.2s linear',
  //       border: `1px solid  ${MAIN_DARK_CREAM_COLOR}`,
  //     },

  //     '&:hover fieldset': {
  //       borderColor: MAIN_BLUE_COLOR,
  //     },

  //     '&.Mui-focused fieldset': {
  //       border: `1px solid  ${MAIN_BLUE_COLOR}`,
  //     },
  //   },

  //   '&fieldset': {
  //     borderColor: MAIN_BLUE_COLOR,
  //   },

  //   '& label.Mui-focused': {
  //     color: MAIN_BLUE_COLOR,
  //   },
}) as typeof TextField
