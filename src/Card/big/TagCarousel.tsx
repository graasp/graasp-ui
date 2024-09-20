import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Box, IconButton, Stack, Typography } from '@mui/material';

import { useRef } from 'react';

import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@/theme.js';

const Tag = ({ title }: { title: string }): JSX.Element => {
  return (
    <Box
      sx={{
        backgroundColor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
        whiteSpace: 'nowrap',
      }}
      px={2}
      py={1}
      borderRadius={1}
    >
      <Typography variant='body2' color='primary'>
        {title}
      </Typography>
    </Box>
  );
};

const SCROLL_OFFSET = 120;

export const TagCarousel = ({
  tags,
}: {
  tags?: string[];
}): JSX.Element | null => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollHorizontally = (scrollOffset = SCROLL_OFFSET): void => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  if (!tags?.length) {
    return null;
  }

  return (
    <Stack direction='row' maxWidth={'100%'} alignItems='center'>
      <Stack>
        <IconButton
          onClick={() => {
            scrollHorizontally(-SCROLL_OFFSET);
          }}
        >
          <ChevronLeft color={DEFAULT_LIGHT_PRIMARY_COLOR.dark} />
        </IconButton>
      </Stack>
      <Stack
        flexGrow={1}
        overflow={'hidden'}
        direction={'row'}
        gap={1}
        sx={{
          scrollBehavior: 'smooth',
        }}
        ref={ref}
      >
        {tags.map((t) => (
          <Tag key={t} title={t} />
        ))}
      </Stack>
      <Stack>
        <IconButton
          onClick={() => {
            scrollHorizontally(SCROLL_OFFSET);
          }}
        >
          <ChevronRight color={DEFAULT_LIGHT_PRIMARY_COLOR.dark} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
