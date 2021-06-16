import { Map } from 'immutable';
import React from 'react';

interface LinkItemProps {
  item: Map;
  height?: number;
}

declare const LinkItem: React.FC<LinkItemProps>;
