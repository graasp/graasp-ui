import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
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
  onBlur,
  onChange,
}) => {
  // keep current content
  const [value, setValue] = useState(initialValue);

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
    if (edit) {
      setValue(v);
    }
    // eslint-disable-next-line no-unused-expressions
    onChange?.(v);
  };

  const classes = useStyles();

  const placeholder = edit && placeholderText ? 'Write something' : null;

  return (
    <div
      className={classes.wrapper}
      onBlur={() => {
        // eslint-disable-next-line no-unused-expressions
        onBlur?.(value);
      }}
    >
      <ReactQuill
        id={id}
        placeholder={placeholder}
        readOnly={!edit}
        theme='snow'
        value={value}
        onChange={onTextChange}
        modules={{
          toolbar: edit ? TEXT_EDITOR_TOOLBAR : null,
        }}
      />
    </div>
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
  placeholderText: null,
};

export default TextEditor;
