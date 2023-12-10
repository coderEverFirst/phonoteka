import React from 'react'

import { Backdrop, Box, Fade } from '@mui/material'

import { DetailModal } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'

import BandImage from '../../../assets/test_image_500_500.png'
import ReactPlayer from 'react-player'

interface ITrackDetails {
  handleCloseModal: () => void
  openModal: boolean
}

const TrackDetailsModal = (props: ITrackDetails) => {
  const { handleCloseModal, openModal } = props

  return (
    <DetailModal
      open={openModal}
      // open={true}
      onClose={handleCloseModal}
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
          <div className="modal_content">
            <div className="modal_content_left">
              <img src={BandImage} alt="BandImage" className="modal_image" />
            </div>
            <div className="modal_content_right">
              <h2 className="modal_title_name">Track Name</h2>
              <ul className="modal_info_list">
                <li className="modal_info_item">
                  <span>Genre:</span> {'Rock'}
                </li>
                <li className="modal_info_item">
                  <span>Created in:</span> {'1900'}
                </li>
                <li className="modal_info_item">
                  <span>Albums:</span> {'10'}
                </li>

                <li className="modal_info_item">
                  <span>Description:</span>{' '}
                  {
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste fuga similique et repudiandae, totam deleniti, a neque laudantium nisi sunt nam, delectus ducimus tenetur sint facilis rerum minima dolore quae nemo autem eveniet expedita? Aliquid, ipsam enim suscipit fugiat quo officiis, nemo, nobis incidunt velit libero architecto? Optio, consequatur.'
                  }
                </li>
                <li className="modal_info_item">
                  <ReactPlayer
                    url="https://www.youtube.com/watch?app=desktop&v=aGob2BwZvmI"
                    controls={true}
                    playing={true}
                  />
                </li>
              </ul>
            </div>
          </div>
        </Box>
      </Fade>
    </DetailModal>
  )
}

export default TrackDetailsModal
