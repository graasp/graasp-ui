import { Heart } from 'lucide-react';

import { IconButton, Typography, useTheme } from '@mui/material';

type Props = { likeCount: number; isLiked: boolean };

export const LikeCounterButton = ({
  likeCount,
  isLiked,
}: Props): JSX.Element => {
  const theme = useTheme();
  return (
    <>
      <IconButton
        sx={{
          backgroundColor: isLiked ? theme.palette.primary.main : undefined,
          '&:hover': {
            backgroundColor: isLiked ? theme.palette.primary.light : undefined,
          },
        }}
      >
        <Heart
          color={
            isLiked ? theme.palette.secondary.main : theme.palette.primary.main
          }
          fill={
            isLiked ? theme.palette.secondary.main : theme.palette.primary.main
          }
        />
        {likeCount && (
          <Typography
            variant='body2'
            ml={1}
            color={isLiked ? 'secondary' : 'primary'}
          >
            {likeCount}
          </Typography>
        )}
      </IconButton>
    </>
  );
};
