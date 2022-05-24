import React from 'react';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ShallowWrapper, shallow } from 'enzyme';
import { DrawerHeader, DrawerHeaderProps } from './DrawerHeader';

const createDrawerHeaderProps = (opts?: {
  direction: string;
}): DrawerHeaderProps => {
  return {
    theme: {
      direction: opts?.direction,
    },
    handleDrawerClose: jest.fn(),
  };
};

describe('DrawerHeader', () => {
  let wrapper: ShallowWrapper;

  describe('default values', () => {
    beforeAll(() => {
      const props = createDrawerHeaderProps();
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<DrawerHeader {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <ListItem /> component with correct chevron icon', () => {
      const listItem = wrapper.find(ListItem);
      expect(listItem).toHaveLength(1);
      const icon = listItem.find(IconButton);
      expect(icon).toHaveLength(1);
      const menuIcon = icon.find(ChevronLeftIcon);
      expect(menuIcon).toHaveLength(1);
    });
  });

  describe('prop values and children', () => {
    const children = <div className='test-child'>some child</div>;

    beforeAll(() => {
      const props = createDrawerHeaderProps({ direction: 'rtl' });
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<DrawerHeader {...props}>{children}</DrawerHeader>);
    });

    it('renders one <ListItem /> component with correct chevron icon', () => {
      const listItem = wrapper.find(ListItem);
      expect(listItem).toHaveLength(1);
      const childrenComponent = wrapper.find('.test-child');
      expect(childrenComponent).toHaveLength(1);
      expect(childrenComponent.text()).toEqual('some child');
      const icon = listItem.find(IconButton);
      expect(icon).toHaveLength(1);
      const menuIcon = icon.find(ChevronRightIcon);
      expect(menuIcon).toHaveLength(1);
    });
  });
});
