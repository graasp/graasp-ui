import React, { useState, FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SaveButton from '../SaveButton';
import { TEXT_EDITOR_MIN_HEIGHT, TEXT_EDITOR_TOOLBAR } from '../constants';

// formula dependencies
import katex from 'katex';
import 'katex/dist/katex.min.css';

window.katex = katex;

interface TextEditorProps {
  onSave?: (text: string) => void;
  value: string;
  id?: string;
  placeholderText?: string;
  edit?: boolean;
  onChange?: (text: string) => void;
  saveButtonId?: string;
  saveButtonText?: string;
  showSaveButton?: boolean;
}

const TextEditor: FC<TextEditorProps> = ({
  id,
  onChange,
  saveButtonId,
  saveButtonText,
  onSave,
  value: initialValue = '',
  showSaveButton = true,
  edit = false,
  placeholderText = 'Write something...',
}) => {
  // keep current content
  const [content, setContent] = useState(initialValue ?? '');
  const useStyles = makeStyles(() => ({
    wrapper: {
      '& .ql-editor': {
        // adapt height if read only
        minHeight: !edit ? 0 : TEXT_EDITOR_MIN_HEIGHT,
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
          }}
        />
      </div>
      {showSaveButton && edit && (
        <SaveButton
          id={saveButtonId}
          onClick={() => {
            // eslint-disable-next-line no-unused-expressions
            onSave?.(content);
          }}
          text={saveButtonText}
          hasChanges={content !== initialValue}
        />
      )}
    </React.Fragment>
  );
};

export default TextEditor;
