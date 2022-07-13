// make it a module
export {};
// import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
// import ListItem from '@material-ui/core/ListItem';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { ShallowWrapper, shallow } from 'enzyme';
// import { DrawerHeader, DrawerHeaderProps } from './DrawerHeader';
//
// const createDrawerHeaderProps = (opts?: {
//   direction: string;
// }): DrawerHeaderProps => {
//   return {
//     theme: {
//       direction: opts?.direction,
//     },
//     handleDrawerClose: jest.fn(),
//   };
// };
//
// describe('DrawerHeader', () => {
//   let wrapper: ShallowWrapper;
//
//   describe('default values', () => {
//     beforeAll(() => {
//       const props = createDrawerHeaderProps();
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<DrawerHeader {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <ListItem /> component with correct chevron icon', () => {
//       const listItem = wrapper.find(ListItem);
//       expect(listItem).toHaveLength(1);
//       const icon = listItem.find(IconButton);
//       expect(icon).toHaveLength(1);
//       const menuIcon = icon.find(ChevronLeftIcon);
//       expect(menuIcon).toHaveLength(1);
//     });
//   });
//
//   describe('prop values and children', () => {
//     const children = <div className='test-child'>some child</div>;
//
//     beforeAll(() => {
//       const props = createDrawerHeaderProps({ direction: 'rtl' });
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<DrawerHeader {...props}>{children}</DrawerHeader>);
//     });
//
//     it('renders one <ListItem /> component with correct chevron icon', () => {
//       const listItem = wrapper.find(ListItem);
//       expect(listItem).toHaveLength(1);
//       const childrenComponent = wrapper.find('.test-child');
//       expect(childrenComponent).toHaveLength(1);
//       expect(childrenComponent.text()).toEqual('some child');
//       const icon = listItem.find(IconButton);
//       expect(icon).toHaveLength(1);
//       const menuIcon = icon.find(ChevronRightIcon);
//       expect(menuIcon).toHaveLength(1);
//     });
//   });
// });
