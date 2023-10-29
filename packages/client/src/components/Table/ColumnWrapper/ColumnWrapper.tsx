import React, { useCallback } from 'react'
import TableSortLabel from '@mui/material/TableSortLabel'
import InfoIcon from '@material-ui/icons/Info'
import { Tooltip } from '@mui/material'

const ColumnWrapper = ({ column, sort, setSort }) => {
  const handleSetSort = useCallback(() => {
    const newSortDesc = sort?.desc ? false : true
    setSort(column?.id, newSortDesc)
  }, [setSort, column, sort])

  const Wrapper = column?.tooltip ? Tooltip : React.Fragment
  const props = column?.tooltip
    ? {
        placement: 'top',
        title: column.tooltip,
        enterDelay: 300,
      }
    : {}

  if (column?.sort) {
    return (
      <Tooltip title="Sort" placement="bottom">
        <TableSortLabel
          active={sort?.field === column.id}
          direction={sort?.desc ? 'desc' : 'asc'}
          onClick={handleSetSort}
        >
          <Wrapper {...props}>
            {column.label}
            {column.tooltip && <InfoIcon style={{ width: 12.5, height: 12.5 }} />}
          </Wrapper>
        </TableSortLabel>
      </Tooltip>
    )
  }

  return (
    <Wrapper {...props}>
      {column.label}
      {column.component}
      {column.tooltip && <InfoIcon style={{ width: 12.5, height: 12.5 }} />}
    </Wrapper>
  )
}

export default ColumnWrapper
