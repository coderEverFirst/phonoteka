import React from 'react'
import { Oval } from 'react-loader-spinner'
import { MAIN_BLUE_COLOR, MAIN_DARK_CREAM_COLOR } from '../../../variables/variables'

import './LoaderOval.scss'

interface ILoaderOval {
  height?: number
  width?: number
  label?: string
}

const LoaderOval = (props: ILoaderOval) => {
  const { height, width, label } = props
  return (
    <div className="loader_wrapper">
      <Oval
        height={height}
        width={width}
        color={MAIN_BLUE_COLOR}
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor={MAIN_DARK_CREAM_COLOR}
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
      <h3 className="loader_title">{label}</h3>
    </div>
  )
}

export default LoaderOval
