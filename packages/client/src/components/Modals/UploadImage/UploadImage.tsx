import React, { Dispatch, SetStateAction, useState } from 'react'
import { Box } from '@mui/material'
import { useReactiveVar } from '@apollo/client'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { UploadImageModal } from '../../UI/MuiUI/ModalUploading.styled/UploadImageModal.styled'
import { storage } from '../../../utils/firebaseInit'
import { userInfoVar } from '../../../reactiveVars'
import { allowedImageTypes } from '../../../variables/variables'
import { v4 } from 'uuid'

interface IUploadImageModal {
  openModal: boolean
  handleCloseModal: () => void
  userNewImage: string | null
  setUserNewImage: Dispatch<SetStateAction<string | null>>
}

const UploadImage = (props: IUploadImageModal) => {
  const { openModal, handleCloseModal, setUserNewImage } = props
  const userData = useReactiveVar(userInfoVar)
  const [drag, setDrag] = useState<boolean>(false)

  const handleDragStart = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setDrag(true)
  }

  const handleDragLeave = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setDrag(false)
  }

  const handleOnDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const file: File[] = [event.dataTransfer.files[0]]
    const fileType: string = file[0].type

    if (file) {
      if (allowedImageTypes.includes(fileType)) {
        const imageRef = ref(storage, `images/user/${userData.id}/${file[0].name + v4()}`)
        await uploadBytes(imageRef, file[0])
        const userProfileImageUrl = await getDownloadURL(imageRef)
        setUserNewImage(userProfileImageUrl)
        handleCloseModal()
        return
      } else {
        setDrag(false)
        return
      }
    }
  }

  return (
    <UploadImageModal
      open={openModal}
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
