import React, { useState } from 'react'
import { ActionButton } from '../UI/MuiUI/Buttons.styled/ActionButton.styled'
import CreateBandModal from '../Modals/CreateBandModal/CreateBandModal'
import CreateTrackModal from '../Modals/CreateTrackModal/CreateTrackModal'

const TableControlsHeader = () => {
  const [openCreateBand, setOpenCreateBand] = useState<boolean>(false)
  const [openCreateTrack, setOpenCreateTrack] = useState<boolean>(false)
  return (
    <>
      <ActionButton onClick={() => setOpenCreateBand(true)}>Create band</ActionButton>
      <ActionButton onClick={() => setOpenCreateTrack(true)}>Create track</ActionButton>
      <CreateBandModal handleCloseModal={setOpenCreateBand} openModal={openCreateBand} />
      <CreateTrackModal handleCloseModal={setOpenCreateTrack} openModal={openCreateTrack} />
    </>
  )
}

export default TableControlsHeader
