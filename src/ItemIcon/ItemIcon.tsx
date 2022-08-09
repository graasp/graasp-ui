import React, { FC } from 'react';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/core/styles';
import FolderIcon from '@material-ui/icons/Folder';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import LinkIcon from '@material-ui/icons/Link';
import MovieIcon from '@material-ui/icons/Movie';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import ShortcutIcon from '@material-ui/icons/Input';
import AppsIcon from '@material-ui/icons/Apps';
import ArchiveIcon from '@material-ui/icons/Archive';
import { MIME_TYPES, ITEM_ICON_MAX_SIZE } from '../constants';
import { getFileExtra, getS3FileExtra } from '../utils/itemExtra';
import { ITEM_TYPES } from '../enums';
import { FileItemExtra, S3FileItemExtra, UnknownExtra } from '../types';

const useStyles = makeStyles({
  imageIcon: {
    // icons should be squared
    maxHeight: ITEM_ICON_MAX_SIZE,
    maxWidth: ITEM_ICON_MAX_SIZE,
  },
});

interface ItemIconProps {
  name?: string;
  // todo: check is valid type
  type: string;
  extra?: UnknownExtra;
  extraIcon?: string;
  color?: string;
  className?: string;
  iconClass?: string;
}

const ItemIcon: FC<ItemIconProps> = ({
  name = '',
  type,
  extra,
  extraIcon,
  iconClass,
  color,
}) => {
  const classes = useStyles();

  const mimetype =
    getFileExtra(extra as unknown as FileItemExtra)?.mimetype ||
    getS3FileExtra(extra as unknown as S3FileItemExtra)?.mimetype;

  if (extraIcon) {
    return <img className={classes.imageIcon} alt={name} src={extraIcon} />;
  }

  let Icon = InsertDriveFileIcon;
  switch (type) {
    case ITEM_TYPES.FOLDER:
      Icon = FolderIcon;
      break;
    case ITEM_TYPES.SHORTCUT:
      Icon = ShortcutIcon;
      break;
    case ITEM_TYPES.DOCUMENT: {
      Icon = DescriptionIcon;
      break;
    }
    case ITEM_TYPES.FILE:
    case ITEM_TYPES.S3_FILE: {
      if (mimetype) {
        if (MIME_TYPES.IMAGE.includes(mimetype)) {
          Icon = ImageIcon;
          break;
        }
        if (MIME_TYPES.VIDEO.includes(mimetype)) {
          Icon = MovieIcon;
          break;
        }
        if (MIME_TYPES.AUDIO.includes(mimetype)) {
          Icon = MusicNoteIcon;
          break;
        }
        if (MIME_TYPES.PDF.includes(mimetype)) {
          Icon = PictureAsPdfIcon;
          break;
        }
        if (MIME_TYPES.ZIP.includes(mimetype)) {
          Icon = ArchiveIcon;
          break;
        }
      }

      Icon = InsertDriveFileIcon;
      break;
    }
    case ITEM_TYPES.LINK: {
      Icon = LinkIcon;
      break;
    }
    case ITEM_TYPES.APP: {
      Icon = AppsIcon;
      break;
    }
    default:
      break;
  }

  return <Icon className={iconClass} style={{ color }} />;
};

export default ItemIcon;
