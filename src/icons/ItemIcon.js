import {
  AppWindowIcon,
  CableIcon,
  ClapperboardIcon,
  FileIcon,
  FileTextIcon,
  FileUpIcon,
  FolderArchiveIcon,
  FolderIcon,
  ImageIcon,
  LinkIcon,
  Music2Icon,
  TextIcon,
} from 'lucide-react';

import { jsx as _jsx } from 'react/jsx-runtime';

import { ItemType, MimeTypes, getMimetype } from '@graasp/sdk';

import { StyledImage } from '../StyledComponents/StyledBaseComponents.js';
import EtherpadIcon from './EtherpadIcon.js';
import H5PIcon from './H5PIcon.js';

const MAX_ICON_SIZE = '25px';
const ItemIcon = ({
  color,
  extra,
  mimetype: defaultMimetype,
  iconSrc,
  alt = '',
  size = MAX_ICON_SIZE,
  type,
}) => {
  const mimetype = extra ? getMimetype(extra) : defaultMimetype;
  if (iconSrc) {
    return _jsx(StyledImage, {
      sx: {
        // icons should be squared
        maxHeight: size,
        maxWidth: size,
        height: size,
        width: size,
        objectFit: 'cover',
        borderRadius: 1,
      },
      alt: alt,
      src: iconSrc,
    });
  }
  let Icon = FileIcon;
  switch (type) {
    case ItemType.FOLDER:
      Icon = FolderIcon;
      break;
    case ItemType.SHORTCUT:
      Icon = CableIcon;
      break;
    case ItemType.DOCUMENT: {
      Icon = TextIcon;
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
          Icon = ClapperboardIcon;
          break;
        }
        if (MimeTypes.isAudio(mimetype)) {
          Icon = Music2Icon;
          break;
        }
        if (MimeTypes.isPdf(mimetype)) {
          Icon = FileTextIcon;
          break;
        }
        if (MimeTypes.isZip(mimetype)) {
          Icon = FolderArchiveIcon;
          break;
        }
      }
      Icon = FileIcon;
      break;
    }
    case ItemType.LINK: {
      Icon = LinkIcon;
      break;
    }
    case ItemType.APP: {
      Icon = AppWindowIcon;
      break;
    }
    case ItemType.H5P: {
      Icon = H5PIcon;
      break;
    }
    case ItemType.ETHERPAD: {
      Icon = EtherpadIcon;
      break;
    }
    case 'upload': {
      Icon = FileUpIcon;
      break;
    }
    default:
      break;
  }
  return _jsx(Icon, { color: color, size: size });
};
export default ItemIcon;
