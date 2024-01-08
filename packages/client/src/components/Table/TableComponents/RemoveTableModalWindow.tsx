import React from 'react'
import { Box, Typography, Fade, Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'

import { RemoveMainTableModal } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'

interface IRemoveTableModalWindow {
  openModal: boolean
  selectedCheckbox: number[]
  handleCloseModalWindow: () => void
  handleAgreeRemoveItems: () => void
}

const RemoveTableModalWindow = (props: IRemoveTableModalWindow) => {
  const { openModal, selectedCheckbox, handleCloseModalWindow, handleAgreeRemoveItems } = props
  return (
    <RemoveMainTableModal
      open={openModal}
      onClose={handleCloseModalWindow}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openModal}>
        <Box component="div">
          <Typography component="h2">
            Do you agree to remove {selectedCheckbox.length} items?
          </Typography>
          <div className="buttons">
            <Button className="btn_not_agree" onClick={handleCloseModalWindow}>
              No
            </Button>
            <Button className="btn_agree" onClick={handleAgreeRemoveItems}>
              Yes
            </Button>
          </div>
        </Box>
      </Fade>
    </RemoveMainTableModal>
  )
}

export default RemoveTableModalWindow
