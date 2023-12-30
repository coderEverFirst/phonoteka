import React, { useState } from 'react'
import { ActionButton } from '../UI/MuiUI/Buttons.styled/ActionButton.styled'
import CreateBandModal from '../Modals/CreateBandModal/CreateBandModal'

const TableControlsHeader = () => {
  const [openCreateBand, setOpenCreateBand] = useState<boolean>(false)

  return (
    <>
      <ActionButton onClick={() => setOpenCreateBand(true)}>Create band</ActionButton>
      <CreateBandModal handleCloseModal={setOpenCreateBand} openModal={openCreateBand} />
    </>
  )
}

export default TableControlsHeader
