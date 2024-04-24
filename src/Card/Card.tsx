import { Box, Stack, SxProps, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { FC, ReactElement } from 'react';

import CardHeader from './CardHeader';

const DEFAULT_CARD_HEIGHT = 130;

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth: boolean }>(({ theme, fullWidth }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[2],
  width: fullWidth ? '100%' : 'max-content',
}));

type CardProps = {
  name: string;
  /**
   * actions displayed at the bottom of the card
   */
  Actions?: ReactElement;
  Badges?: ReactElement;
  cardId?: string;
  /**
   * creator name
   */
  creator?: string;
  description?: string | JSX.Element;
  height?: string | number;
  /**
   * image link to display as thumbnail
   */
  image?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: ({ children }: { children: JSX.Element }) => JSX.Element;
  sx?: SxProps;
  /**
   * Whether the card should expand to take all available space
   */
  fullWidth?: boolean;
  /**
   * thumbnail component, override image
   */
  Thumbnail?: ReactElement;
};

const Item: FC<CardProps> = ({
  Actions,
  Badges,
  cardId,
  creator,
  description,
  height = DEFAULT_CARD_HEIGHT,
  image,
  ItemMenu,
  name,
  NameWrapper,
  sx,
  Thumbnail,
  fullWidth = false,
}) => {
  const ThumbnailWrapper = styled(Box)({
    // use a square box to display the image
    width: height,
    height,
    maxWidth: '50%',
    // don't shrink the image on flex
    flexShrink: 0,
  });

  const renderImage = (): ReactElement => {
    return Thumbnail || <StyledImage src={image} alt={name} />;
  };

  return (
    <StyledCard id={cardId} sx={sx} fullWidth={fullWidth}>
      <Stack sx={{ height, boxSizing: 'border-box' }} direction='row' gap={2}>
        <ThumbnailWrapper>{renderImage()}</ThumbnailWrapper>

        <Stack
          direction='column'
          // necessary to respect flex layout, otherwise it does not compress
          minWidth={0}
          // ensure that if there is no description the element still goes edge to edge
          width='100%'
          boxSizing='border-box'
          marginTop={1}
        >
          <CardHeader
            name={name}
            creator={creator}
            ItemMenu={ItemMenu}
            NameWrapper={NameWrapper}
          />
          <Typography
            justifySelf='start'
            // necessary for the `position: absolute` on the :before to work
            position='relative'
            // allow compression in flex layout
            minHeight={0}
            flexShrink={1}
            // this element will take all available space
            flexGrow={1}
            variant='caption'
            color='textSecondary'
            sx={{
              // margin to the right
              mr: 1,
              // hide overflowing text
              overflow: 'hidden',
              // use a before element to create a gradient to suggest there is more text
              '&:before': {
                content: '""',
                width: '100%',
                height: '30px',
                position: 'absolute',
                left: '0px',
                bottom: '0px',
                background: (theme) =>
                  `linear-gradient(transparent 10px, ${theme.palette.background.paper})`,
              },
            }}
          >
            {description}
          </Typography>
          {(Actions || Badges) && (
            <CardActions sx={{ pt: 0, pl: 0 }}>
              <Stack
                width='100%'
                alignItems='end'
                direction='row'
                justifyContent='space-between'
              >
                {Badges || <span />}
                <Box margin={(theme) => `-${theme.spacing(1)}`}>
                  {Actions || <span />}
                </Box>
              </Stack>
            </CardActions>
          )}
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default Item;
