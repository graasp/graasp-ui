import { Stack, Typography } from '@mui/material';

import { ReactElement } from 'react';

type CardHeaderProps = {
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: ({ children }: { children: JSX.Element }) => JSX.Element;
  dense?: boolean;
};

const CustomCardHeader = ({
  name,
  creator,
  ItemMenu,
  dense,
  NameWrapper = ({ children }: { children: ReactElement }) => children,
}: CardHeaderProps): JSX.Element => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      // align to the top so the button does not move when there is no creator
      alignItems='start'
      boxSizing='border-box'
    >
      <Stack minWidth={0} direction='column'>
        <NameWrapper>
          <Typography noWrap variant={dense ? 'h5' : 'h3'}>
            {name}
          </Typography>
        </NameWrapper>
        {creator && (
          <Typography
            noWrap
            variant={dense ? 'caption' : 'body1'}
            color='text.secondary'
          >
            {creator}
          </Typography>
        )}
      </Stack>
      {ItemMenu}
    </Stack>
  );
};

export default CustomCardHeader;
