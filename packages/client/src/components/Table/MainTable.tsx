import React from 'react'

import { Table, TableCell, TableRow, Checkbox } from '@mui/material'
import { rowsData, IRowData } from '../../variables/testFetchData'

import {
  IRenderTableHeaderData,
  MAIN_BLUE_COLOR,
  RENDER_TABLE_HEADER_DATA,
} from '../../variables/variables'

import {
  MainTableBody,
  MainTableContainer,
  MainTableHead,
} from '../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

import './MainTable.scss'

const MainTable = () => {
  const headerData = RENDER_TABLE_HEADER_DATA
  return (
    <>
      <MainTableContainer>
        <Table>
          <MainTableHead>
            <TableRow sx={{ color: MAIN_BLUE_COLOR }}>
              {headerData.map((item: IRenderTableHeaderData) => (
                <TableCell key={item.id} sx={{ width: item.width }} variant="head">
                  {item.lable}
                </TableCell>
              ))}
            </TableRow>
          </MainTableHead>
          <MainTableBody>
            {rowsData.map((row: IRowData) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.band}</TableCell>
                <TableCell>{row.album}</TableCell>
                <TableCell>{row.year}</TableCell>
                <TableCell>{row.genre}</TableCell>
                <TableCell>{row.format}</TableCell>
              </TableRow>
            ))}
          </MainTableBody>
        </Table>
      </MainTableContainer>
    </>
  )
}

export default MainTable
