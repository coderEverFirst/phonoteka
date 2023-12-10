import React, { useState } from 'react'
import { Modal, Box } from '@mui/material'
import { UploadImageModal } from '../../UI/MuiUI/ModalUploading.styled/UploadImageModal.styled'

interface IUploadImageModal {
  openModal: boolean
  handleCloseModal: () => void
}

const UploadImage = (props: IUploadImageModal) => {
  const { openModal, handleCloseModal } = props

  const [drag, setDrag] = useState<boolean>(false)

  const [testData, setTestData] = useState<any[] | undefined>()

  const handleDragStart = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setDrag(true)
  }

  const handleDragLeave = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setDrag(false)
  }

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = [event.dataTransfer.files]

    // const allowedTypes = ['image/jpeg', 'image/png']
    // const fileType = files.type

    console.log('Yeah its a file, nice work dude. Take your data of file:', file)

    handleCloseModal()
  }

  return (
    <UploadImageModal
      open={openModal}
      // open={true}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <div className={`modal_content ${!drag && 'active'}`}>
          {drag ? (
            <div
              className="drag_and_drop_title drop_item"
              onDragStart={event => handleDragStart(event)}
              onDragLeave={event => handleDragLeave(event)}
              onDragOver={event => handleDragStart(event)}
              onDrop={event => handleOnDrop(event)}
            >
              Drop files to upload
            </div>
          ) : (
            <div
              className="drag_and_drop_title drag_item"
              onDragStart={event => handleDragStart(event)}
              onDragLeave={event => handleDragLeave(event)}
              onDragOver={event => handleDragStart(event)}
            >
              Drag files to upload
            </div>
          )}
        </div>
      </Box>
    </UploadImageModal>
  )
}

export default UploadImage
