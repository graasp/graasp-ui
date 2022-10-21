import { List } from 'immutable';

import { ListItemButton, ListItemText, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { default as MuiList } from '@mui/material/List';
import Typography from '@mui/material/Typography';

import React, { FC, MouseEventHandler, useState } from 'react';

import Button from '../buttons/Button';
import { FLAG_LIST_MAX_HEIGHT } from '../constants';
import { FlagRecord } from '../types';

const ListTitle = styled(Typography)({
  fontSize: 'small',
});
const StyledList = styled(MuiList)({
  width: '100%',
  overflow: 'auto',
  maxHeight: FLAG_LIST_MAX_HEIGHT,
});

export interface ItemFlagDialogProps {
  flags: List<FlagRecord>;
  onFlag: MouseEventHandler;
  open: boolean;
  onClose: () => void;
  descriptionText?: string;
  title?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
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
}) => {
  const [selectedFlag, setSelectedFlag] = useState<FlagRecord>();

  const handleSelect = (flag: FlagRecord) => () => setSelectedFlag(flag);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <ListTitle variant='h6'>{descriptionText}</ListTitle>
        <StyledList>
          {flags?.map((flag: FlagRecord) => (
            <ListItemButton
              key={flag.id}
              id={`flagListItem-${flag.id}`}
              selected={selectedFlag?.id === flag.id}
              onClick={handleSelect(flag)}
            >
              <ListItemText primary={flag.name} />
            </ListItemButton>
          ))}
        </StyledList>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='text'>
          {cancelButtonText}
        </Button>
        <Button color='error' onClick={onFlag} disabled={!selectedFlag}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemFlagDialog;
