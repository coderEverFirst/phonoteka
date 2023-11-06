import React, { useState } from 'react'
import { Table } from '@mui/material'

import TeableHeadContent from './TableHeadContent/TableHeadContent'

import { ETableSort } from '../../variables/eNums'
import { rowsData, IRowData } from '../../variables/testFetchData'

import { MainTableContainer } from '../UI/MuiUI/MainTableContainer/MainTableContainer.styled'
import TableBodyContent from './TableBodyContent/TableBodyContent'
import { useMainTable } from './useMainTable'

const MainTable = () => {
  const { stableSort, getComparator } = useMainTable()

  const [orderDirection, setOrderDirection] = useState<ETableSort>(ETableSort.asc)
  const [valueToOrderBy, setValueToOrderBy] = useState<string>('name')
  // const [page, setPage] = useState<number>(0)
  // const [rowsPerPage, setRowsPerPage] = useState<number>(1)

  const handleRequestSort = (event: React.MouseEvent, property: string) => {
    const isAscending: boolean = valueToOrderBy === property && orderDirection === ETableSort.asc
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? ETableSort.desc : ETableSort.asc)
  }

  const tableRowData: IRowData[] = stableSort(
    rowsData,
    getComparator(orderDirection, valueToOrderBy),
  )

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
      </MainTableContainer>
    </>
  )
}

export default MainTable
