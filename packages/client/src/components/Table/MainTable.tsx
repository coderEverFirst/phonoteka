import React, { useState } from 'react'

import { Table, TableCell, TableRow, Checkbox } from '@mui/material'
import { rowsData, IRowData } from '../../variables/testFetchData'

import TeableHeadContent from './TableHeadContent/TableHeadContent'

import { ETableSort } from '../../variables/eNums'

import {
  MainTableBody,
  MainTableContainer,
} from '../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

const MainTable = () => {
  const [orderDirection, setOrderDirection] = useState<string>(ETableSort.asc)
  const [valueToOrderBy, setValueToOrderBy] = useState<string>('Name')
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(1)

  const handleRequestSort = (event: Event, property: string) => {
    const isAscending: boolean = valueToOrderBy === property && orderDirection === ETableSort.asc

    setValueToOrderBy(property)
    setOrderDirection(isAscending ? ETableSort.desc : ETableSort.asc)
  }

  // const tableData = sortedRowsData(rowsData, getComparator(orderDirection, valueToOrderBy))

  return (
    <>
      <MainTableContainer>
        <Table>
          <TeableHeadContent
            orderDirection={orderDirection}
            valueToOrderBy={valueToOrderBy}
            handleRequestSort={handleRequestSort}
          />

          <MainTableBody>
            {/* {tableData.map()} */}
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
