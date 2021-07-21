import React from 'react';

interface ItemIcon {
  name?: string;
  // todo: check is valid type
  type: string;
  extra: object;
  color?: string;
  className?: string;
}

declare const CustomItemTree: React.Component<ItemIcon>;
