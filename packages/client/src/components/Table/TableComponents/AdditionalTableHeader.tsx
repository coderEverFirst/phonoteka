import React from 'react'

import { Box, Typography } from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'

interface IAdditionalTableHeader {
  selectedCheckbox: number[]
  handleOpenModalWindow: () => void
}

const AdditionalTableHeader = (props: IAdditionalTableHeader) => {
  const { selectedCheckbox, handleOpenModalWindow } = props
  return (
    <Box component="div" className={`wrapper ${selectedCheckbox.length > 0 && 'active'}`}>
      <Typography>
        Items checked: <Box component="span">{selectedCheckbox.length}</Box>
      </Typography>
      <DeleteIcon onClick={handleOpenModalWindow} />
    </Box>
  )
}

export default AdditionalTableHeader
