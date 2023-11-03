import { CompleteMember, Member, MemberType } from '@graasp/sdk';

export const MOCK_MEMBER: Member = {
  id: 'id',
  name: 'creator',
  email: 'email',
};

export const MOCK_CURRENT_MEMBER: CompleteMember = {
  id: 'current id',
  name: 'current member',
  email: 'current email',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  type: MemberType.Individual,
  extra: {},
};
