interface SaveButtonProps {
  onClick: (e: any) => void;
  hasChanges: boolean;
  id?: string;
  text?: string;
  cancelText?: string;
}

declare const SaveButton: React.FC<SaveButtonProps>;
