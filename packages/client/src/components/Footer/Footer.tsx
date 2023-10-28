import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss'

const Footer = () => {
  return (
    <div className="footer_wrapper">
      <p className="footer_text">Created with the support of Satan!</p>
      <Link className="footer_github_link" to="https://github.com/Muloversic/phonoteka">
        Link to project on GitHub
      </Link>
      <p className="footer_text">© 2023</p>
    </div>
  )
}

export default Footer
