import { DownloadIcon } from 'lucide-react';

import { styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import Button from '../buttons/Button/Button.js';

const StyledLink = styled('a')({
  textDecoration: 'none',
});
const DownloadButtonFileItem = ({ id, name = 'File', url, text, onClick }) => {
  const buttonText = text || `Download ${name}`;
  return _jsx(StyledLink, {
    id: id,
    href: url,
    target: '_blank',
    rel: 'noreferrer',
    download: name,
    children: _jsx(Button, {
      size: 'large',
      startIcon: _jsx(DownloadIcon, {}),
      onClick: onClick,
      children: buttonText,
    }),
  });
};
export default DownloadButtonFileItem;
