import { Record } from 'immutable';

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
};

export class ImmutableItem extends Record({
  id: '',
  name: '',
  path: '',
  description: '',
  extra: {},
}) {}

export type Member = {
  id: string;
  name: string;
};
