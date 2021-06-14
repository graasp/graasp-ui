interface TextEditorProps {
  onSave: (string) => void;
  value: string | null;
  id?: string;
  placeholderText?: string;
  edit?: boolean;
}

declare const TextEditor: React.FC<TextEditorProps>;
