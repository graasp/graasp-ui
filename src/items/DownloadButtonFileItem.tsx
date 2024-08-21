import { DownloadIcon } from 'lucide-react';

import { styled } from '@mui/material';

import Button from '../buttons/Button/Button.js';

const StyledLink = styled('a')({
  textDecoration: 'none',
});

type DownloadButtonFileItemProps = {
  name?: string;
  url?: string;
  id?: string;
  text?: string;
  onClick?: () => void;
};

const DownloadButtonFileItem = ({
  id,
  name = 'File',
  url,
  text,
  onClick,
}: DownloadButtonFileItemProps): JSX.Element => {
  const buttonText = text || `Download ${name}`;

  return (
    <StyledLink
      id={id}
      href={url}
      target='_blank'
      rel='noreferrer'
      download={name}
    >
      <Button size='large' startIcon={<DownloadIcon />} onClick={onClick}>
        {buttonText}
      </Button>
    </StyledLink>
  );
};

export default DownloadButtonFileItem;
