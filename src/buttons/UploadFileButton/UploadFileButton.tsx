import { CloudUploadIcon } from 'lucide-react';

import { styled } from '@mui/material';

import { ChangeEventHandler } from 'react';

import GraaspButton, { GraaspButtonProps } from '../Button/Button';

export interface UploadFileButtonProps {
  /**
   * whether is loading
   */
  isLoading?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  color?: GraaspButtonProps['color'];
  id?: string;
  /**
   * text when loading
   */
  loadingText?: string;
  /**
   * text when changes have been detected
   */
  text?: string;
  /**
   * button variant
   */
  variant?: GraaspButtonProps['variant'];

  accept?: string;
  multiple?: boolean;
  size?: GraaspButtonProps['size'];
  icon?: JSX.Element | null;
}

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
  text = 'Upload a File',
  variant = 'contained',
  accept,
  multiple,
  icon = <CloudUploadIcon />,
  size,
}: UploadFileButtonProps): JSX.Element => (
  <GraaspButton
    id={id}
    component='label'
    variant={variant}
    startIcon={icon}
    disabled={isLoading}
    size={size}
  >
    {isLoading ? loadingText : text}
    <VisuallyHiddenInput
      multiple={multiple}
      onChange={onChange}
      type='file'
      accept={accept}
    />
  </GraaspButton>
);

export default UploadFileButton;
