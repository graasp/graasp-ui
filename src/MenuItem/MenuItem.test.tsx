// make it a module
export {};
// import React from 'react';
// import { shallow, ShallowWrapper } from 'enzyme';
// import MaterialMenuItem from '@material-ui/core/MenuItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import { MenuItem, MenuItemProps } from './MenuItem';
//
// const createMenuItemProps = (opts?: {
//   id?: string;
//   text?: string;
//   icon?: JSX.Element;
//   onClick?: () => void;
//   key?: string;
// }): MenuItemProps => ({
//   id: opts?.id,
//   text: opts?.text,
//   icon: opts?.icon,
//   onClick: opts?.onClick,
//   key: opts?.key,
// });
//
// describe('MenuItem', () => {
//   let wrapper: ShallowWrapper;
//
//   describe('default values', () => {
//     beforeAll(() => {
//       const props = createMenuItemProps();
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<MenuItem {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <MenuItem /> material component with default values', () => {
//       const menuItem = wrapper.find(MaterialMenuItem);
//       expect(menuItem).toHaveLength(1);
//       const icon = menuItem.find(ListItemIcon);
//       expect(icon).toHaveLength(0);
//       const text = menuItem.find(ListItemText);
//       expect(text).toHaveLength(0);
//     });
//   });
//
//   describe('prop values', () => {
//     const mockFunction = jest.fn();
//     beforeAll(() => {
//       const props = createMenuItemProps({
//         text: 'text',
//         id: 'id',
//         onClick: mockFunction,
//         key: 'key',
//         icon: <ChevronRightIcon />,
//       });
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<MenuItem {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <MenuItem /> material component with default values', () => {
//       const menuItem = wrapper.find(MaterialMenuItem);
//       expect(menuItem).toHaveLength(1);
//       expect(menuItem.prop('id')).toEqual('id');
//       expect(menuItem.prop('onClick')).toBe(mockFunction);
//       const icon = menuItem.find(ListItemIcon);
//       expect(icon).toHaveLength(1);
//       const chevron = menuItem.find(ChevronRightIcon);
//       expect(chevron).toHaveLength(1);
//       const text = menuItem.find(ListItemText);
//       expect(text).toHaveLength(1);
//       expect(text.prop('primary')).toEqual('text');
//     });
//   });
// });
