import React from 'react'

import warningImg from '../../../assets/warning.svg'

import './Error.scss'

interface IError {
  label?: string
  description?: string
}

const Error = (props: IError) => {
  const { label, description } = props
  return (
    <div className="error_wrapper">
      <div className="error_content">
        <img src={warningImg} className="error_image" />
        <h2 className="error_title">Something went wrong!</h2>
        <h3 className="error_subtitle">{label}</h3>
        {description && <h3 className="error_description">{description}</h3>}
      </div>
    </div>
  )
}

export default Error
