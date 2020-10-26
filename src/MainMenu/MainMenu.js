import React from 'react'
import List from '@material-ui/core/List'

export const MainMenu = ({ id, children }) => {
  return <List id={id}>{children}</List>
}

export default MainMenu
