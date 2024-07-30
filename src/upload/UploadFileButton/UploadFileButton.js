import { CloudUploadIcon } from 'lucide-react';

import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const UploadFileButton = ({
  id,
  isLoading = false,
  onChange,
  loadingText = 'Uploading...',
  text = 'Upload a file',
  variant = 'contained',
  accept,
  multiple,
  icon = _jsx(CloudUploadIcon, {}),
  size,
  color,
}) =>
  _jsxs(LoadingButton, {
    id: id,
    component: 'label',
    variant: variant,
    color: color,
    startIcon: icon,
    loading: isLoading,
    disabled: isLoading,
    size: size,
    children: [
      isLoading ? loadingText : text,
      _jsx(VisuallyHiddenInput, {
        multiple: multiple,
        onChange: onChange,
        type: 'file',
        accept: accept,
      }),
    ],
  });
export default UploadFileButton;
