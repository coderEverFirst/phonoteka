import React, { useState } from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'
import moment from 'moment'
import { useQuery } from '@apollo/client'
import TrackDetailsModal from '../../Modals/MainTableModal/TrackDetailsModal'
import BandDetailsModal from '../../Modals/MainTableModal/BandDetailsModal'
import { MainTableBody } from '../../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'
import { IRowData } from '../MainTable'
import { IFormValues as IFormTrackValues } from '../../Modals/CreateTrackModal/CreateTrackModal'
import { IFormValues as IFormBandValues } from '../../Modals/CreateBandModal/CreateBandModal'
import { GET_BAND_BY_ID_QUERY } from '../../../apollo/queries/band'
import { ITrack } from '../../Modals/CreateTrackModal/CreateTrackModal'

interface ITableBodyContent {
  tableRowData: IRowData[]
  selectedCheckbox: number[]
  handleCheckboxClick: (checked: boolean, itemId: number) => void
}

export interface ISelectedTrack extends IFormTrackValues {
  trackId: number
}

export interface ISelectedBand extends IFormBandValues {
  id: number
}

interface ITrackInBand extends ITrack {
  id: number
}

const TableBodyContent = (props: ITableBodyContent) => {
  const { tableRowData, selectedCheckbox, handleCheckboxClick } = props

  const { refetch } = useQuery(GET_BAND_BY_ID_QUERY, { skip: true })

  const [openModalBand, setOpenModalBand] = useState<boolean>(false)
  const [openModalTrack, setOpenModalTrack] = useState<boolean>(false)
  const [isBandLoading, setIsBandLoading] = useState<boolean>(false)
  const [selectedBand, setSelectedBand] = useState<ISelectedBand>({
    id: 0,
    name: '',
    foundationDate: '',
    about: '',
    tracks: [{ name: '', album: '', year: '', format: '', url: '', genre: '' }],
    description: '',
    image: '',
    location: '',
    members: '',
  })
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

  const handleCloseModalBand = () => setOpenModalBand(false)

  const handleOpenModalBand = async (bandId: number) => {
    const {
      data: { getBandById },
      loading,
    } = await refetch({ id: bandId })
    setIsBandLoading(loading)

    const preparedBand: ISelectedBand = {
      id: getBandById.id,
      name: getBandById.name,
      foundationDate: moment(getBandById.foundationDate).year().toString(),
      about: getBandById.about,
      tracks: getBandById.tracks.map((track: ITrackInBand) => ({
        id: track.id,
        name: track.name,
        album: track.album,
        year: moment(track.year).year().toString(),
        format: track.format,
        url: track.url,
        genre: track.genre,
      })),
      description: getBandById.description,
      image: getBandById.image,
      location: getBandById.location,
      members: getBandById.members,
    }

    setSelectedBand(preparedBand)
    setOpenModalBand(true)
  }

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
              <span className="table_cell_clickable" onClick={() => handleOpenModalTrack(rowItem)}>
                {rowItem.name}
              </span>
            </TableCell>
            <TableCell>
              <span
                className="table_cell_clickable"
                onClick={() => handleOpenModalBand(rowItem.bandId)}
              >
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

      {openModalTrack && (
        <TrackDetailsModal
          handleCloseModal={handleCloseModalTrack}
          openModal={openModalTrack}
          selectedTrack={selectedTrack}
        />
      )}

      {openModalBand && (
        <BandDetailsModal
          handleCloseModal={handleCloseModalBand}
          openModal={openModalBand}
          selectedBand={selectedBand}
          bandLoading={isBandLoading}
        />
      )}
    </>
  )
}

export default TableBodyContent
