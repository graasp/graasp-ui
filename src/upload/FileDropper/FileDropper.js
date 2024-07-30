import { CloudUploadIcon } from 'lucide-react';

import {
  Alert,
  Box,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import UploadFileButton from '../UploadFileButton/UploadFileButton.js';

const FileDropperComponent = ({
  id,
  onDrop,
  onChange,
  error,
  hints,
  buttonText = 'Browse files',
  buttons,
  multiple,
  message = `Drag your files here to upload or`,
  releaseText = 'Release to drop',
  uploadProgress,
  isLoading = false,
}) => {
  const theme = useTheme();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (e) => {
      onDrop?.(e.files);
    },
    canDrop: () => {
      return !isLoading;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;
  let bgColor = '#eeeefa';
  if (isActive) {
    bgColor = '#dcdcf6';
  } else if (!canDrop && isOver) {
    bgColor = '#ffbaba';
  }
  return _jsxs(Stack, {
    role: 'dropzone',
    id: id,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    bgcolor: error ? '#ffbaba' : bgColor,
    borderRadius: 5,
    ref: drop,
    gap: 2,
    sx: {
      borderStyle: 'dashed',
      borderWidth: 3,
      borderColor: error ? 'red' : 'lightgrey',
    },
    py: 4,
    boxSizing: 'border-box',
    children: [
      _jsx(CloudUploadIcon, {
        size: 80,
        color: error ? 'red' : theme.palette.primary.main,
      }),
      isLoading
        ? _jsxs(Box, {
            width: '100%',
            px: 5,
            children: [
              _jsx(LinearProgress, {
                variant: uploadProgress ? 'determinate' : 'indeterminate',
                color: 'primary',
                value: uploadProgress,
              }),
              uploadProgress &&
                _jsxs(Typography, {
                  textAlign: 'center',
                  children: [uploadProgress, '%'],
                }),
            ],
          })
        : _jsxs(_Fragment, {
            children: [
              _jsx(Typography, {
                variant: 'label',
                color: error ? 'error' : 'primary',
                children: isActive ? releaseText : message,
              }),
              _jsxs(Stack, {
                direction: 'row',
                gap: 2,
                children: [
                  buttonText &&
                    _jsx(UploadFileButton, {
                      icon: null,
                      text: buttonText,
                      onChange: onChange,
                      size: 'small',
                      multiple: multiple,
                    }),
                  buttons,
                ],
              }),
              hints &&
                _jsx(Typography, { variant: 'caption', children: hints }),
              error && _jsx(Alert, { severity: 'error', children: error }),
            ],
          }),
    ],
  });
};
const FileDropper = (args) => {
  return (
    // we need context={window} to use multiple times in the document
    // https://github.com/react-dnd/react-dnd/issues/3257#issuecomment-1239254032
    _jsx(DndProvider, {
      backend: HTML5Backend,
      context: window,
      children: _jsx(FileDropperComponent, {
        error: args.error,
        hints: args.hints,
        onChange: args.onChange,
        id: args.id,
        onDrop: args.onDrop,
        buttonText: args.buttonText,
        buttons: args.buttons,
        multiple: args.multiple,
        isLoading: args.isLoading,
        uploadProgress: args.uploadProgress,
        message: args.message,
      }),
    })
  );
};
export default FileDropper;
