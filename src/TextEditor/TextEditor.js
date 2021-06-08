import React from 'react';
import { makeStyles } from '@material-ui/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import PropTypes from 'prop-types';
import { TEXT_EDITOR_MIN_HEIGHT, TEXT_EDITOR_TOOLBAR } from '../constants';

// formula dependencies
import katex from 'katex';
import 'katex/dist/katex.min.css';

window.katex = katex;

const useStyles = makeStyles(() => ({
  wrapper: {
    '& .ql-editor': {
      minHeight: TEXT_EDITOR_MIN_HEIGHT,
    },
  },
}));

const TextEditor = ({ id, onChange, value, readOnly, placeholderText }) => {
  const classes = useStyles();

  const placeholder = !readOnly && placeholderText ? 'Write something' : null;

  return (
    <div className={classes.wrapper}>
      <ReactQuill
        id={id}
        placeholder={placeholder}
        readOnly={readOnly}
        theme='snow'
        value={value}
        onChange={onChange}
        modules={{
          toolbar: readOnly ? null : TEXT_EDITOR_TOOLBAR,
        }}
      />
    </div>
  );
};

TextEditor.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  placeholderText: PropTypes.string,
};

TextEditor.defaultProps = {
  id: null,
  value: '',
  onChange: () => null,
  readOnly: false,
  placeholderText: null,
};

export default TextEditor;
