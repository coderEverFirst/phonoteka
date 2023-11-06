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
  orderDirection: ETableSort
  handleRequestSort: (event: React.MouseEvent, property: number) => void
}

const TableHeadContent = (props: ITableHeadContent) => {
  const { valueToOrderBy, orderDirection, handleRequestSort } = props

  const headerData = RENDER_TABLE_HEADER_DATA

  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
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
                active={valueToOrderBy === item.label}
                direction={valueToOrderBy === item.label ? orderDirection : ETableSort.asc}
                onClick={createSortHandler(item.value)}
              >
                {item.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </MainTableHead>
    </>
  )
}

export default TableHeadContent
