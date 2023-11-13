import React from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'

import { MainTableBody } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'
import { IRowData } from '../../../variables/testFetchData'

interface ITableBodyContent {
  tableRowData: IRowData[]
  selectedCheckbox: number[]
  handleCheckboxClick: (checked: boolean, itemId: number) => void
}

const TableBodyContent = (props: ITableBodyContent) => {
  const { tableRowData, selectedCheckbox, handleCheckboxClick } = props

  const isSelected = (id: number) => selectedCheckbox.indexOf(id) !== -1

  return (
    <MainTableBody>
      {tableRowData.map(rowItem => (
        <TableRow key={rowItem.id} className={`${isSelected(rowItem.id) && 'active'}`}>
          <TableCell>
            <Checkbox
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
  )
}

export default TableBodyContent
