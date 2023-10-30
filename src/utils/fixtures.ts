import { Member, convertJs } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';

export const MOCK_MEMBER: Member = {
  id: 'id',
  name: 'creator',
  email: 'email',
  // extra: {},
  // createdAt: new Date(),
  // updatedAt: new Date(),
  // type: MemberType.Individual,
};

export const MOCK_MEMBER_RECORD: MemberRecord = convertJs(MOCK_MEMBER);
