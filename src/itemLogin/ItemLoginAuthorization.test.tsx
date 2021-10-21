import React, { Component, ReactNode } from 'react';
import { v4 } from 'uuid';
import { Map } from 'immutable';
import { shallow, ShallowWrapper } from 'enzyme';
import Alert from '@material-ui/lab/Alert';
import Loader from '../Loader';
import ItemLoginAuthorization, {
  ItemLoginAuthorizationProps,
} from './ItemLoginAuthorization';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { FORBIDDEN_TEXT, SETTINGS } from '../constants';
import ItemLoginScreen from './ItemLoginScreen';
import ForbiddenContent from './ForbiddenContent';

const defaultData: {
  data?: any;
  isLoading?: boolean;
  isError?: boolean;
  error?: { message: any };
} = {
  data: null,
  isLoading: false,
  isError: false,
  error: undefined,
};

const createProps = ({
  itemId = '',
  useCurrentMemberData = defaultData,
  useItemData = defaultData,
  useItemLoginData = defaultData,
  signOut = jest.fn(),
  signIn = jest.fn(),
}): ItemLoginAuthorizationProps => ({
  useCurrentMember: jest.fn().mockReturnValue(useCurrentMemberData),
  useItem: jest.fn().mockReturnValue(useItemData),
  useItemLogin: jest.fn().mockReturnValue(useItemLoginData),
  itemId,
  signOut,
  signIn,
});

class MockChildren extends Component {
  render(): ReactNode {
    return <div />;
  }
}

describe('ItemLoginAuthorization', () => {
  let wrapper: ShallowWrapper;

  it('renders correctly', () => {
    const props = createProps({
      itemId: v4(),
      useCurrentMemberData: { data: null, isLoading: true },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders <Loader /> if member is loading', () => {
    const props = createProps({
      itemId: v4(),
      useCurrentMemberData: { data: null, isLoading: true },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(Loader);
    expect(loader).toHaveLength(1);
  });

  it('renders <Loader /> if item is loading', () => {
    const props = createProps({
      itemId: v4(),
      useItemData: { data: null, isLoading: true },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(Loader);
    expect(loader).toHaveLength(1);
  });
  it('renders Alert if member throws an error', () => {
    const props = createProps({
      itemId: v4(),
      useCurrentMemberData: { data: null, isError: true },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(Alert);
    expect(loader).toHaveLength(1);
  });
  it('renders Alert if item throws a bad request error', () => {
    const props = createProps({
      itemId: v4(),
      useItemData: {
        data: null,
        isError: true,
        error: { message: getReasonPhrase(StatusCodes.BAD_REQUEST) },
      },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(Alert);
    expect(loader).toHaveLength(1);
  });
  it('renders Alert if item throws a not found error', () => {
    const props = createProps({
      itemId: v4(),
      useItemData: {
        data: null,
        isError: true,
        error: { message: getReasonPhrase(StatusCodes.NOT_FOUND) },
      },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(Alert);
    expect(loader).toHaveLength(1);
  });
  it('renders Child component if item is defined', () => {
    const props = createProps({
      itemId: v4(),
      useItemData: {
        data: Map({
          id: v4(),
        }),
      },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(MockChildren);
    expect(loader).toHaveLength(1);
  });
  it('renders ItemLoginScreen if user is undefined and item login exists', () => {
    const props = createProps({
      itemId: v4(),
      useItemLoginData: {
        data: Map({ loginSchema: SETTINGS.ITEM_LOGIN.OPTIONS.USERNAME }),
      },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(ItemLoginScreen);
    expect(loader).toHaveLength(1);
  });
  it('renders ForbiddenContent if user is defined and item is undefined', () => {
    const props = createProps({
      itemId: v4(),
      useCurrentMemberData: { data: Map({ id: v4() }) },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);
    const loader = wrapper.find(ForbiddenContent);
    expect(loader).toHaveLength(1);
  });
  it('renders ForbiddenContent if item login is undefined and cannot fetch item', () => {
    const props = createProps({
      itemId: v4(),
      useItemLoginData: { data: Map({ id: v4() }) },
      useItemData: { isError: true, error: { message: 'error' } },
    });
    const Comp = ItemLoginAuthorization(props)(MockChildren);
    wrapper = shallow(<Comp />);

    expect(wrapper.html()).toContain(FORBIDDEN_TEXT);
  });
});
