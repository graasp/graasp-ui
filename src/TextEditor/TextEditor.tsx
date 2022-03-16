import React, { useState, useEffect, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from '../SaveButton';
import {
  TEXT_EDITOR_MAX_HEIGHT,
  TEXT_EDITOR_MIN_HEIGHT,
  TEXT_EDITOR_TOOLBAR,
} from '../constants';
import Button from '../Button';

// formula dependencies
import katex from 'katex';
import 'katex/dist/katex.min.css';

window.katex = katex;

interface TextEditorProps {
  onSave?: (text: string) => void;
  value?: string;
  id?: string;
  placeholderText?: string;
  edit?: boolean;
  onChange?: (text: string) => void;
  onCancel?: (text: string) => void;
  savedButtonText?: string;
  saveButtonText?: string;
  saveButtonId?: string;
  cancelButtonText?: string;
  cancelButtonId?: string;
  showActions?: boolean;
  maxHeight?: string | number;
}

const TextEditor: FC<TextEditorProps> = ({
  id,
  onChange,
  saveButtonId,
  saveButtonText,
  savedButtonText,
  cancelButtonId,
  cancelButtonText = 'Cancel',
  onSave,
  onCancel,
  value: initialValue = '',
  showActions = true,
  edit = false,
  placeholderText = 'Write something...',
  maxHeight,
}) => {
  // keep current content
  const [content, setContent] = useState(initialValue ?? '');
  const useStyles = makeStyles(() => ({
    wrapper: {
      '& .ql-editor': {
        // adapt height if read only
        minHeight: !edit ? 0 : TEXT_EDITOR_MIN_HEIGHT,
        // necessary styles to avoid window scrolling top on paste
        // set a max height only on edition
        maxHeight: edit ? maxHeight ?? TEXT_EDITOR_MAX_HEIGHT : '100%',
        overflow: 'auto',
      },
      '& .ql-container': {
        border: !edit ? 'none' : undefined,
      },
    },
  }));

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

  const classes = useStyles();

  const placeholder = edit ? placeholderText : '';

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <ReactQuill
          id={id}
          placeholder={placeholder}
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
      </div>
      {showActions && edit && (
        <>
          <Button id={cancelButtonId} onClick={onCancelClick}>
            {cancelButtonText}
          </Button>
          <SaveButton
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
