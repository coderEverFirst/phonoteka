import React from 'react'

import { Backdrop, Box, Fade } from '@mui/material'

import { TrackModal } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

import BandImage from '../../../assets/test_image_500_500.png'

interface ITrackDetails {
  handleClose: () => void
  open: boolean
}

const TrackDetailsModal = (props: ITrackDetails) => {
  const { handleClose, open } = props

  return (
    <TrackModal
      open={open}
      // open={true}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box component="div">
          <div className="modal_content">
            <div className="modal_content_left">
              <img src={BandImage} alt="BandImage" className="band_image" />
            </div>
            <div className="modal_content_right">
              <h2 className="band_name">Band Name</h2>
              <ul className="band_info_list">
                <li className="band_info_item">
                  <span>Genre:</span> {'Rock'}
                </li>
                <li className="band_info_item">
                  <span>Created in:</span> {'1900'}
                </li>
                <li className="band_info_item">
                  <span>Albums:</span> {'10'}
                </li>
                <li className="band_info_item">
                  <span>Description:</span>{' '}
                  {
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum iste fuga similique et repudiandae, totam deleniti, a neque laudantium nisi sunt nam, delectus ducimus tenetur sint facilis rerum minima dolore quae nemo autem eveniet expedita? Aliquid, ipsam enim suscipit fugiat quo officiis, nemo, nobis incidunt velit libero architecto? Optio, consequatur.'
                  }
                </li>
              </ul>
            </div>
          </div>
        </Box>
      </Fade>
    </TrackModal>
  )
}

export default TrackDetailsModal
