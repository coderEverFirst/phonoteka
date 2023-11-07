import styled from '@emotion/styled'
import { TableBody, TableContainer, TableHead, TablePagination, Modal } from '@mui/material'
import {
  MAIN_BACKDROP_BLUE_COLOR,
  MAIN_BLUE_COLOR,
  MAIN_DARKCREAM_COLOR,
  MAIN_DARKCREAM_DARK_COLOR,
  MAIN_DARKCREAM_HOVER_COLOR,
  MAIN_GRAY_COLOR,
  MAIN_LIGHTBLUE_COLOR,
  MAIN_LIGHTCREAM_COLOR,
} from '../../../../variables/variables'

export const MainTableContainer = styled(TableContainer)({
  '&.MuiTableContainer-root': {
    width: '80%',
    margin: '0 auto',
    marginTop: '40px',
    marginBottom: '40px',
    padding: '15px 15px 15px 15px',
    backgroundColor: MAIN_DARKCREAM_COLOR,
    borderRadius: '10px',
    boxShadow: '4px 4px 23px -3px rgba(217,186,152,0.71)',

    '& .MuiBox-root.wrapper': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      padding: '0px 30px 0px 20px',
      backgroundColor: MAIN_LIGHTBLUE_COLOR,

      transition: '0.2s ease-out',
      opacity: 0,

      '&.active': {
        opacity: 1,
        padding: '20px 30px 20px 20px',
      },

      '& .MuiTypography-root': {
        display: 'flex',
        gap: '5px',

        '& span': {
          fontWeight: 600,
        },
      },

      '& .MuiSvgIcon-root': {
        width: '30px',
        cursor: 'pointer',
        transition: '0.2s linear',

        '&:hover': {
          color: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  },
})

export const MainTableHead = styled(TableHead)({
  '&.MuiTableHead-root': {
    transition: '0.3s linear',

    '&.active': {
      backgroundColor: MAIN_LIGHTBLUE_COLOR,
    },

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
      transition: '0.3s linear',

      '&.active': {
        backgroundColor: MAIN_LIGHTBLUE_COLOR,
      },
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

export const MainTablePagination = styled(TablePagination)({
  '& .MuiTablePagination-toolbar': {
    padding: '0 35px 0 0',
  },
})

export const RemoveMainTableModal = styled(Modal)({
  '& .MuiBackdrop-root': {
    backgroundColor: MAIN_BACKDROP_BLUE_COLOR,
  },
  '& .MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    padding: '40px 30px',
    borderRadius: '10px',
    boxShadow: '4px 5px 28px -4px rgba(0,0,0,0.75)',
    backgroundColor: MAIN_DARKCREAM_COLOR,

    '& .MuiTypography-root': {
      fontSize: '20px',
    },

    '& .buttons': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '15px',
      gap: '5%',

      '& .MuiButtonBase-root': {
        padding: '8px 35px',

        '&.btn_argee': {
          color: MAIN_LIGHTCREAM_COLOR,
          backgroundColor: 'rgba(57, 86, 127, 0.8)',

          '&:hover': {
            backgroundColor: 'rgba(57, 86, 127, 1)',
          },
        },

        '&.btn_not_argee': {
          color: MAIN_GRAY_COLOR,
          backgroundColor: 'rgba(57, 86, 127, 0.25)',

          '&:hover': {
            color: MAIN_LIGHTCREAM_COLOR,
            backgroundColor: 'rgba(57, 86, 127, 1)',
          },
        },
      },
    },
  },
})
