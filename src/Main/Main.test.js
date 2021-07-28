import React from 'react';
import { shallow } from 'enzyme';
import { Main } from './Main';
import Header from '../Header';
import Sidebar from '../Sidebar';

const createMainProps = ({ fullScreen, children, sidebar } = {}) => ({
  classes: {
    fullScreen: 'fullScreen',
    root: '',
    content: '',
    contentShift: '',
    drawerHeader: '',
  },
  children,
  sidebar,
  fullScreen,
});

describe('Main', () => {
  let wrapper;

  describe('default values', () => {
    beforeAll(() => {
      const props = createMainProps();
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Main {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <Header /> component with default values', () => {
      const sidebar = wrapper.find(Sidebar);
      expect(sidebar).toHaveLength(0);
      const header = wrapper.find(Header);
      expect(header).toHaveLength(1);
      const main = wrapper.find('main');
      expect(main).toHaveLength(1);
      expect(main.hasClass('fullScreen')).toEqual(false);
    });
  });

  describe('fullScreen = true', () => {
    beforeAll(() => {
      const props = createMainProps({ fullScreen: true });
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Main {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <Header /> and no <Sidebar/> components', () => {
      const sidebar = wrapper.find(Sidebar);
      expect(sidebar).toHaveLength(0);
      const header = wrapper.find(Header);
      expect(header).toHaveLength(1);
      const main = wrapper.find('main');
      expect(main).toHaveLength(1);
      expect(main.hasClass('fullScreen')).toEqual(true);
    });
  });

  describe('children is defined', () => {
    beforeAll(() => {
      const props = createMainProps({ children: <child>some child</child> });
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Main {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <Header /> component', () => {
      const sidebar = wrapper.find(Sidebar);
      expect(sidebar).toHaveLength(0);
      const header = wrapper.find(Header);
      expect(header).toHaveLength(1);
      const main = wrapper.find('main');
      expect(main).toHaveLength(1);
      expect(main.hasClass('fullScreen')).toEqual(false);
      const child = wrapper.find('child');
      expect(child).toHaveLength(1);
    });
  });

  describe('sidebar is defined', () => {
    beforeAll(() => {
      const props = createMainProps({ sidebar: <child>some child</child> });
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Main {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <Header /> and one <Sidebar/> components', () => {
      const sidebar = wrapper.find(Sidebar);
      expect(sidebar).toHaveLength(1);
      const header = wrapper.find(Header);
      expect(header).toHaveLength(1);
      const main = wrapper.find('main');
      expect(main).toHaveLength(1);
      expect(main.hasClass('fullScreen')).toEqual(false);
      const child = wrapper.find('child');
      expect(child).toHaveLength(1);
    });
  });
});
