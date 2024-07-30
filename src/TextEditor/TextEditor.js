// formula dependencies
import katex from 'katex';

import { Stack, styled } from '@mui/material';

import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import Button from '../buttons/Button/Button.js';
import SaveButton from '../buttons/SaveButton/SaveButton.js';

window.katex = katex;
const TEXT_EDITOR_TOOLBAR = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }], // default colors depending on theme
  [{ background: [] }], // default colors depending on theme
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, 'code-block', 'link', 'formula'],
];
const TEXT_EDITOR_MIN_HEIGHT = 200;
const TEXT_EDITOR_MAX_HEIGHT = 400;
const Div = styled('div')(({ theme }) => ({
  width: '100%',
  '.ql-tooltip': {
    zIndex: theme.zIndex.tooltip,
  },
  '& .ql-editor': {
    // adapt height if read only
    minHeight: TEXT_EDITOR_MIN_HEIGHT,
    // necessary styles to avoid window scrolling top on paste
    // set a max height only on edition
    maxHeight: TEXT_EDITOR_MAX_HEIGHT,
    overflow: 'auto',
    '& p': {
      paddingBottom: 3,
      paddingTop: 3,
    },
  },
  '& .ql-container': {
    // use font size from mui theme
    fontSize: 'unset',
  },
}));
const TextEditor = ({
  cancelButtonId,
  cancelButtonText = 'Cancel',
  id,
  onCancel,
  onChange,
  onSave,
  placeholderText = 'Write something…',
  saveButtonId,
  saveButtonText,
  savedButtonText,
  showActions = true,
  value: initialValue = '',
}) => {
  // keep current content
  const [content, setContent] = useState(initialValue ?? '');
  const onTextChange = (text) => {
    // keep track of the current content
    setContent(text);
    // eslint-disable-next-line no-unused-expressions
    onChange?.(text);
  };
  const onCancelClick = () => {
    // eslint-disable-next-line no-unused-expressions
    onCancel?.(content);
    setContent(initialValue);
  };
  useEffect(() => {
    // update the content with initialValue only when initialValue changes
    setContent(initialValue);
  }, [initialValue]);
  return _jsxs(Stack, {
    direction: 'column',
    spacing: 1,
    alignItems: 'flex-end',
    children: [
      _jsx(Div, {
        children: _jsx(ReactQuill, {
          id: id,
          placeholder: placeholderText,
          theme: 'snow',
          value: content,
          onChange: onTextChange,
          modules: {
            toolbar: TEXT_EDITOR_TOOLBAR,
            clipboard: {
              matchVisual: false,
            },
          },
        }),
      }),
      showActions &&
        _jsxs(Stack, {
          spacing: 1,
          direction: 'row',
          children: [
            _jsx(Button, {
              variant: 'text',
              id: cancelButtonId,
              onClick: onCancelClick,
              children: cancelButtonText,
            }),
            _jsx(SaveButton, {
              id: saveButtonId,
              onClick: () => {
                // eslint-disable-next-line no-unused-expressions
                onSave?.(content);
              },
              text: saveButtonText,
              savedText: savedButtonText,
              hasChanges: content !== initialValue,
            }),
          ],
        }),
    ],
  });
};
export default TextEditor;
