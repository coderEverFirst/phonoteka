import styled from '@emotion/styled'
import { TextField } from '@mui/material'

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
    color: '#5b5a5a',
  },

  '$ .MuiInputLabel-animated': {
    top: '10px',
  },

  '& label.Mui-focused': {
    top: '-8px',
    color: '#102c57',
  },

  '& .MuiInputBase-input': {
    padding: '8px 20px',
    color: '#102c57', 
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
      border: 'solid 1px #dac0a3',
    },

    '&.Mui-focused fieldset': {
      border: 'solid 1px #102c57',
    },
  },

  '&:hover': {
    '& .MuiFormLabel-root': {
      color: '#102c57',
    },

    '& .MuiInputBase-root': {
      '& fieldset': {
        color: '#102c57',
        borderColor: '#102c57',
      },
    },
  },
})
