interface TextEditorProps {
  onChange: () => void;
  value: string | null;
  id?: string;
  readOnly?: boolean;
  placeholderText?: string;
}

declare const TextEditor: React.FC<TextEditorProps>;
