import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import React, { FC, ReactElement } from 'react';

type CardHeaderProps = {
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: FC;
};

const CustomCardHeader: FC<CardHeaderProps> = ({
  name,
  creator,
  ItemMenu,
  NameWrapper = ({ children }: { children: ReactElement }) => children,
}) => {
  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      sx={{ width: '100%', pl: 1 }}
    >
      <Grid item xs={9} sx={{ display: 'flex', width: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <NameWrapper>
              <Typography
                noWrap
                variant='subtitle1'
                sx={{ fontWeight: 'bold' }}
              >
                {name}
              </Typography>
            </NameWrapper>
          </Grid>
          {creator && (
            <Grid item xs={12}>
              <Typography noWrap variant='caption'>
                {creator}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={3} sx={{ textAlign: 'right' }}>
        {ItemMenu}
      </Grid>
    </Grid>
  );
};

export default CustomCardHeader;
