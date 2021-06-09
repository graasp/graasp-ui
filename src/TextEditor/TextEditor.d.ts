interface TextEditorProps {
  id: string;
  onChange: () => void;
  value: string | null;
  readOnly?: boolean;
  placeholderText?: string;
}

declare const TextEditor: React.FC<TextEditorProps>;
