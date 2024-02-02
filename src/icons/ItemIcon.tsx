import { UploadFile } from '@mui/icons-material';
import AppsIcon from '@mui/icons-material/Apps';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ImageIcon from '@mui/icons-material/Image';
import ShortcutIcon from '@mui/icons-material/Input';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LinkIcon from '@mui/icons-material/Link';
import Looks5Icon from '@mui/icons-material/Looks5';
import MovieIcon from '@mui/icons-material/Movie';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { SvgIconTypeMap, SxProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { FC } from 'react';

import {
  ItemType,
  LocalFileItemExtra,
  MimeTypes,
  S3FileItemExtra,
  UnionOfConst,
  getMimetype,
} from '@graasp/sdk';

import { StyledImage } from '../StyledComponents/StyledBaseComponents';
import EtherpadIcon from './EtherpadIcon';

const ITEM_ICON_MAX_SIZE = 25;

export interface ItemIconProps {
  alt: string;
  /**
   * item type
   */
  type: UnionOfConst<typeof ItemType> | 'upload';
  /**
   * An HTML Color to usa for the foreground of the icon
   */
  color?: string;
  /**
   * @deprecated Use the `mimetype` prop.
   * To extract the mimetype from the item extra use the `getMimeType` function exported from @graasp/sdk
   * Item extra used to define the mimetype
   */
  extra?: LocalFileItemExtra | S3FileItemExtra;
  mimetype?: string;
  iconSrc?: string;
  sx?: SxProps;
}

const ItemIcon: FC<ItemIconProps> = ({
  color,
  extra,
  mimetype: defaultMimetype,
  iconSrc,
  alt = '',
  sx,
  type,
}) => {
  const mimetype = extra ? getMimetype(extra) : defaultMimetype;

  if (iconSrc) {
    return (
      <StyledImage
        sx={{
          // icons should be squared
          maxHeight: ITEM_ICON_MAX_SIZE,
          maxWidth: ITEM_ICON_MAX_SIZE,
          ...sx,
        }}
        alt={alt}
        src={iconSrc}
      />
    );
  }

  let Icon: OverridableComponent<SvgIconTypeMap> = InsertDriveFileIcon;
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
        if (MimeTypes.isImage(mimetype)) {
          Icon = ImageIcon;
          break;
        }
        if (MimeTypes.isVideo(mimetype)) {
          Icon = MovieIcon;
          break;
        }
        if (MimeTypes.isAudio(mimetype)) {
          Icon = MusicNoteIcon;
          break;
        }
        if (MimeTypes.isPdf(mimetype)) {
          Icon = PictureAsPdfIcon;
          break;
        }
        if (MimeTypes.isZip(mimetype)) {
          Icon = FolderZipIcon;
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
    case ItemType.ETHERPAD: {
      Icon = EtherpadIcon;
      break;
    }
    case 'upload': {
      Icon = UploadFile;
      break;
    }
    default:
      break;
  }

  return <Icon sx={sx} style={{ color }} />;
};

export default ItemIcon;
