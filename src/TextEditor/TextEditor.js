import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import SaveButton from '../SaveButton';
import { TEXT_EDITOR_MIN_HEIGHT, TEXT_EDITOR_TOOLBAR } from '../constants';

// formula dependencies
import katex from 'katex';
import 'katex/dist/katex.min.css';

window.katex = katex;

const TextEditor = ({
  id,
  value: initialValue,
  edit,
  placeholderText,
  onChange,
  saveButtonId,
  saveButtonText,
  onSave,
  showSaveButton = true,
}) => {
  // keep current content
  const [content, setContent] = useState(initialValue);
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

  const onTextChange = (v) => {
    // keep track of the current content
    setContent(v);
    // eslint-disable-next-line no-unused-expressions
    onChange?.(v);
  };

  const classes = useStyles();

  const placeholder = edit ? placeholderText : null;

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

TextEditor.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  edit: PropTypes.bool,
  placeholderText: PropTypes.string,
};

TextEditor.defaultProps = {
  id: null,
  value: '',
  edit: false,
  placeholderText: 'Write something...',
};

export default TextEditor;
