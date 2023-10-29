import React from 'react'
import { TableCell, TableRow } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import useStyles from '../styles'

const TableBodyContainer = ({ data, columns }) => {
  const classes = useStyles()
  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow
          key={index}
          className={row?.itemRowClass}
          classes={{
            root: row?.checkbox?.props?.checked ? classes.selectedRow : classes.row,
          }}
        >
          {columns.map(column => (
            <TableCell key={column.id} style={{ fontSize: '14px', position: 'relative' }}>
              {row[column.id]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
export default TableBodyContainer