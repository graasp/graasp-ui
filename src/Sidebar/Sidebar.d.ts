import React from 'react'

interface SidebarProps {
  className?: string
  classes: {
    drawer: string
    drawerPaper: string
  }
  isSidebarOpen?: boolean
  handleDrawerClose: () => {}
  children?: React.ReactElement
  drawerHeaderContent?: React.ReactElement
}

declare const Sidebar: React.FC<SidebarProps>
