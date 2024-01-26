import { SxProps } from '@mui/material/styles';

import { FC, MouseEventHandler } from 'react';

import GraaspButton, { GraaspButtonProps } from '../Button/Button';

export interface SaveButtonProps {
  /**
   * whether changes have been detected
   */
  hasChanges: boolean;
  onClick: MouseEventHandler;
  color?: GraaspButtonProps['color'];
  id?: string;
  /**
   * text when no changes have been detected
   */
  savedText?: string;
  sx?: SxProps;
  /**
   * text when changes have been detected
   */
  text?: string;
  /**
   * button variant
   */
  variant?: GraaspButtonProps['variant'];
}

const SaveButton: FC<SaveButtonProps> = ({
  color,
  hasChanges,
  id,
  onClick,
  savedText = 'Saved',
  sx,
  text = 'Save',
  variant,
}) => {
  return (
    <GraaspButton
      id={id}
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={!hasChanges}
      sx={sx}
    >
      {hasChanges ? text : savedText}
    </GraaspButton>
  );
};

export default SaveButton;
