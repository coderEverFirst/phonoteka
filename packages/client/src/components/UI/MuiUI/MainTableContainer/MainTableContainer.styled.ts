import styled from '@emotion/styled'
import { TableBody, TableContainer, TableHead } from '@mui/material'
import {
  MAIN_BLUE_COLOR,
  MAIN_DARKCREAM_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const MainTableContainer = styled(TableContainer)({
  '&.MuiTableContainer-root': {
    width: '80%',
    margin: '0 auto',
    marginTop: '40px',
    padding: '15px',
    backgroundColor: MAIN_DARKCREAM_COLOR,
    borderRadius: '10px',
    boxShadow: '4px 4px 23px -3px rgba(217,186,152,0.71)',
  },
})

export const MainTableHead = styled(TableHead)({
  '&.MuiTableHead-root': {
    '& .MuiTableRow-root': {
      color: MAIN_BLUE_COLOR,
      borderBottom: 'none',
    },

    '& .MuiTableCell-root': {
      padding: '5px',
      fontWeight: 600,
      borderBottom: 'none',

      '&:nth-last-of-type(-n+3)': {
        textAlign: 'center',
        paddingLeft: '25px',
      },
    },

    '& .MuiCheckbox-root': {
      height: '100%',
      color: MAIN_GRAY_COLOR,

      '&.Mui-checked': {
        color: MAIN_BLUE_COLOR,
      },
    },
  },
})

export const MainTableBody = styled(TableBody)({
  '&.MuiTableBody-root': {
    '& .MuiTableRow-root': {
      alignItems: 'center',
      height: '100%',
    },

    '& .MuiTableCell-root': {
      padding: '5px',
      borderBottom: 'none',

      '&:first-of-type': {
        padding: '5px',
      },

      '&:nth-last-of-type(-n+3)': {
        textAlign: 'center',
      },
    },

    '& .MuiCheckbox-root': {
      color: MAIN_GRAY_COLOR,

      '&.Mui-checked': {
        color: MAIN_BLUE_COLOR,
      },
    },
  },
})
