import React, { useState } from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'

import TrackDetailsModal from '../../Modals/MainTableModal/TrackDetailsModal'
import BandDetailsModal from '../../Modals/MainTableModal/BandDetailsModal'

import { MainTableBody } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import { IRowData } from '../MainTable'
import { IFormValues } from '../../Modals/CreateTrackModal/CreateTrackModal'
import moment from 'moment'

interface ITableBodyContent {
  tableRowData: IRowData[]
  selectedCheckbox: number[]
  handleCheckboxClick: (checked: boolean, itemId: number) => void
}

export interface ISelectedTrack extends IFormValues {
  trackId: number
}

const TableBodyContent = (props: ITableBodyContent) => {
  const { tableRowData, selectedCheckbox, handleCheckboxClick } = props

  const [openModalBand, setOpenModalBand] = useState<boolean>(false)
  const [openModalTrack, setOpenModalTrack] = useState<boolean>(false)
  const [selectedTrack, setSelectedTrack] = useState<ISelectedTrack>({
    trackId: 0,
    bandId: 0,
    tracks: [
      {
        name: '',
        album: '',
        year: '',
        format: '',
        url: '',
        genre: '',
      },
    ],
  })

  const isSelected = (id: number) => selectedCheckbox.indexOf(id) !== -1

  const handleOpenModalBand = () => setOpenModalBand(true)
  const handleCloseModalBand = () => setOpenModalBand(false)

  const handleOpenModalTrack = (rowItem: IRowData) => {
    const dataForModal: ISelectedTrack = {
      bandId: rowItem.bandId,
      trackId: rowItem.id,
      tracks: [
        {
          name: rowItem.name,
          album: rowItem.album,
          year: moment(rowItem.year).year().toString(),
          format: rowItem.format,
          url: rowItem.url,
          genre: rowItem.genre,
        },
      ],
    }
    setSelectedTrack(dataForModal)
    setOpenModalTrack(true)
  }
  const handleCloseModalTrack = () => setOpenModalTrack(false)

  return (
    <>
      <MainTableBody>
        {tableRowData.map(rowItem => (
          <TableRow key={rowItem.id} className={`${isSelected(rowItem.id) ? 'active' : ''}`}>
            <TableCell>
              <Checkbox
                checked={selectedCheckbox.indexOf(rowItem.id) !== -1}
                onChange={e => handleCheckboxClick(e.target.checked, rowItem.id)}
              />
            </TableCell>
            <TableCell>
              <span className="table_cell_link" onClick={() => handleOpenModalTrack(rowItem)}>
                {rowItem.name}
              </span>
            </TableCell>
            <TableCell>
              <span className="table_cell_link" onClick={handleOpenModalBand}>
                {rowItem.band.name}
              </span>
            </TableCell>
            <TableCell>{rowItem.album}</TableCell>
            <TableCell>{moment(rowItem.year).year()}</TableCell>
            <TableCell>{rowItem.genre}</TableCell>
            <TableCell>{rowItem.format}</TableCell>
          </TableRow>
        ))}
      </MainTableBody>

      <TrackDetailsModal
        handleCloseModal={handleCloseModalTrack}
        openModal={openModalTrack}
        selectedTrack={selectedTrack}
      />
      <BandDetailsModal handleCloseModal={handleCloseModalBand} openModal={openModalBand} />
    </>
  )
}

export default TableBodyContent
