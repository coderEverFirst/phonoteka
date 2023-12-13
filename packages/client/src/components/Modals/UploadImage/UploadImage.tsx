import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { UploadImageModal } from '../../UI/MuiUI/ModalUploading.styled/UploadImageModal.styled'

interface IUploadImageModal {
  openModal: boolean
  handleCloseModal: () => void
  userNewImage: string | null
  setUserNewImage: Dispatch<SetStateAction<string | null>>
}

const UploadImage = (props: IUploadImageModal) => {
  const { openModal, handleCloseModal, userNewImage, setUserNewImage } = props

  const [drag, setDrag] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File[] | null>(null)

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

    const file: File[] = [event.dataTransfer.files[0]]
    const fileType: string = file[0].type

    console.log('file', file)
    console.log('fileType', fileType)

    if (file) {
      const allowedTypes: string[] = ['image/jpeg', 'image/png']
      if (allowedTypes.includes(fileType)) {
        console.log('Allowed!!!', file)
        setSelectedFile(file)
        handleCloseModal()
        return
      } else {
        setDrag(false)
        console.log('nope dude')
        return
      }
    }
  }

  useEffect(() => {
    if (!selectedFile) {
      return setUserNewImage(null)
    }
    const file = selectedFile[0]
    const objectURL = URL.createObjectURL(file)
    setUserNewImage(objectURL)

    return () => URL.revokeObjectURL(objectURL)
  }, [selectedFile])

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
              className="drag_and_drop_zone drop_item"
              onDragStart={event => handleDragStart(event)}
              onDragLeave={event => handleDragLeave(event)}
              onDragOver={event => handleDragStart(event)}
              onDrop={event => handleOnDrop(event)}
            >
              Drop files to upload
            </div>
          ) : (
            <>
              <div
                className="drag_and_drop_zone drag_item"
                onDragStart={event => handleDragStart(event)}
                onDragLeave={event => handleDragLeave(event)}
                onDragOver={event => handleDragStart(event)}
              >
                <div className="drag_and_drop_title">Drag files to upload</div>
                <div className="drag_and_drop_subtitle">File must be in png or jpeg format</div>
              </div>
            </>
          )}
        </div>
      </Box>
    </UploadImageModal>
  )
}

export default UploadImage
