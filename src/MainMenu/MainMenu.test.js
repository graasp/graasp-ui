import React from 'react'
import { shallow } from 'enzyme'
import { MainMenu } from './MainMenu'
import MenuItem from '../MenuItem'
import List from '@material-ui/core/List'

const createMainMenuProps = ({ id } = {}) => ({
  id
})

const menuWithMenuItems = (
  <>
    <MenuItem key='one' text='one' />,
    <MenuItem key='two' text='two' />,
    <MenuItem key='three' text='three' />,
  </>
)

const menuWithCustomMenuItems = (
  <>
    <div key='one' text='one' />,
    <div key='two' text='two' />,
    <div key='three' text='three' />,
  </>
)

describe('MainMenu', () => {
  let wrapper

  describe('default values', () => {
    beforeAll(() => {
      const props = createMainMenuProps()
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<MainMenu {...props} />)
    })

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('renders one <List /> with default values', () => {
      const list = wrapper.find(List)
      expect(list).toHaveLength(1)
    })
  })

  describe('menu is defined with graasp MenuItem', () => {
    beforeAll(() => {
      const props = createMainMenuProps({ id: 'id' })
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<MainMenu {...props}>{menuWithMenuItems}</MainMenu>)
    })

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('renders one <List /> component with graasp menu', () => {
      const list = wrapper.find(List)
      expect(list).toHaveLength(1)
      expect(list.prop('id')).toEqual('id')
      const items = list.find(MenuItem)
      expect(items).toHaveLength(3)
    })
  })

  describe('menu is defined with custom component', () => {
    beforeAll(() => {
      const props = createMainMenuProps()
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(
        <MainMenu {...props}>{menuWithCustomMenuItems}</MainMenu>
      )
    })

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('renders one <List /> component with custom menu', () => {
      const list = wrapper.find(List)
      expect(list).toHaveLength(1)
      const items = list.find('div')
      expect(items).toHaveLength(3)
    })
  })
})
