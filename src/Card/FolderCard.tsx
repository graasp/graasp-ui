import Thumbnail from '@/Thumbnail/Thumbnail';
import ItemIcon from '@/icons/ItemIcon';
import { ChevronRight } from 'lucide-react';

import {
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Stack,
  useTheme,
} from '@mui/material';

import { Link } from 'react-router-dom';

const CARD_HEIGHT = '76px';

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
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='#E4DFFF'
      width={CARD_HEIGHT}
      height={CARD_HEIGHT}
      minHeight={0}
      minWidth={0}
    >
      <ItemIcon type='folder' alt={alt} />
    </Box>
  );
};

type Props = {
  name: string;
  description: string | JSX.Element;
  thumbnail?: string;
  /**
   * React Router Link target
   */
  to: string;
};
const FolderCard = ({
  name,
  description,
  thumbnail,
  to,
}: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Card sx={{ width: 'max-content', height: CARD_HEIGHT }}>
      <CardActionArea component={Link} to={to} sx={{ height: '100%' }}>
        <Stack direction='row' alignItems='center' height='100%' mr={2}>
          <CardThumbnail thumbnail={thumbnail} alt={name} />
          <CardHeader
            title={name}
            subheader={description}
            titleTypographyProps={{ color: 'primary' }}
          />
          <ChevronRight size={35} color={theme.palette.primary.main} />
        </Stack>
      </CardActionArea>
    </Card>
  );
};
export default FolderCard;
