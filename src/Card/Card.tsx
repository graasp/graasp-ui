import MenuButton from '@/buttons/MenuButton/MenuButton';

import { Stack, SxProps, styled } from '@mui/material';
import MuiCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import { ReactElement } from 'react';

import CardThumbnail from './CardThumbnail';

const DEFAULT_CARD_HEIGHT = 130;

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'elevation' && prop !== 'fullWidth',
})<{ fullWidth?: boolean; elevation?: boolean }>(
  ({ theme, elevation, fullWidth }) => ({
    borderRadius: theme.spacing(1),
    boxShadow: elevation ? theme.shadows[2] : 'none',
    width: fullWidth ? '100%' : 'max-content',
    maxWidth: '100%',
  }),
);

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
  height?: number;
  /**
   * image link to display as thumbnail
   */
  thumbnail?: string;
  footer?: ReactElement;
  sx?: SxProps;
  /**
   * Whether the card should expand to take all available space
   */
  fullWidth?: boolean;

  dense?: boolean;
  elevation?: boolean;
  menuItems?: JSX.Element[];
  content?: JSX.Element;
};

const Card = ({
  footer,
  cardId,
  creator,
  height: heightProp,
  name,
  sx,
  dense,
  thumbnail,
  menuItems,
  fullWidth = false,
  elevation = true,
  content,
}: CardProps): JSX.Element => {
  let height = heightProp;
  if (!height) {
    height = dense ? 55 : DEFAULT_CARD_HEIGHT;
  }

  // TODO: export in new component
  if (dense) {
    return (
      <StyledCard
        // TODO: cannot make it work
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        elevation={elevation}
        id={cardId}
        sx={sx}
        fullWidth={fullWidth}
      >
        <Stack sx={{ height, boxSizing: 'border-box' }} direction='row' gap={1}>
          <CardThumbnail
            width={height}
            minHeight={height}
            thumbnail={thumbnail}
            alt={name}
          />

          <Stack
            direction='row'
            // necessary to respect flex layout, otherwise it does not compress
            minWidth={0}
            // ensure that if there is no description the element still goes edge to edge
            width='100%'
            boxSizing='border-box'
            marginTop={1}
            justifyContent={'space-between'}
          >
            <Stack
              direction='row'
              justifyContent='space-between'
              // align to the top so the button does not move when there is no creator
              alignItems='start'
              boxSizing='border-box'
            >
              <Stack minWidth={0} direction='column'>
                <Typography noWrap variant={dense ? 'h5' : 'h3'}>
                  {name}
                </Typography>
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
            </Stack>
            <Stack>{content}</Stack>
            <CardActions sx={{ pt: 0, pl: 0 }}>
              <Stack
                width='100%'
                alignItems='end'
                direction='row'
                justifyContent='flex-end'
              >
                {footer}
              </Stack>
              {menuItems && <MenuButton menuItems={menuItems} />}
            </CardActions>
          </Stack>
        </Stack>
      </StyledCard>
    );
  }

  return (
    <StyledCard id={cardId} sx={sx} fullWidth={fullWidth}>
      <Stack sx={{ height, boxSizing: 'border-box' }} direction='row' gap={2}>
        <CardThumbnail
          width={height}
          minHeight={height}
          thumbnail={thumbnail}
          alt={name}
        />

        <Stack
          direction='column'
          // necessary to respect flex layout, otherwise it does not compress
          minWidth={0}
          // ensure that if there is no description the element still goes edge to edge
          width='100%'
          boxSizing='border-box'
          marginTop={1}
        >
          <Stack
            direction='row'
            justifyContent='space-between'
            // align to the top so the button does not move when there is no creator
            alignItems='start'
            boxSizing='border-box'
          >
            <Stack minWidth={0} direction='column'>
              <Typography noWrap variant={dense ? 'h5' : 'h3'}>
                {name}
              </Typography>
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
            <MenuButton menuItems={menuItems} />
          </Stack>
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
            {content}
          </Typography>
          {footer}
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default Card;
