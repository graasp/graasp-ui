import React from 'react'
import { MenuItemType } from './MenuItem'

interface MainMenuProps<T> {
  id?: string
  children?: React.ReactElement
}

declare const MainMenu: React.FC<MainMenuProps>
