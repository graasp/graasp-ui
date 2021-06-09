import { Map } from 'immutable';
import React from 'react';

interface AppItemProps {
  item: Map;
  user: Map;
  apiHost: string;
}

declare const AppItem: React.FC<AppItemProps>;
