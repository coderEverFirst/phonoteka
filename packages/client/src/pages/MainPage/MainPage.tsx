import React from 'react'
import MainTable from '../../components/Table/MainTable'
import TableControlsHeader from '../../components/TableControlsHeader/TableControlsHeader'
import './MainPage.scss'

const MainPage = () => {
  return (
    <div className="main_container">
      <div className="main_wrapper">
        <h1 className="main_title">Your Phonoteka List</h1>
        <TableControlsHeader />
        <MainTable />
      </div>
    </div>
  )
}

export default MainPage
