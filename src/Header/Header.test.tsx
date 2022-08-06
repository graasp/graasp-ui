// make it a module
export {};
// import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { shallow, ShallowWrapper } from 'enzyme';
// import { Header, HeaderProps } from './Header';
// import { OPEN_DRAWER_LABEL } from '../texts';
//
// const createHeaderProps = (opts?: {
//   id?: string;
//   isSidebarOpen?: boolean;
//   hasSidebar?: boolean;
//   openDrawerAriaLabel?: string;
// }): HeaderProps => {
//   return {
//     id: opts?.id,
//     hasSidebar: opts?.hasSidebar || false,
//     handleDrawerOpen: jest.fn(),
//     isSidebarOpen: opts?.isSidebarOpen,
//     openDrawerAriaLabel: opts?.openDrawerAriaLabel,
//   };
// };
//
// describe('Header', () => {
//   let wrapper: ShallowWrapper;
//
//   describe('default props', () => {
//     beforeAll(() => {
//       const props = createHeaderProps();
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<Header {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <AppBar /> component without drawer icon', () => {
//       const appBar = wrapper.find(AppBar);
//       expect(appBar).toHaveLength(1);
//       const icon = wrapper.find(IconButton);
//       expect(icon).toHaveLength(0);
//     });
//   });
//
//   describe('hasSidebar = true', () => {
//     describe('isSidebarOpen = false', () => {
//       beforeAll(() => {
//         const props = createHeaderProps({
//           hasSidebar: true,
//           isSidebarOpen: false,
//           openDrawerAriaLabel: 'sometext',
//         });
//         // eslint-disable-next-line react/jsx-props-no-spreading
//         wrapper = shallow(<Header {...props} />);
//       });
//
//       it('renders correctly', () => {
//         expect(wrapper).toMatchSnapshot();
//       });
//
//       it('renders one <AppBar /> component with drawer icon not hidden', () => {
//         const appBar = wrapper.find(AppBar);
//         expect(appBar).toHaveLength(1);
//         const icon = wrapper.find(IconButton);
//         expect(icon).toHaveLength(1);
//         expect(icon.prop('aria-label')).toEqual('sometext');
//         expect(icon.hasClass('hide')).toEqual(false);
//         const menuIcon = icon.find(MenuIcon);
//         expect(menuIcon).toHaveLength(1);
//       });
//     });
//
//     describe('isSidebarOpen = true', () => {
//       beforeAll(() => {
//         const props = createHeaderProps({
//           hasSidebar: true,
//           isSidebarOpen: true,
//           id: 'id',
//         });
//         // eslint-disable-next-line react/jsx-props-no-spreading
//         wrapper = shallow(<Header {...props} />);
//       });
//
//       it('renders one <AppBar /> component with drawer icon hidden', () => {
//         const appBar = wrapper.find(AppBar);
//         expect(appBar).toHaveLength(1);
//         const icon = wrapper.find(IconButton);
//         expect(icon).toHaveLength(1);
//         expect(icon.prop('aria-label')).toEqual(OPEN_DRAWER_LABEL);
//         expect(icon.prop('id')).toEqual('id');
//         expect(icon.prop('className')).toContain('hide');
//         const menuIcon = icon.find(MenuIcon);
//         expect(menuIcon).toHaveLength(1);
//       });
//     });
//   });
// });
