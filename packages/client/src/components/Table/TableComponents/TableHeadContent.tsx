import React from 'react'

import { TableCell, TableRow, Checkbox, TableSortLabel } from '@mui/material'

import { IRenderTableHeaderData, RENDER_TABLE_HEADER_DATA } from '../../../variables/variables'
import { ETableSort } from '../../../variables/eNums'

import { MainTableHead } from '../../UI/MuiUI/MainTableContainer/MainTableContainer.styled'
import { IRowData } from '../../../variables/testFetchData'

interface ITableHeadContent {
  valueToOrderBy: string
  orderDirection: ETableSort
  handleRequestSort: (event: React.MouseEvent, property: string) => void
  selectedCheckbox: number[]
  rowsData: IRowData[]
  handleSelectedAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const TableHeadContent = (props: ITableHeadContent) => {
  const {
    valueToOrderBy,
    orderDirection,
    handleRequestSort,
    selectedCheckbox,
    rowsData,
    handleSelectedAllClick,
  } = props

  const headerData = RENDER_TABLE_HEADER_DATA

  const createSortHandler = (property: string) => (event: React.MouseEvent) => {
    handleRequestSort(event, property)
  }

  console.log('valueToOrderBy', valueToOrderBy)

  return (
    <>
      <MainTableHead className={`${rowsData.length === selectedCheckbox.length && 'active'}`}>
        <TableRow>
          <TableCell>
            <Checkbox
              indeterminate={
                selectedCheckbox.length > 0 && selectedCheckbox.length < rowsData.length
              }
              checked={selectedCheckbox.length === rowsData.length}
              onChange={handleSelectedAllClick}
            />
          </TableCell>
          {headerData.map((item: IRenderTableHeaderData) => (
            <TableCell key={item.id}>
              <TableSortLabel
                active={valueToOrderBy === item.label}
                direction={valueToOrderBy === item.label ? ETableSort.asc : orderDirection}
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
