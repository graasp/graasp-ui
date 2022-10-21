import AppsIcon from '@mui/icons-material/Apps';
import ArchiveIcon from '@mui/icons-material/Archive';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import ShortcutIcon from '@mui/icons-material/Input';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import Looks5Icon from '@mui/icons-material/Looks5';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { SxProps } from '@mui/material';

import React, { FC } from 'react';

import { ItemType, UnknownExtra } from '@graasp/sdk';

import { StyledImage } from '../StyledComponents/StyledBaseComponents';
import { ITEM_ICON_MAX_SIZE, MIME_TYPES } from '../constants';
import { FileItemExtra, S3FileItemExtra } from '../types';
import { getFileExtra, getS3FileExtra } from '../utils/itemExtra';

export interface ItemIconProps {
  alt: string;
  /**
   * item type
   */
  type: ItemType;
  color?: string;
  /**
   * item extra
   */
  extra?: UnknownExtra;
  /**
   * @deprecated use sx
   * */
  iconClass?: string;
  iconSrc?: string;
  /**
   * @deprecated use alt
   */
  name?: string;
  sx?: SxProps;
}

const ItemIcon: FC<ItemIconProps> = ({
  color,
  extra,
  iconSrc,
  name,
  alt = '',
  sx,
  type,
}) => {
  const mimetype =
    getFileExtra(extra as unknown as FileItemExtra)?.mimetype ||
    getS3FileExtra(extra as unknown as S3FileItemExtra)?.mimetype;

  if (iconSrc) {
    return (
      <StyledImage
        sx={{
          // icons should be squared
          maxHeight: ITEM_ICON_MAX_SIZE,
          maxWidth: ITEM_ICON_MAX_SIZE,
        }}
        alt={name ?? alt}
        src={iconSrc}
      />
    );
  }

  let Icon = InsertDriveFileIcon;
  switch (type) {
    case ItemType.FOLDER:
      Icon = FolderIcon;
      break;
    case ItemType.SHORTCUT:
      Icon = ShortcutIcon;
      break;
    case ItemType.DOCUMENT: {
      Icon = DescriptionIcon;
      break;
    }
    case ItemType.LOCAL_FILE:
    case ItemType.S3_FILE: {
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
    case ItemType.LINK: {
      Icon = LinkIcon;
      break;
    }
    case ItemType.APP: {
      Icon = AppsIcon;
      break;
    }
    case ItemType.H5P: {
      Icon = Looks5Icon;
      break;
    }
    default:
      break;
  }

  return <Icon sx={sx} style={{ color }} />;
};

export default ItemIcon;
