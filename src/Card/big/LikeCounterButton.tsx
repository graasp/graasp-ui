import { Heart } from 'lucide-react';

import { IconButton, Typography, useTheme } from '@mui/material';

export type LikeCounterButtonProps = {
  likeCount?: number;
  isLiked?: boolean;
  onClick?: (currentStatus: boolean) => void;
};

export const LikeCounterButton = ({
  likeCount = 0,
  isLiked = false,
  onClick,
}: LikeCounterButtonProps): JSX.Element => {
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
        onClick={() => onClick?.(isLiked)}
      >
        <Heart
          color={
            isLiked ? theme.palette.secondary.main : theme.palette.primary.main
          }
          fill={
            isLiked ? theme.palette.secondary.main : theme.palette.primary.main
          }
        />
        {likeCount ? (
          <Typography
            variant='body2'
            ml={1}
            color={isLiked ? 'secondary' : 'primary'}
          >
            {likeCount}
          </Typography>
        ) : null}
      </IconButton>
    </>
  );
};
