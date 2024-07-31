import { validate } from 'uuid';

export const isMemberIdValid = (memberId?: string): boolean => {
  if (!memberId) {
    return false;
  }
  return validate(memberId?.trim());
};
