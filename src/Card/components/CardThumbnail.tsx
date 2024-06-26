import Thumbnail from '@/Thumbnail';
import ItemIcon, { ItemIconProps } from '@/icons/ItemIcon';
import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@/theme';

import { Box, useTheme } from '@mui/material';

import { ItemType } from '@graasp/sdk';

import { CARD_HEIGHT } from '../constants';

type CardThumbnailProps = {
  itemType?: ItemIconProps['type'];
  thumbnail?: string;
  alt: string;
};
const CardThumbnail = ({
  thumbnail,
  alt,
  itemType = ItemType.FOLDER,
}: CardThumbnailProps): JSX.Element => {
  const theme = useTheme();
  if (thumbnail) {
    return (
      <Thumbnail
        maxWidth={CARD_HEIGHT}
        maxHeight={CARD_HEIGHT}
        url={thumbnail}
        alt={alt}
      />
    );
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor={DEFAULT_LIGHT_PRIMARY_COLOR.main}
      width={CARD_HEIGHT}
      height='100%'
      flexShrink={0}
      minHeight={CARD_HEIGHT}
      minWidth={0}
    >
      <ItemIcon type={itemType} alt={alt} color={theme.palette.primary.main} />
    </Box>
  );
};
export default CardThumbnail;
