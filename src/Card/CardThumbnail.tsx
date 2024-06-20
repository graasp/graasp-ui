import { Box, useTheme } from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import { ItemIcon, Thumbnail } from '..';

export type CardThumbnailProps = {
  thumbnail?: string;
  alt: string;
  width?: number;
  minHeight: number;
  type?: DiscriminatedItem['type'];
};
const CardThumbnail = ({
  thumbnail,
  alt,
  width,
  minHeight,
  type = ItemType.FOLDER,
}: CardThumbnailProps): JSX.Element => {
  const theme = useTheme();

  if (thumbnail) {
    return (
      <Thumbnail url={thumbnail} alt={alt} maxHeight='100%' maxWidth={width} />
    );
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor={theme.palette.background.default}
      width={width}
      height='100%'
      flexShrink={0}
      minHeight={minHeight}
      minWidth={0}
    >
      <ItemIcon type={type} alt={alt} />
    </Box>
  );
};

export default CardThumbnail;
