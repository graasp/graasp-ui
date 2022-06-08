import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import { ListItemButton, ListItemText, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FLAG_LIST_MAX_HEIGHT } from '../constants';
import { Flag } from '../types';

const ListTitle = styled(Typography)({
  fontSize: 'small',
});
const FlagItemButton = styled(Button)({
  color: 'red',
});
const StyledList = styled(List)({
  width: '100%',
  overflow: 'auto',
  maxHeight: FLAG_LIST_MAX_HEIGHT,
});

export interface ItemFlagDialogProps {
  flags: Flag[];
  onFlag: MouseEventHandler;
  open: boolean;
  setOpen: Function;
  selectedFlag: Flag;
  setSelectedFlag: Function;
}

export const ItemFlagDialog: FC<ItemFlagDialogProps> = ({
  flags,
  onFlag,
  open,
  setOpen,
  selectedFlag,
  setSelectedFlag,
}) => {
  const { t } = useTranslation();

  const onClose = (): void => {
    setOpen(false);
  };

  const handleSelect = (flag: Flag) => () => setSelectedFlag(flag);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{t('Flag Item')}</DialogTitle>
      <DialogContent>
        <ListTitle variant='h6'>
          {`${t('Select reason for flagging this item')}:`}
        </ListTitle>
        <StyledList component='nav'>
          {flags?.map((flag: Flag) => (
            <ListItemButton
              key={flag.id}
              id={`flagListItem-${flag.id}`}
              selected={selectedFlag.id === flag.id}
              onClick={handleSelect(flag)}
            >
              <ListItemText primary={flag.name} />
            </ListItemButton>
          ))}
        </StyledList>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='text'>
          {t('Cancel')}
        </Button>
        <FlagItemButton
          onClick={onFlag}
          id='flagItemButton'
          disabled={!selectedFlag}
        >
          {t('Flag')}
        </FlagItemButton>
      </DialogActions>
    </Dialog>
  );
};

export default ItemFlagDialog;
