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

import { Link, LinkProps } from 'react-router-dom';

const CARD_HEIGHT = '76px';

type CardThumbnailProps = {
  thumbnail?: string;
  alt: string;
};
const CardThumbnail = ({ thumbnail, alt }: CardThumbnailProps): JSX.Element => {
  if (thumbnail) {
    return <Thumbnail url={thumbnail} alt={alt} maxHeight='100%' />;
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      bgcolor='#E4DFFF'
      width={CARD_HEIGHT}
      height='100%'
      flexShrink={0}
      minHeight={CARD_HEIGHT}
      // minHeight={0}
      minWidth={0}
    >
      <ItemIcon type='folder' alt={alt} />
    </Box>
  );
};

type Props = {
  id?: string;
  name: string;
  description?: string | null | JSX.Element;
  thumbnail?: string;
  /**
   * React Router Link target
   */
  to: LinkProps['to'];
};
const FolderCard = ({
  id,
  name,
  description,
  thumbnail,
  to,
}: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <Card
      id={id}
      sx={{
        // card should not be longer than the content
        width: 'max-content',
        // but should not overflow the parent
        maxWidth: '100%',
        // set the height of the card to be fixed
        height: CARD_HEIGHT,
      }}
    >
      <CardActionArea component={Link} to={to} sx={{ height: '100%' }}>
        <Stack direction='row' alignItems='center' height='100%' minWidth={0}>
          <CardThumbnail thumbnail={thumbnail} alt={name} />
          <CardHeader
            sx={{
              // needed to make container not overflow parent
              minWidth: '0px',
              '& .MuiCardHeader-content': {
                // needed to make container not overflow parent
                minWidth: '0px',
              },
            }}
            title={name}
            subheader={description}
            titleTypographyProps={{
              color: 'primary',
              minWidth: '0px',
              // needed to force long title into ellipsis
              noWrap: true,
              width: '100%',
            }}
            subheaderTypographyProps={{
              overflow: 'hidden',
              height: description ? '1lh' : 'unset',
              textOverflow: 'ellipsis',
              minWidth: 0,
              '& p': {
                margin: 0,
                marginBlocStart: 0,
              },
            }}
          />
          <ChevronRight
            size={35}
            color={theme.palette.primary.main}
            style={{ flexShrink: 0, margin: theme.spacing(2, 2, 2, 0) }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
};
export default FolderCard;
