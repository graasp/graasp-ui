import React from 'react';
import { shallow } from 'enzyme';
import Drawer from '@material-ui/core/Drawer';
import { Sidebar } from './Sidebar';
import DrawerHeader from '../DrawerHeader';

const createSidebarProps = ({
  className,
  isSidebarOpen,
  handleDrawerClose,
} = {}) => {
  return {
    className,
    classes: {
      drawer: '',
      drawerPaper: '',
    },
    isSidebarOpen,
    handleDrawerClose,
  };
};

describe('Sidebar', () => {
  let wrapper;

  describe('default values', () => {
    beforeAll(() => {
      const props = createSidebarProps();
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Sidebar {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <Drawer /> and one <DrawerHeader /> components with default values', () => {
      const drawer = wrapper.find(Drawer);
      expect(drawer).toHaveLength(1);
      expect(drawer.prop('open')).toEqual(false);
      const drawerHeader = drawer.find(DrawerHeader);
      expect(drawerHeader).toHaveLength(1);
    });
  });

  describe('isSidebarOpen = true, className, handleDrawerClose, children are defined', () => {
    const mockFunction = jest.fn();
    const children = <child>some child</child>;

    beforeAll(() => {
      const props = createSidebarProps({
        isSidebarOpen: true,
        className: 'className',
        handleDrawerClose: mockFunction,
      });
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Sidebar {...props}>{children}</Sidebar>);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <Drawer /> and one <DrawerHeader /> components with defined values', () => {
      const drawer = wrapper.find(Drawer);
      expect(drawer).toHaveLength(1);
      expect(drawer.prop('open')).toEqual(true);
      expect(drawer.prop('className')).toEqual('className');
      const drawerHeader = drawer.find(DrawerHeader);
      expect(drawerHeader).toHaveLength(1);
      expect(drawerHeader.prop('handleDrawerClose')).toBe(mockFunction);
      const childrenComponent = drawer.find('child');
      expect(childrenComponent).toHaveLength(1);
      expect(childrenComponent.text()).toContain('some child');
    });
  });
});
