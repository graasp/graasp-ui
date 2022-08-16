import React, { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '../Button';
import Dialog from '@material-ui/core/Dialog';
import { List as MuiList } from '@material-ui/core';
import { ListItem, ListItemText, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FLAG_LIST_MAX_HEIGHT } from '../constants';
import { FlagRecord } from '../types';
import { List } from 'immutable';

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
  flags: List<FlagRecord>;
  onFlag: MouseEventHandler;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedFlag: FlagRecord;
  setSelectedFlag: (flag: FlagRecord) => void;
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

  const handleSelect = (flag: FlagRecord) => () => setSelectedFlag(flag);

  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle>{t('Flag Item')}</DialogTitle>
      <DialogContent>
        <Typography variant='h6' className={classes.listTitle}>
          {`${t('Select reason for flagging this item')}:`}
        </Typography>
        <MuiList component='nav' className={classes.list}>
          {flags?.map((flag: FlagRecord) => (
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
        </MuiList>
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
