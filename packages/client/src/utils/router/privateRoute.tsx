import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useCookies } from 'react-cookie'

import { LOGIN_PAGE } from '../../variables/linksUrls'

const PrivateRoute = () => {
  const [cookie] = useCookies(['token'])

  return cookie.token ? <Outlet /> : <Navigate to={LOGIN_PAGE} />
}

export default PrivateRoute
