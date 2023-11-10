import React from 'react'
import { Box, Typography, Fade, Button } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'

import { RemoveMainTableModal } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

interface IRemoveTableModalWindow {
  openModal: boolean
  handleCloseModalWindow: () => void
  handleAgreeRemoveItems: () => void
}

const RemoveTableModalWindow = (props: IRemoveTableModalWindow) => {
  const { openModal, handleCloseModalWindow, handleAgreeRemoveItems } = props
  return (
    <>
      <RemoveMainTableModal
        open={openModal}
        onClose={handleCloseModalWindow}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openModal}>
          <Box>
            <Typography component="h2">Do you agree to remove this?</Typography>
            <div className="buttons">
              <Button className="btn_agree" onClick={handleAgreeRemoveItems}>
                Yes
              </Button>
              <Button className="btn_not_agree" onClick={handleCloseModalWindow}>
                No
              </Button>
            </div>
          </Box>
        </Fade>
      </RemoveMainTableModal>
    </>
  )
}

export default RemoveTableModalWindow
