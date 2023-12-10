import React, { useState } from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'
import { Link } from 'react-router-dom'

import { IRowData } from '../../../variables/testFetchData'

import TrackDetailsModal from '../../Modals/MainTableModal/TrackDetailsModal'
import BandDetailsModal from '../../Modals/MainTableModal/BandDetailsModal'

import { MainTableBody } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'

interface ITableBodyContent {
  tableRowData: IRowData[]
  selectedCheckbox: number[]
  handleCheckboxClick: (checked: boolean, itemId: number) => void
}

const TableBodyContent = (props: ITableBodyContent) => {
  const { tableRowData, selectedCheckbox, handleCheckboxClick } = props

  const [openModalBand, setOpenModalBand] = useState<boolean>(false)
  const [openModalTrack, setOpenModalTrack] = useState<boolean>(false)

  const isSelected = (id: number) => selectedCheckbox.indexOf(id) !== -1

  const handleOpenModalBand = () => setOpenModalBand(true)
  const handleCloseModalBand = () => setOpenModalBand(false)

  const handleOpenModalTrack = () => setOpenModalTrack(true)
  const handleCloseModalTrack = () => setOpenModalTrack(false)

  return (
    <>
      <MainTableBody>
        {tableRowData.map(rowItem => (
          <TableRow
            key={rowItem.id}
            className={`${isSelected(rowItem.id) ? 'active' : ''}`}
            // onClick={handleOpen}
          >
            <TableCell>
              <Checkbox
                checked={selectedCheckbox.indexOf(rowItem.id) !== -1}
                onChange={e => handleCheckboxClick(e.target.checked, rowItem.id)}
              />
            </TableCell>

            <TableCell>
              <Link to="" className="table_cell_link" onClick={handleOpenModalTrack}>
                {rowItem.name}
              </Link>
            </TableCell>
            <TableCell>
              <Link to="" className="table_cell_link" onClick={handleOpenModalBand}>
                {rowItem.band}
              </Link>
            </TableCell>
            <TableCell>{rowItem.album}</TableCell>
            <TableCell>{rowItem.year}</TableCell>
            <TableCell>{rowItem.genre}</TableCell>
            <TableCell>{rowItem.format}</TableCell>
          </TableRow>
        ))}
      </MainTableBody>

      <TrackDetailsModal handleCloseModal={handleCloseModalTrack} openModal={openModalTrack} />
      <BandDetailsModal handleCloseModal={handleCloseModalBand} openModal={openModalBand} />
    </>
  )
}

export default TableBodyContent
