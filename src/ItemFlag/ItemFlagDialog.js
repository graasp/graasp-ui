import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';

import { useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import Button from '../buttons/Button/Button.js';
import { FLAG_LIST_MAX_HEIGHT } from '../constants.js';

const ListTitle = styled(Typography)({
  fontSize: 'small',
});
const StyledList = styled(List)({
  width: '100%',
  overflow: 'auto',
  maxHeight: FLAG_LIST_MAX_HEIGHT,
});
export const ItemFlagDialog = ({
  flags,
  onFlag,
  open,
  onClose,
  descriptionText = 'Select reason for flagging this item',
  title = 'Flag Item',
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Flag',
  formatFlag,
}) => {
  const [selectedFlag, setSelectedFlag] = useState();
  const handleSelect = (flag) => () => setSelectedFlag(flag);
  const flagToString = (flag) => {
    if (formatFlag) {
      return formatFlag(flag);
    }
    return flag;
  };
  return _jsxs(Dialog, {
    open: open,
    onClose: onClose,
    maxWidth: 'sm',
    fullWidth: true,
    children: [
      _jsx(DialogTitle, { children: title }),
      _jsxs(DialogContent, {
        children: [
          _jsx(ListTitle, { variant: 'h6', children: descriptionText }),
          _jsx(StyledList, {
            children: flags?.map((flag) =>
              _jsx(
                ListItemButton,
                {
                  id: `flagListItem-${flag}`,
                  selected: selectedFlag === flag,
                  onClick: handleSelect(flag),
                  children: _jsx(ListItemText, { primary: flagToString(flag) }),
                },
                flag,
              ),
            ),
          }),
        ],
      }),
      _jsxs(DialogActions, {
        children: [
          _jsx(Button, {
            onClick: onClose,
            variant: 'text',
            children: cancelButtonText,
          }),
          _jsx(Button, {
            color: 'error',
            onClick: () => onFlag(selectedFlag),
            disabled: !selectedFlag,
            children: confirmButtonText,
          }),
        ],
      }),
    ],
  });
};
export default ItemFlagDialog;
