import React from 'react'
import ReactLoading from 'react-loading'
import { PRIMARY_COLOR } from '../theme'

const Loader = ({ type = 'bubbles', color = PRIMARY_COLOR, className }) => (
  <div className={className}>
    <ReactLoading type={type} color={color} />
  </div>
)

export default Loader
