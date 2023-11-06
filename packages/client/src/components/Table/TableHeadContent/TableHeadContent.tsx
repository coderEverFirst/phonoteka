import React from 'react'

import { TableCell, TableRow, Checkbox, TableSortLabel } from '@mui/material'

import {
  IRenderTableHeaderData,
  MAIN_BLUE_COLOR,
  RENDER_TABLE_HEADER_DATA,
} from '../../../variables/variables'
import { ETableSort } from '../../../variables/eNums'

import { MainTableHead } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

interface ITableHeadContent {
  valueToOrderBy: string
  orderDirection: string
  handleRequestSort: (event: Event, property: string) => void
}

const TableHeadContent = (props: ITableHeadContent) => {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props

  const headerData = RENDER_TABLE_HEADER_DATA

  const createSortHandler = (property: string) => (event: Event) => {
    handleRequestSort(event, property)
  }

  return (
    <>
      <MainTableHead>
        <TableRow sx={{ color: MAIN_BLUE_COLOR }}>
          <TableCell>
            <Checkbox />
          </TableCell>
          {headerData.map((item: IRenderTableHeaderData) => (
            <TableCell key={item.id}>
              <TableSortLabel
                active={valueToOrderBy === item.lable}
                direction={valueToOrderBy === item.lable ? orderDirection : ETableSort.asc}
                onClick={createSortHandler(item.lable)}
              >
                {item.lable}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </MainTableHead>
    </>
  )
}

export default TableHeadContent
