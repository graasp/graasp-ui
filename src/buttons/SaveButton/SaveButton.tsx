import GraaspButton, { GraaspButtonProps } from '../Button/Button.js';

export type SaveButtonProps = {
  /**
   * whether changes have been detected
   */
  hasChanges: boolean;
  onClick: () => void;
  color?: GraaspButtonProps['color'];
  id?: string;
  /**
   * text when no changes have been detected
   */
  savedText?: string;
  /**
   * text when changes have been detected
   */
  text?: string;
  /**
   * button variant
   */
  variant?: GraaspButtonProps['variant'];
};

const SaveButton = ({
  color,
  hasChanges,
  id,
  onClick,
  savedText = 'Saved',
  text = 'Save',
  variant,
}: SaveButtonProps): JSX.Element => (
  <GraaspButton
    id={id}
    variant={variant}
    color={color}
    onClick={onClick}
    disabled={!hasChanges}
  >
    {hasChanges ? text : savedText}
  </GraaspButton>
);

export default SaveButton;
