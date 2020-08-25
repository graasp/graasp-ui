import React from 'react'

export interface MenuItemType {
  id: string
  text?: string
  icon?: React.ReactElement
  path?: string
  key?: string
  onClick?: (path?: string) => void
}

declare const MenuItem: React.FC<MenuItemType>
