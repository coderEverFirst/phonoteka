import React from 'react'
import { Paper, Table, TablePagination } from '@mui/material'
import TableHeader from './TableHeader/TableHeader'
import TableBodyContainer from './TableBodyContainer/TableBodyContainer'

const MainTable = ({
  columns = [],
  data = [],

  page = 0,
  setPage,
  rowsPerPage = 10,
  rowsPerPageOptions = [],
  setRowsPerPage,
  count,

  sort,
  setSort,
}) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value)
  }

  // if (!data.length && usePlaceholderForEmptyTable) {
  //   return (
  //     <Paper className={classes.emptyTablePlaceholder}>
  //       <div>
  //         {placeHolderText ||
  //           `Unfortunately, no matching records were found according to your request.`}
  //       </div>
  //     </Paper>
  //   )
  // }

  return (
    <Paper>
      <Table>
        <TableHeader columns={columns} sort={sort} setSort={setSort} />

        {/* <TableBodyContainer data={data} columns={columns} /> */}
      </Table>

      {/* {count ? (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      ) : null} */}
    </Paper>
  )
}

export default MainTable
