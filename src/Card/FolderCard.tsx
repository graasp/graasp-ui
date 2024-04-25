import Thumbnail from '@/Thumbnail/Thumbnail';
import ItemIcon from '@/icons/ItemIcon';

import { Box, Card, CardHeader, Stack } from '@mui/material';

type CardThumbnailProps = {
  thumbnail?: string;
  alt: string;
};
const CardThumbnail = ({ thumbnail, alt }: CardThumbnailProps): JSX.Element => {
  if (thumbnail) {
    return <Thumbnail url={thumbnail} alt={alt} />;
  }
  return (
    <Box
      p={2}
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='#E4DFFF'
      borderRadius={2}
      // width="100%"
      // height="100%"
    >
      <ItemIcon type='folder' alt={alt} />
    </Box>
  );
};

type Props = {
  name: string;
  description: string;
  thumbnail: string;
};
const FolderCard = ({ name, description, thumbnail }: Props): JSX.Element => {
  return (
    <Card>
      <Stack direction='row' alignItems='flex-start'>
        <CardThumbnail thumbnail={thumbnail} alt={name} />
        <CardHeader title={name} subtitle={description} />
      </Stack>
    </Card>
  );
};
export default FolderCard;
