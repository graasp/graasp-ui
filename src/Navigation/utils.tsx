import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, styled } from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';

export const ITEM_NAME_MAX_LENGTH = 15;

export const CenterAlignWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'text.primary',
});

export const Separator = <NavigateNextIcon />;

export const StyledIconButton = styled(IconButton)({
  margin: 0,
});
