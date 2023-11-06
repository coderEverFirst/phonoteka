import React, { useState } from 'react'
import { Table, TableCell, TableRow, Checkbox } from '@mui/material'
import { rowsData, IRowData } from '../../variables/testFetchData'
import TeableHeadContent from './TableHeadContent/TableHeadContent'
import { ETableSort } from '../../variables/eNums'
import {
  MainTableBody,
  MainTableContainer,
} from '../UI/MuiUI/MainTableContainer/MainTableContainer.styled'

const descendingComparator = <T,>(a: T, b: T, orderBy: keyof T) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = <Key extends keyof any>(
  order: ETableSort,
  orderBy: Key,
): ((a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number) => {
  return order === ETableSort.desc
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = <T,>(rowArray: readonly T[], comparator: (a: T, b: T) => number) => {
  const stabilizedArray = rowArray.map((el, index) => [el, index] as [T, number])
  stabilizedArray.sort((a, b) => {
    const order = comparator(a[0], b[0])
    return order !== 0 ? order : a[1] - b[1]
  })

  return stabilizedArray.map(el => el[0])
}

const MainTable = () => {
  const [orderDirection, setOrderDirection] = useState<ETableSort>(ETableSort.asc)
  const [valueToOrderBy, setValueToOrderBy] = useState<string>('name')
  // const [page, setPage] = useState<number>(0)
  // const [rowsPerPage, setRowsPerPage] = useState<number>(1)

  const handleRequestSort = (event: React.MouseEvent, property: string) => {
    const isAscending: boolean = valueToOrderBy === property && orderDirection === ETableSort.asc

    setValueToOrderBy(property)
    setOrderDirection(isAscending ? ETableSort.desc : ETableSort.asc)
  }

  const tableRowData = stableSort(rowsData, getComparator(orderDirection, valueToOrderBy))

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
            {tableRowData.map((rowItem: IRowData) => (
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
        </Table>
      </MainTableContainer>
    </>
  )
}

export default MainTable
