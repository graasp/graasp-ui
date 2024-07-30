import { List } from '@mui/material';

import { ReactNode } from 'react';

export type MainMenuProps = {
  id?: string;
  children?: ReactNode;
  /** whether container is full height
   * this allows possible footer elements */
  fullHeight?: boolean;
};

export const MainMenu = ({
  id,
  children,
  fullHeight,
}: MainMenuProps): JSX.Element => {
  return (
    <List id={id} sx={{ height: fullHeight ? '100%' : undefined }}>
      {children}
    </List>
  );
};

export default MainMenu;
