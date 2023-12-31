import React, { useState, useEffect } from 'react'
import { Table } from '@mui/material'
import { useQuery, useReactiveVar } from '@apollo/client'
import TableHeadContent from './TableComponents/TableHeadContent'
import TableBodyContent from './TableComponents/TableBodyContent'
import AdditionalTableHeader from './TableComponents/AdditionalTableHeader'
import RemoveTableModalWindow from './TableComponents/RemoveTableModalWindow'
import { ETableSort } from '../../variables/eNums'
import { GET_ALL_TRACKS_QUERY } from '../../apollo/queries/band'
import LoaderOval from '../UI/Loader/LoaderOval'
import { headerSearchValue } from '../../reactiveVars'
import {
  MainTableContainer,
  MainTablePagination,
} from '../UI/MuiUI/MainTableContainer.styled/MainTableContainer.styled'

export interface IBand {
  id: number
  name: string
  createdAt: string
  foundationDate: string
  genre: string
  members: string
  description: string
  about: string
  location: string
  image: string
}

export interface IRowData {
  id: number
  name: string
  createdAt: string
  year: string
  genre: string
  album: string
  url: string
  format: string
  bandId: number
  band: IBand
}

const MainTable = () => {
  const [orderDirection, setOrderDirection] = useState<ETableSort>(ETableSort.asc)
  const [valueToOrderBy, setValueToOrderBy] = useState<string>('name')
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [selectedCheckbox, setSelectedCheckbox] = useState<number[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)

  const searchValue = useReactiveVar(headerSearchValue)

  const {
    data: tracksData,
    loading: tracksLoading,
    refetch,
  } = useQuery(GET_ALL_TRACKS_QUERY, {
    variables: {
      order: orderDirection,
      sortBy: valueToOrderBy,
      search: searchValue,
      pageNumber: page + 1,
      pageSize: rowsPerPage,
    },
    fetchPolicy: 'cache-and-network',
  })
  const { tracks, allTracksCount } = tracksData?.getAllTracks || {}

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [page, rowsPerPage])

  useEffect(() => {
    refetch({
      order: orderDirection,
      sortBy: valueToOrderBy,
      search: searchValue,
      pageNumber: page + 1,
      pageSize: rowsPerPage,
    })
  }, [valueToOrderBy, orderDirection, searchValue])

  const handleRequestSort = (event: React.MouseEvent, property: string) => {
    const isAscending: boolean = valueToOrderBy === property && orderDirection === ETableSort.asc
    setValueToOrderBy(property)
    setOrderDirection(isAscending ? ETableSort.desc : ETableSort.asc)
  }

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value))
    setPage(0)
  }

  const handleSelectedAllClick = (checked: boolean) => {
    if (checked) {
      const newSelectedCheckbox = tracks.map((item: IRowData) => item.id)
      setSelectedCheckbox(newSelectedCheckbox)
    } else {
      setSelectedCheckbox([])
    }
  }

  const handleCheckboxClick = (checked: boolean, itemId: number) => {
    if (checked) {
      setSelectedCheckbox(prevSelected => [...prevSelected, itemId])
    } else {
      setSelectedCheckbox(prevSelected => prevSelected.filter(id => id !== itemId))
    }
  }

  const handleOpenModalWindow = () => {
    setOpenModal(true)
  }

  const handleCloseModalWindow = () => {
    setOpenModal(false)
  }

  const handleAgreeRemoveItems = () => {
    handleCloseModalWindow()
    alert('Need delete items on server')
  }

  // if you need to remove checkboxes for the entire list of data and put them on the current pagination page, throw tableRowData in TableHeadContent instead of rowsData

  return (
    <MainTableContainer>
      <AdditionalTableHeader
        selectedCheckbox={selectedCheckbox}
        handleOpenModalWindow={handleOpenModalWindow}
      />

      <RemoveTableModalWindow
        openModal={openModal}
        handleCloseModalWindow={handleCloseModalWindow}
        handleAgreeRemoveItems={handleAgreeRemoveItems}
      />

      {tracksLoading ? (
        <LoaderOval />
      ) : (
        <>
          <Table>
            <TableHeadContent
              orderDirection={orderDirection}
              valueToOrderBy={valueToOrderBy}
              handleRequestSort={handleRequestSort}
              rowsData={tracks}
              selectedCheckbox={selectedCheckbox}
              handleSelectedAllClick={handleSelectedAllClick}
            />
            <TableBodyContent
              tableRowData={tracks}
              selectedCheckbox={selectedCheckbox}
              handleCheckboxClick={handleCheckboxClick}
            />
          </Table>
          <MainTablePagination
            rowsPerPageOptions={[10, 15, 20, 50, allTracksCount]}
            component="div"
            count={allTracksCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage={null}
            showFirstButton={true}
            showLastButton={true}
          />
        </>
      )}
    </MainTableContainer>
  )
}

export default MainTable
