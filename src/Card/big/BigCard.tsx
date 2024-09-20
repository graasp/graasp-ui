import { Box, Card as MuiCard, Stack, Typography } from '@mui/material';

import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import { DiscriminatedItem, UUID } from '@graasp/sdk';

import Avatar from '@/Avatar/Avatar.js';
import { useMobileView } from '@/hooks/useMobileView.js';

import { CollapsibleText } from '../../CollapsibleText/CollapsibleText.js';
import CardThumbnail from '../CardThumbnail.js';
import { LikeCounterButton } from './LikeCounterButton.js';
import { TagCarousel } from './TagCarousel.js';

type CardProps = {
  name: string;
  id?: string;
  likeCount?: number;
  tags?: string[];
  type: DiscriminatedItem['type'];
  image?: string;
  height?: number;
  description?: string;
  numberOfLinesToShow?: number;
  isLiked?: boolean;
  link?: string;
  creator?: { name: string; id: UUID; avatar?: string; link?: string };
};

const LinkWrapper = ({
  to,
  style,
  children,
}: {
  children: JSX.Element;
  to?: string;
  style?: CSSProperties;
}): JSX.Element => {
  if (to) {
    return (
      <Link to={to} style={style}>
        {children}
      </Link>
    );
  }
  return children;
};

const BigCard = ({
  id,
  creator,
  name,
  image,
  link,
  description,
  tags,
  type,
  likeCount = 0,
  height = 300,
  isLiked = false,
  numberOfLinesToShow = 7,
}: CardProps): JSX.Element => {
  const { isMobile } = useMobileView();

  // merge name and description together
  // so we can count name and description in the same line count and show the full title
  const text = `<h2>${name}</h2>${description ?? ''}`;

  return (
    <MuiCard id={id}>
      <Stack height={height} direction='row' gap={2} alignItems='center' mr={1}>
        <Box style={{ height: '100%', minWidth: '30%' }}>
          <LinkWrapper to={link}>
            <Stack height='100%'>
              <CardThumbnail
                minHeight={height}
                thumbnail={image}
                alt={name}
                type={type}
              />
            </Stack>
          </LinkWrapper>
        </Box>
        <Stack
          gap={1}
          py={1}
          minWidth={0}
          justifyContent='space-between'
          height='100%'
        >
          <Stack gap={1}>
            <TagCarousel tags={tags} />

            <Box
              sx={{
                textDecoration: 'unset',
                color: 'unset',
                '&:hover': { cursor: 'pointer' },
              }}
            >
              <LinkWrapper
                to={link}
                style={{
                  textDecoration: 'unset',
                  color: 'unset',
                  cursor: 'pointer !important',
                }}
              >
                <CollapsibleText
                  collapsed
                  numberOfLinesToShow={numberOfLinesToShow}
                  content={text}
                  style={{ cursor: 'pointer' }}
                ></CollapsibleText>
              </LinkWrapper>
            </Box>
          </Stack>
          <Stack direction='row' justifyContent='space-between'>
            <LikeCounterButton likeCount={likeCount} isLiked={isLiked} />
            {creator && (
              <LinkWrapper
                to={creator.link}
                style={{
                  textDecoration: 'unset',
                  color: 'unset',
                }}
              >
                <Stack direction='row' alignItems='center' gap={1}>
                  {!isMobile && <Typography>{creator.name}</Typography>}
                  <Avatar
                    alt={creator.name}
                    maxHeight={40}
                    maxWidth={40}
                    url={creator.avatar}
                  />
                </Stack>
              </LinkWrapper>
            )}
          </Stack>
        </Stack>
      </Stack>
    </MuiCard>
  );
};
export default BigCard;
