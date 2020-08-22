import React from 'react'

interface HeaderProps {
  classes: {
    appBar: string
    appBarShift: string
    menuButton: string
    hide: string
  }
  theme: {
    direction: string
  }
  isSidebarOpen: boolean
  handleDrawerOpen: () => {}
}

declare const Header: React.FC<HeaderProps>
