import React from 'react'

interface HeaderProps {
  id?: string
  classes: {
    appBar: string
    appBarShift: string
    menuButton: string
    hide: string
  }
  isSidebarOpen?: boolean
  handleDrawerOpen?: () => {}
  hasSidebar: Boolean
}

declare const Header: React.FC<HeaderProps>
