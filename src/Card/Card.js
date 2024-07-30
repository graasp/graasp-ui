import {
  Box,
  CardActions,
  Card as MuiCard,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { Unstable_Grid2 as Grid2 } from '@mui/material/';

import { Link } from 'react-router-dom';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { PRIMARY_COLOR } from '@/theme.js';

import CardThumbnail from './CardThumbnail.js';

const DEFAULT_CARD_HEIGHT = 130;
const PROPS_TO_FORWARD = ['elevation', 'fullWidth', 'isSelected', 'isOver'];
const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => !PROPS_TO_FORWARD.includes(prop),
})(({ theme, elevation, fullWidth, isOver, isSelected }) => ({
  borderRadius: theme.spacing(1),
  boxShadow: elevation ? theme.shadows[2] : '0px 2px 2px #eeeeee',
  width: fullWidth ? '100%' : 'max-content',
  maxWidth: '100%',
  outline: isOver || isSelected ? `2px solid ${PRIMARY_COLOR}` : 'none',
}));
const Wrapper = ({ children, to }) => {
  if (!to) {
    return _jsx(_Fragment, { children: children });
  }
  return _jsx(Link, {
    to: to,
    style: { textDecoration: 'none', color: 'unset' },
    children: children,
  });
};
const Card = ({
  footer,
  id,
  creator,
  height: heightProp,
  name,
  sx,
  dense,
  thumbnail,
  menu,
  fullWidth = false,
  elevation = true,
  content,
  alt,
  to,
  type,
  isOver = false,
  isDragging = false,
  isSelected = false,
  className,
  onThumbnailClick,
}) => {
  let height = heightProp;
  if (!height) {
    height = dense ? 60 : DEFAULT_CARD_HEIGHT;
  }
  if (dense) {
    return _jsx(
      StyledCard,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        elevation: elevation && !isDragging,
        id: id,
        className: className,
        sx: sx,
        fullWidth: fullWidth,
        isOver: isOver,
        isSelected: isSelected,
        children: _jsxs(Stack, {
          sx: { height, boxSizing: 'border-box' },
          direction: 'row',
          gap: 1,
          alignItems: 'center',
          mr: 1,
          children: [
            _jsx(Box, {
              onClick: onThumbnailClick,
              height: '100%',
              children: _jsx(CardThumbnail, {
                width: height,
                minHeight: height,
                thumbnail: thumbnail,
                alt: alt,
                type: type,
              }),
            }),
            _jsxs(Grid2, {
              container: true,
              // necessary to respect flex layout, otherwise it does not compress
              minWidth: 0,
              width: '100%',
              sx: { mt: 0 },
              // ensure that if there is no description the element still goes edge to edge
              boxSizing: 'border-box',
              marginTop: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              children: [
                _jsx(Grid2, {
                  xs: 9,
                  sm: 5,
                  md: 5,
                  justifyContent: 'space-between',
                  // align to the top so the button does not move when there is no creator
                  alignItems: 'start',
                  boxSizing: 'border-box',
                  children: _jsx(Wrapper, {
                    to: to,
                    children: _jsxs(Stack, {
                      minWidth: 0,
                      children: [
                        _jsx(Typography, {
                          noWrap: true,
                          variant: dense ? 'h5' : 'h3',
                          children: name,
                        }),
                        creator &&
                          _jsx(Typography, {
                            noWrap: true,
                            variant: dense ? 'caption' : 'body1',
                            color: 'text.secondary',
                            children: creator,
                          }),
                      ],
                    }),
                  }),
                }),
                _jsx(Grid2, {
                  sm: 4,
                  xs: 0,
                  md: 5,
                  display: { xs: 'none', sm: 'block' },
                  children: _jsx(Wrapper, { to: to, children: content }),
                }),
                _jsx(Grid2, {
                  xs: 3,
                  sm: 3,
                  md: 2,
                  justifyContent: 'flex-end',
                  children: _jsxs(CardActions, {
                    sx: { p: 0, justifyContent: 'flex-end' },
                    children: [
                      _jsx(Stack, {
                        width: '100%',
                        alignItems: 'end',
                        direction: 'row',
                        justifyContent: 'flex-end',
                        alignContent: 'center',
                        display: { xs: 'none', sm: 'block' },
                        children: footer,
                      }),
                      menu,
                    ],
                  }),
                }),
              ],
            }),
          ],
        }),
      },
    );
  }
  return _jsx(StyledCard, {
    isOver: isOver,
    id: id,
    sx: sx,
    fullWidth: fullWidth,
    children: _jsxs(Stack, {
      sx: { height, boxSizing: 'border-box' },
      direction: 'row',
      gap: 2,
      children: [
        _jsx(CardThumbnail, {
          width: height,
          minHeight: height,
          thumbnail: thumbnail,
          alt: alt,
        }),
        _jsxs(Stack, {
          direction: 'column',
          // necessary to respect flex layout, otherwise it does not compress
          minWidth: 0,
          // ensure that if there is no description the element still goes edge to edge
          width: '100%',
          boxSizing: 'border-box',
          marginTop: 1,
          children: [
            _jsxs(Stack, {
              direction: 'row',
              justifyContent: 'space-between',
              // align to the top so the button does not move when there is no creator
              alignItems: 'start',
              boxSizing: 'border-box',
              children: [
                _jsx(Wrapper, {
                  to: to,
                  children: _jsxs(Stack, {
                    minWidth: 0,
                    direction: 'column',
                    children: [
                      _jsx(Typography, {
                        noWrap: true,
                        variant: dense ? 'h5' : 'h3',
                        children: name,
                      }),
                      creator &&
                        _jsx(Typography, {
                          noWrap: true,
                          variant: dense ? 'caption' : 'body1',
                          color: 'text.secondary',
                          children: creator,
                        }),
                    ],
                  }),
                }),
                menu,
              ],
            }),
            _jsx(Typography, {
              justifySelf: 'start',
              // necessary for the `position: absolute` on the :before to work
              position: 'relative',
              // allow compression in flex layout
              minHeight: 0,
              flexShrink: 1,
              // this element will take all available space
              flexGrow: 1,
              variant: 'caption',
              color: 'textSecondary',
              sx: {
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
              },
              children: content,
            }),
            footer,
          ],
        }),
      ],
    }),
  });
};
export default Card;
