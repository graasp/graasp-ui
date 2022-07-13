// make it a module
export {};
// import React from 'react';
// import { shallow, ShallowWrapper } from 'enzyme';
// import { Main, MainProps } from './Main';
// import Header from '../Header';
// import Sidebar from '../Sidebar';
//
// const createMainProps = (opts?: {
//   fullScreen?: boolean;
//   children?: JSX.Element;
//   sidebar?: JSX.Element;
// }): MainProps => ({
//   classes: {
//     fullScreen: 'fullScreen',
//     root: '',
//     content: '',
//     contentShift: '',
//     drawerHeader: '',
//   },
//   children: opts?.children,
//   sidebar: opts?.sidebar,
//   fullScreen: opts?.fullScreen,
// });
//
// describe('Main', () => {
//   let wrapper: ShallowWrapper;
//
//   describe('default values', () => {
//     beforeAll(() => {
//       const props = createMainProps();
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<Main {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <Header /> component with default values', () => {
//       const sidebar = wrapper.find(Sidebar);
//       expect(sidebar).toHaveLength(0);
//       const header = wrapper.find(Header);
//       expect(header).toHaveLength(1);
//       const main = wrapper.find('main');
//       expect(main).toHaveLength(1);
//       expect(main.hasClass('fullScreen')).toEqual(false);
//     });
//   });
//
//   describe('fullScreen = true', () => {
//     beforeAll(() => {
//       const props = createMainProps({ fullScreen: true });
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<Main {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <Header /> and no <Sidebar/> components', () => {
//       const sidebar = wrapper.find(Sidebar);
//       expect(sidebar).toHaveLength(0);
//       const header = wrapper.find(Header);
//       expect(header).toHaveLength(1);
//       const main = wrapper.find('main');
//       expect(main).toHaveLength(1);
//       expect(main.hasClass('fullScreen')).toEqual(true);
//     });
//   });
//
//   describe('children is defined', () => {
//     beforeAll(() => {
//       const props = createMainProps({
//         children: <div className='test-child'>some child</div>,
//       });
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<Main {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <Header /> component', () => {
//       const sidebar = wrapper.find(Sidebar);
//       expect(sidebar).toHaveLength(0);
//       const header = wrapper.find(Header);
//       expect(header).toHaveLength(1);
//       const main = wrapper.find('main');
//       expect(main).toHaveLength(1);
//       expect(main.hasClass('fullScreen')).toEqual(false);
//       const child = wrapper.find('.test-child');
//       expect(child).toHaveLength(1);
//     });
//   });
//
//   describe('sidebar is defined', () => {
//     beforeAll(() => {
//       const props = createMainProps({
//         sidebar: <div className='test-child'>some child</div>,
//       });
//       // eslint-disable-next-line react/jsx-props-no-spreading
//       wrapper = shallow(<Main {...props} />);
//     });
//
//     it('renders correctly', () => {
//       expect(wrapper).toMatchSnapshot();
//     });
//
//     it('renders one <Header /> and one <Sidebar/> components', () => {
//       const sidebar = wrapper.find(Sidebar);
//       expect(sidebar).toHaveLength(1);
//       const header = wrapper.find(Header);
//       expect(header).toHaveLength(1);
//       const main = wrapper.find('main');
//       expect(main).toHaveLength(1);
//       expect(main.hasClass('fullScreen')).toEqual(false);
//       const child = wrapper.find('.test-child');
//       expect(child).toHaveLength(1);
//     });
//   });
// });
