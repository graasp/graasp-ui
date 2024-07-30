import { validate } from 'uuid';

export const isMemberIdValid = (memberId) => {
  if (!memberId) {
    return false;
  }
  return validate(memberId?.trim());
};
