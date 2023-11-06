import React from 'react'
import { TableCell, TableRow, Checkbox } from '@mui/material'

import { MainTableBody } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'
import { IRowData } from '../../../variables/testFetchData'

interface ITableBodyContent {
  tableRowData: IRowData[]
}

const TableBodyContent = (props: ITableBodyContent) => {
  const { tableRowData } = props
  return (
    <>
      <MainTableBody>
        {tableRowData.map(rowItem => (
          <TableRow key={rowItem.id}>
            <TableCell>
              <Checkbox />
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
    </>
  )
}

export default TableBodyContent
