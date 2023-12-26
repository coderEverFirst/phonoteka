import styled from '@emotion/styled'

import { Modal } from '@mui/material'
import {
  MAIN_BLUE_COLOR,
  MAIN_DARK_CREAM_COLOR,
  MAIN_GRAY_COLOR,
} from '../../../../variables/variables'

export const UploadImageModal = styled(Modal)({
  '& .MuiBox-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    maxWidth: '60vw',
    width: '100%',
    maxHeight: '60vh',
    height: '100%',

    padding: '25px',

    border: 'none',
    outline: 'none', //remove bullshit border
    borderRadius: '10px',
    backgroundColor: MAIN_DARK_CREAM_COLOR,

    '& .modal_content': {
      width: '100%',
      height: '100%',

      borderRadius: '10px',
      border: `2px dashed ${MAIN_BLUE_COLOR}`,

      '&.active': {
        border: `2px dashed ${MAIN_GRAY_COLOR}`,
      },

      '& .drag_and_drop_zone': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

        width: '100%',
        height: '100%',

        fontSize: 28,
        fontWeight: 500,
        transition: '0.3s linear',

        '&.drop_item': {
          color: MAIN_BLUE_COLOR,
        },

        '&.drag_item': {
          color: MAIN_GRAY_COLOR,
        },

        '& .drag_and_drop_subtitle ': {
          fontSize: 18,
          fontWeight: 400,
        },
      },
    },
  },
}) as typeof Modal
