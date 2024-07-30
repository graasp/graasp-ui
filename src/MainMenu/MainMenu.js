import { List } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

export const MainMenu = ({ id, children, fullHeight }) => {
  return _jsx(List, {
    id: id,
    sx: { height: fullHeight ? '100%' : undefined },
    children: children,
  });
};
export default MainMenu;
