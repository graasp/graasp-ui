import { KeyboardArrowRight } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

import { useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import ItemIcon from '@/icons/ItemIcon.js';

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})(({ theme, isSelected }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  justifyContent: 'start',
  background: isSelected ? theme.palette.grey[200] : 'none',
  textTransform: 'none',
  pl: 1,
}));
const RowMenu = ({
  item,
  onNavigate,
  onClick,
  selectedId,
  isDisabled,
  id,
  arrowId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  return _jsx(Stack, {
    direction: 'row',
    justifyContent: 'space-between',
    id: id,
    sx: {
      '& .arrow': {
        visibility: 'hidden',
      },
      '&:hover .arrow': {
        visibility: 'unset',
      },
    },
    children: _jsxs(Stack, {
      direction: 'row',
      alignItems: 'center',
      width: '100%',
      children: [
        _jsx(StyledButton, {
          onClick: () => {
            onClick(item);
          },
          isSelected: selectedId === item.id,
          disabled: isDisabled?.(item),
          startIcon: _jsx(ItemIcon, {
            size: '20px',
            alt: `${item.name} icon`,
            type: ItemType.FOLDER,
          }),
          children: _jsx(Typography, {
            sx: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            },
            variant: 'body1',
            children: item.name,
          }),
        }),
        isLoading && _jsx(CircularProgress, { size: 20 }),
        !isLoading &&
          _jsx(IconButton, {
            className: 'arrow',
            onClick: () => {
              setIsLoading(true);
              onNavigate(item);
            },
            id: arrowId,
            size: 'small',
            children: _jsx(KeyboardArrowRight, {}),
          }),
      ],
    }),
  });
};
export default RowMenu;
