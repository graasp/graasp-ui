import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import React, { FC, ReactElement } from 'react';

type CardHeaderProps = {
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: ({ children }: { children: JSX.Element }) => JSX.Element;
};

const CustomCardHeader: FC<CardHeaderProps> = ({
  name,
  creator,
  ItemMenu,
  NameWrapper = ({ children }: { children: ReactElement }) => children,
}) => {
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
          <Typography noWrap variant='subtitle1' sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
        </NameWrapper>
        {creator && (
          <Typography noWrap variant='caption'>
            {creator}
          </Typography>
        )}
      </Stack>
      {ItemMenu}
    </Stack>
  );
};

export default CustomCardHeader;
