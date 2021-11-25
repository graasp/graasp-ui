import { Map, Record } from 'immutable';

export type UUID = string;

type ItemExtra = {};

// create immutable items using record
// https://medium.com/@dyskplus/not-sure-if-that-wasnt-possible-as-of-writing-this-article-but-right-now-i-think-you-could-simply-ecafc50d06
// we won't need Item anymore once all levels are immutable (List<Record<Item>>)
export type Item = {
  id: UUID;
  name: string;
  path: string;
  extra: ItemExtra;
  description?: string;
  type: string;
  creator: string;
};

export type Member = {
  id: string;
  name: string;
  email: string;
};

export type ItemMembership = {
  id: string;
};

// todo: better solution?
// conflict between isEmpty which only exists in Map, List of objects and the fact
// we cannot create a Record from data
export type ImmutableItem = Map<string, any>;
export type ImmutableMember = Map<string, any>;
export type ItemLogin = Map<string, any>;
export class ImmutableItemClass extends Record({
  id: '',
  name: '',
  path: '',
  description: '',
  extra: {},
  type: '',
  creator: '',
}) { }
