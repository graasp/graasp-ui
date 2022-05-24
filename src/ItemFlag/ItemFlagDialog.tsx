import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '../Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import { ListItemButton, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { FLAG_LIST_MAX_HEIGHT } from '../constants';
import { Flag } from '../types';

const useStyles = makeStyles(() => ({
  list: {
    width: '100%',
    overflow: 'auto',
    maxHeight: FLAG_LIST_MAX_HEIGHT,
  },
  listTitle: {
    fontSize: 'small',
  },
  flagItemButton: {
    color: 'red',
  },
}));

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
  const classes = useStyles();

  const onClose = (): void => {
    setOpen(false);
  };

  const handleSelect = (flag: Flag) => () => setSelectedFlag(flag);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{t('Flag Item')}</DialogTitle>
      <DialogContent>
        <Typography variant='h6' className={classes.listTitle}>
          {`${t('Select reason for flagging this item')}:`}
        </Typography>
        <List component='nav' className={classes.list}>
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
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='text'>
          {t('Cancel')}
        </Button>
        <Button
          onClick={onFlag}
          className={classes.flagItemButton}
          id='flagItemButton'
          disabled={!selectedFlag}
        >
          {t('Flag')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemFlagDialog;
