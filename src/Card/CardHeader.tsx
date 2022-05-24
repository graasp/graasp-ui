import React, { FC, ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

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
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 1,
        width: '100%',
      }}
    >
      <Grid item xs={9} sx={{ display: 'flex', width: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <NameWrapper>
              <Typography
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: 'bold',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {name}
              </Typography>
            </NameWrapper>
          </Grid>
          {creator && (
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
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
