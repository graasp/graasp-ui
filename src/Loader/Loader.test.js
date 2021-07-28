import React from 'react';
import ReactLoading from 'react-loading';
import { shallow } from 'enzyme';
import { Loader } from './Loader';
import { PRIMARY_COLOR } from '../theme';

const createLoaderProps = ({ type, color, className } = {}) => {
  return {
    className,
    type,
    color,
  };
};

describe('Loader', () => {
  let wrapper;

  describe('default values', () => {
    beforeAll(() => {
      const props = createLoaderProps();
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Loader {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <ReactLoading /> component with default values', () => {
      const reactLoading = wrapper.find(ReactLoading);
      expect(reactLoading).toHaveLength(1);
      expect(reactLoading.prop('type')).toEqual('bubbles');
      expect(reactLoading.prop('color')).toEqual(PRIMARY_COLOR);
    });
  });

  describe('prop values', () => {
    beforeAll(() => {
      const props = createLoaderProps({
        type: 'sometype',
        color: 'red',
        className: 'someclass',
      });
      // eslint-disable-next-line react/jsx-props-no-spreading
      wrapper = shallow(<Loader {...props} />);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders one <ReactLoading /> component with prop values', () => {
      const reactLoading = wrapper.find(ReactLoading);
      expect(reactLoading).toHaveLength(1);
      expect(reactLoading.prop('type')).toEqual('sometype');
      expect(reactLoading.prop('color')).toEqual('red');
      const divWrapper = wrapper.find('div.someclass');
      expect(divWrapper).toHaveLength(1);
    });
  });
});
