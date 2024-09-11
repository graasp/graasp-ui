import { DownloadIcon, FileIcon } from 'lucide-react';

import { Button, Stack, Typography, styled } from '@mui/material';

const StyledLink = styled('a')({
  textDecoration: 'none',
});

type DownloadButtonFileItemProps = {
  id?: string;
  name: string;
  caption: string;
  url: string;
  onClick?: () => void;
};

const DownloadButtonFileItem = ({
  id,
  name = 'File',
  caption,
  url,
  onClick,
}: DownloadButtonFileItemProps): JSX.Element => {
  return (
    <StyledLink
      id={id}
      href={url}
      target='_blank'
      rel='noreferrer'
      download={name}
    >
      <Button
        size='large'
        variant='contained'
        startIcon={<FileIcon />}
        onClick={onClick}
        sx={{ textTransform: 'none' }}
      >
        <Stack direction='row' gap={4} alignItems='center'>
          <Stack direction='column' alignItems='flex-start'>
            <Typography>{name}</Typography>
            <Typography variant='caption'>{caption}</Typography>
          </Stack>
          <DownloadIcon />
        </Stack>
      </Button>
    </StyledLink>
  );
};

export default DownloadButtonFileItem;
