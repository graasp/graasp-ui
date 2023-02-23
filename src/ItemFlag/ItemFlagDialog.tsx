import { List } from 'immutable';

import { ListItemButton, ListItemText, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { default as MuiList } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import React, { FC, useState } from 'react';

import { FlagType } from '@graasp/sdk';

import Button from '../buttons/Button';
import { FLAG_LIST_MAX_HEIGHT } from '../constants';

const ListTitle = styled(Typography)({
  fontSize: 'small',
});
const StyledList = styled(MuiList)({
  width: '100%',
  overflow: 'auto',
  maxHeight: FLAG_LIST_MAX_HEIGHT,
});

export interface ItemFlagDialogProps {
  flags: List<FlagType>;
  onFlag: (flag?: FlagType) => void;
  open: boolean;
  onClose: () => void;
  descriptionText?: string;
  title?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  formatFlag?: (flag: string) => string;
}

export const ItemFlagDialog: FC<ItemFlagDialogProps> = ({
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
  const [selectedFlag, setSelectedFlag] = useState<FlagType>();

  const handleSelect = (flag: FlagType) => () => setSelectedFlag(flag);

  const flagToString = (flag: FlagType): string => {
    if (formatFlag) {
      return formatFlag(flag);
    }
    return flag;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <ListTitle variant='h6'>{descriptionText}</ListTitle>
        <StyledList>
          {flags?.map((flag) => (
            <ListItemButton
              key={flag}
              id={`flagListItem-${flag}`}
              selected={selectedFlag === flag}
              onClick={handleSelect(flag)}
            >
              <ListItemText primary={flagToString(flag)} />
            </ListItemButton>
          ))}
        </StyledList>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='text'>
          {cancelButtonText}
        </Button>
        <Button
          color='error'
          onClick={() => onFlag(selectedFlag)}
          disabled={!selectedFlag}
        >
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemFlagDialog;
