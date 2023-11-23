import React, { useState } from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'

import { IRowData } from '../../../variables/testFetchData'

import TrackDetailsModal from './TrackDetailsModal'

import { MainTableBody } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

interface ITableBodyContent {
  tableRowData: IRowData[]
  selectedCheckbox: number[]
  handleCheckboxClick: (checked: boolean, itemId: number) => void
}

const TableBodyContent = (props: ITableBodyContent) => {
  const { tableRowData, selectedCheckbox, handleCheckboxClick } = props

  const [open, setOpen] = useState<boolean>(false)

  const isSelected = (id: number) => selectedCheckbox.indexOf(id) !== -1

  const handleOpen = (event: React.ChangeEvent<EventTarget>) => {
    if ((event.target as HTMLInputElement).name === 'checkbox') return
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  return (
    <>
      <MainTableBody>
        {tableRowData.map(rowItem => (
          <TableRow
            key={rowItem.id}
            className={`${isSelected(rowItem.id) && 'active'}`}
            onClick={handleOpen}
          >
            <TableCell>
              <Checkbox
                name="checkbox"
                checked={selectedCheckbox.indexOf(rowItem.id) !== -1}
                onChange={e => handleCheckboxClick(e.target.checked, rowItem.id)}
              />
            </TableCell>

            <TableCell>{rowItem.name}</TableCell>
            <TableCell>{rowItem.band}</TableCell>
            <TableCell>{rowItem.album}</TableCell>
            <TableCell>{rowItem.year}</TableCell>
            <TableCell>{rowItem.genre}</TableCell>
            <TableCell>{rowItem.format}</TableCell>
          </TableRow>
        ))}
      </MainTableBody>

      <TrackDetailsModal handleClose={handleClose} open={open} />
    </>
  )
}

export default TableBodyContent
