import React, { FC, ReactElement } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material';

type CardHeaderProps = {
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: FC;
};

const StyledGridContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: theme.spacing(1),
  width: '100%',
}));

const ItemMenuContainer = styled(Grid)({
  textAlign: 'right',
});

const StyledName = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 'bold',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const CreatorTypography = styled(Typography)({
  fontSize: '0.72rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const CustomCardHeader: FC<CardHeaderProps> = ({
  name,
  creator,
  ItemMenu,
  NameWrapper = ({ children }: { children: ReactElement }) => children,
}) => {
  return (
    <StyledGridContainer container>
      <Grid item xs={9} sx={{ display: 'flex', width: '100%' }}>
        <Grid container>
          <Grid item xs={12}>
            <NameWrapper>
              <StyledName>{name}</StyledName>
            </NameWrapper>
          </Grid>
          {creator && (
            <Grid item xs={12}>
              <CreatorTypography>{creator}</CreatorTypography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <ItemMenuContainer item xs={3}>
        {ItemMenu}
      </ItemMenuContainer>
    </StyledGridContainer>
  );
};

export default CustomCardHeader;
