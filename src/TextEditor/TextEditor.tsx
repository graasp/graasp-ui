// import 'katex/dist/katex.min.css';
import { styled } from '@mui/material';

import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

// import 'react-quill/dist/quill.snow.css';
import Button from '../buttons/Button';
import SaveButton from '../buttons/SaveButton';

const TEXT_EDITOR_TOOLBAR = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }], // default colors depending on theme
  [{ background: [] }], // default colors depending on theme
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, 'code-block', 'link'],
];

const TEXT_EDITOR_MIN_HEIGHT = 200;
const TEXT_EDITOR_MAX_HEIGHT = 400;

export type TextEditorProps = {
  cancelButtonId?: string;
  cancelButtonText?: string;
  edit?: boolean;
  id?: string;
  maxHeight?: string | number;
  onCancel?: (text: string) => void;
  onChange?: (text: string) => void;
  onSave?: (text: string) => void;
  placeholderText?: string;
  saveButtonId?: string;
  saveButtonText?: string;
  savedButtonText?: string;
  showActions?: boolean;
  styles?: React.CSSProperties;
  value?: string;
};

const Div = styled('div')<{
  edit?: boolean;
  maxHeight?: number | string;
  styles?: React.CSSProperties;
}>(({ theme, edit, maxHeight, styles }) => ({
  '.ql-tooltip': {
    zIndex: theme.zIndex.tooltip,
  },
  '& .ql-editor': {
    // adapt height if read only
    minHeight: !edit ? 0 : TEXT_EDITOR_MIN_HEIGHT,
    // necessary styles to avoid window scrolling top on paste
    // set a max height only on edition
    maxHeight: edit ? maxHeight ?? TEXT_EDITOR_MAX_HEIGHT : '100%',
    overflow: 'auto',

    '& p': {
      paddingBottom: 3,
      paddingTop: 3,
    },

    ...styles,
  },
  '& .ql-container': {
    border: !edit ? 'none !important' : undefined,
    // use font size from mui theme
    fontSize: 'unset',
  },
}));

const TextEditor = ({
  cancelButtonId,
  cancelButtonText = 'Cancel',
  edit = false,
  id,
  maxHeight,
  onCancel,
  onChange,
  onSave,
  placeholderText = 'Write something…',
  saveButtonId,
  saveButtonText,
  savedButtonText,
  showActions = true,
  styles,
  value: initialValue = '',
}: TextEditorProps): JSX.Element | null => {
  // keep current content
  const [content, setContent] = useState(initialValue ?? '');

  const onTextChange = (text: string): void => {
    // keep track of the current content
    setContent(text);
    // eslint-disable-next-line no-unused-expressions
    onChange?.(text);
  };

  const onCancelClick = (): void => {
    // eslint-disable-next-line no-unused-expressions
    onCancel?.(content);
    setContent(initialValue);
  };

  useEffect(() => {
    // update the content with initialValue only when initialValue changes
    setContent(initialValue);
  }, [initialValue]);

  // empty text
  if (!content && !edit) {
    return null;
  }

  return (
    <React.Fragment>
      <Div edit={edit} maxHeight={maxHeight} styles={styles}>
        <ReactQuill
          id={id}
          placeholder={edit ? placeholderText : ''}
          readOnly={!edit}
          theme='snow'
          value={content}
          onChange={onTextChange}
          modules={{
            toolbar: edit ? TEXT_EDITOR_TOOLBAR : null,
            clipboard: {
              matchVisual: false,
            },
          }}
        />
      </Div>
      {showActions && edit && (
        <>
          <Button
            variant='text'
            sx={{ m: 1 }}
            id={cancelButtonId}
            onClick={onCancelClick}
          >
            {cancelButtonText}
          </Button>
          <SaveButton
            sx={{ m: 1 }}
            id={saveButtonId}
            onClick={() => {
              // eslint-disable-next-line no-unused-expressions
              onSave?.(content);
            }}
            text={saveButtonText}
            savedText={savedButtonText}
            hasChanges={content !== initialValue}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default TextEditor;
