import React, { useMemo } from 'react'
import { TableHead, TableRow, TableCell } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import Tooltip from '@mui/material/Tooltip'
import ColumnWrapper from './ColumnWrapper'

interface IRender {
  id: number
  lable: string
}

const RENDER_TABLE_HEADER_DATA: IRender[] = [
  { id: 1, lable: 'Name' },
  { id: 2, lable: 'Band' },
  { id: 3, lable: 'Album' },
  { id: 4, lable: 'Realise year' },
  { id: 5, lable: 'Genre' },
  { id: 6, lable: 'Format' },
]

const TableHeader = ({ columns, sort, setSort }) => {
  //   const handleSetSort = useCallback(
  //     (id, type) => {
  //       setSort && setSort(id, type)
  //     },
  //     [setSort, sort],
  //   )

  const preparedColumns = useMemo(() => {
    return columns?.map(column => ({
      ...column,
      label:
        column?.id === 'moreMenu' ? (
          <Tooltip title="menu" enterDelay={300}>
            <MoreVertIcon className="more-icon-vertical" onClick={column.onClick} />
          </Tooltip>
        ) : (
          column?.label
        ),
    }))
  }, [columns])

  return (
    <TableHead>
      <TableRow>
        {preparedColumns.map((column: { id: React.Key | null | undefined }) => (
          <TableCell key={column.id}>
            {/* <ColumnWrapper key={column.id} column={column} sort={sort} setSort={handleSetSort} /> */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeader
