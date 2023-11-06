import React, { useState, useEffect } from 'react'
import { Table } from '@mui/material'

import TeableHeadContent from './TableHeadContent/TableHeadContent'
import TableBodyContent from './TableBodyContent/TableBodyContent'

import { ETableSort } from '../../variables/eNums'
import { rowsData, IRowData } from '../../variables/testFetchData'

import {
  MainTableContainer,
  MainTablePagination,
} from '../UI/MuiUI/MainTableContainer/MainTableContainer.styled'
import { useMainTable } from './useMainTable'

const MainTable = () => {
  const { stableSort, getComparator } = useMainTable()

  const [orderDirection, setOrderDirection] = useState<ETableSort>(ETableSort.asc)
  const [valueToOrderBy, setValueToOrderBy] = useState<string>('name')
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const scrollUpWindow = useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page, rowsPerPage])

  const handleRequestSort = (event: React.MouseEvent, property: string) => {
    const isAscending: boolean = valueToOrderBy === property && orderDirection === ETableSort.asc
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? ETableSort.desc : ETableSort.asc)
  }

  const handlePageChange = (event: React.MouseEvent, newPage: number) => {
    setPage(newPage)
    if (rowsData.length <= 20) {
      scrollUpWindow
    }
  }

  const handleRowsPerPageChange = (event: React.ChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
    if (rowsData.length <= 20) {
      scrollUpWindow
    }
  }

  const tableRowData: IRowData[] = stableSort(
    rowsData,
    getComparator(orderDirection, valueToOrderBy),
  ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <>
      <MainTableContainer>
        <Table>
          <TeableHeadContent
            orderDirection={orderDirection}
            valueToOrderBy={valueToOrderBy}
            handleRequestSort={handleRequestSort}
          />
          <TableBodyContent tableRowData={tableRowData} />
        </Table>
        <MainTablePagination
          rowsPerPageOptions={[10, 15, 20, 50, rowsData.length]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          labelRowsPerPage={null}
          showFirstButton={true}
          showLastButton={true}
        />
      </MainTableContainer>
    </>
  )
}

export default MainTable
