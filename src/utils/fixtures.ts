import { CompleteMember, Member, MemberFactory } from '@graasp/sdk';

export const MOCK_MEMBER: Member = {
  id: 'id',
  name: 'creator',
  email: 'email',
};

export const MOCK_CURRENT_MEMBER: CompleteMember = MemberFactory();
