import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { shallow } from 'enzyme'
import { Header } from './Header'

const createHeaderProps = ({ id, isSidebarOpen, hasSidebar } = {}) => {
  return {
    id,
    classes: {
      appBar: '',
      appBarShift: '',
      menuButton: '',
      hide: 'hide'
    },
    hasSidebar,
    handleDrawerOpen: jest.fn(),
    isSidebarOpen
  }
}

describe('Header', () => {
  let wrapper

  describe('default props', () => {
    beforeAll(() => {
      const props = createHeaderProps()
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Header {...props} />)
    })

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('renders one <AppBar /> component without drawer icon', () => {
      const appBar = wrapper.find(AppBar)
      expect(appBar).toHaveLength(1)
      const icon = wrapper.find(IconButton)
      expect(icon).toHaveLength(0)
    })
  })

  describe('hasSidebar = true', () => {
    describe('isSidebarOpen = false', () => {
      beforeAll(() => {
        const props = createHeaderProps({
          hasSidebar: true,
          isSidebarOpen: false
        })
        // eslint-disable-next-line react/jsx-props-no-spreading
        wrapper = shallow(<Header {...props} />)
      })

      it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot()
      })

      it('renders one <AppBar /> component with drawer icon not hidden', () => {
        const appBar = wrapper.find(AppBar)
        expect(appBar).toHaveLength(1)
        const icon = wrapper.find(IconButton)
        expect(icon).toHaveLength(1)
        expect(icon.hasClass('hide')).toEqual(false)
        const menuIcon = icon.find(MenuIcon)
        expect(menuIcon).toHaveLength(1)
      })
    })

    describe('isSidebarOpen = true', () => {
      beforeAll(() => {
        const props = createHeaderProps({
          hasSidebar: true,
          isSidebarOpen: true,
          id: 'id'
        })
        // eslint-disable-next-line react/jsx-props-no-spreading
        wrapper = shallow(<Header {...props} />)
      })

      it('renders one <AppBar /> component with drawer icon hidden', () => {
        const appBar = wrapper.find(AppBar)
        expect(appBar).toHaveLength(1)
        const icon = wrapper.find(IconButton)
        expect(icon).toHaveLength(1)
        expect(icon.prop('id')).toEqual('id')
        expect(icon.hasClass('hide')).toEqual(true)
        const menuIcon = icon.find(MenuIcon)
        expect(menuIcon).toHaveLength(1)
      })
    })
  })
})
