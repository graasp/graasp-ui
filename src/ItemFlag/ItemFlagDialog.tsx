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

import { FlagType } from '@graasp/sdk';

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

export interface ItemFlagDialogProps {
  flags: FlagType[];
  onFlag: (flag?: FlagType) => void;
  open: boolean;
  onClose: () => void;
  descriptionText?: string;
  title?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  formatFlag?: (flag: string) => string;
}

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
}: ItemFlagDialogProps): JSX.Element => {
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
