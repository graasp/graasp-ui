import React, { FC } from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';
import Button from '../Button';
import { styled } from '@mui/material';

const StyledLink = styled('a')({
  textDecoration: 'none',
});

interface DownloadButtonFileItemProps {
  name?: string;
  url: string;
  id?: string;
  text?: string;
}

const DownloadButtonFileItem: FC<DownloadButtonFileItemProps> = ({
  id,
  name = 'File',
  url,
  text,
}) => {
  const buttonText = text || `Download ${name}`;

  return (
    <StyledLink
      id={id}
      href={url}
      target='_blank'
      rel='noreferrer'
      download={name}
    >
      <Button size='large' startIcon={<GetAppIcon />}>
        {buttonText}
      </Button>
    </StyledLink>
  );
};

export default DownloadButtonFileItem;
