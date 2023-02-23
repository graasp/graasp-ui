import {
  MemberType,
} from '@graasp/sdk';

export const MOCK_MEMBER = {
  id: 'id',
  name: 'creator',
  email: 'email',
  extra: {},
  createdAt: new Date(),
  updatedAt: new Date(),
  type: MemberType.Individual,
}
