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

import { ForwardRefExoticComponent } from 'react';

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
      minHeight={0}
      minWidth={0}
      width={CARD_HEIGHT}
      height={CARD_HEIGHT}
    >
      <Box
        m={1}
        display='flex'
        flexGrow={1}
        alignItems='center'
        justifyContent='center'
        bgcolor='#E4DFFF'
        borderRadius={2}
        overflow='hidden'
      >
        {thumbnail ? (
          <Thumbnail url={thumbnail} alt={alt} />
        ) : (
          <ItemIcon type='folder' alt={alt} />
        )}
      </Box>
    </Box>
  );
};

type Props = {
  LinkComponent?: ForwardRefExoticComponent<{ href: string }>; // React.ElementType<{ href: string }, 'a'>; //(props: { children: JSX.Element; to: string }) => JSX.Element;
  name: string;
  description: string;
  thumbnail?: string;
  href: string;
};
const FolderCard = ({
  name,
  description,
  thumbnail,
  LinkComponent,
  href,
}: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <Card sx={{ width: 'max-content', height: CARD_HEIGHT }}>
      <CardActionArea
        component={LinkComponent}
        href={href}
        sx={{ height: '100%' }}
      >
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
