import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
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
            <ListItem
              key={flag.id}
              id={`flagListItem-${flag.id}`}
              button
              selected={selectedFlag.id === flag.id}
              onClick={handleSelect(flag)}
            >
              <ListItemText primary={flag.name} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
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
