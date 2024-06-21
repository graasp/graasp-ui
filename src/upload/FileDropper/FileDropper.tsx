import { CloudUploadIcon } from 'lucide-react';

import {
  Alert,
  Box,
  LinearProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { DndProvider, DropTargetMonitor, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';

import UploadFileButton, {
  UploadFileButtonProps,
} from '../UploadFileButton/UploadFileButton';

export type FileDropperProps = {
  id?: string;
  /**
   * Callback on files dropped
   */
  onDrop?: (files: File[]) => void;
  /**
   * Callback on files selected
   */
  onChange: UploadFileButtonProps['onChange'];
  /**
   * Error to show
   */
  error?: string;
  /**
   * Smaller text to show, such as limits
   */
  hints?: string;
  /**
   * Text of the browsing button
   */
  buttonText?: string;
  /**
   * additional buttons to display next to browse files
   */
  buttons?: JSX.Element;
  /**
   * When true, allows many files to be selected when browsing
   */
  multiple?: UploadFileButtonProps['multiple'];
  /**
   * Text displayed by default
   */
  message?: string;
  /**
   * Text displayed on drag enter
   */
  releaseText?: string;
  /**
   * Whether files are getting uploaded
   * If a number is provided, it shows a determinate progress bar
   */
  loading?: boolean | number;
};

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
  loading = false,
}: FileDropperProps): JSX.Element => {
  const theme = useTheme();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (e: { files: File[] }) => {
      onDrop?.(e.files);
    },
    canDrop: () => {
      return !loading;
    },
    collect: (monitor: DropTargetMonitor) => ({
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

  return (
    <Stack
      role='dropzone'
      id={id}
      height='100%'
      width='100%'
      justifyContent='center'
      alignItems='center'
      bgcolor={error ? '#ffbaba' : bgColor}
      borderRadius={5}
      ref={drop}
      gap={2}
      sx={{
        borderStyle: 'dashed',
        borderWidth: 3,
        borderColor: error ? 'red' : 'lightgrey',
      }}
      py={4}
      boxSizing='border-box'
    >
      <CloudUploadIcon
        size={80}
        color={error ? 'red' : theme.palette.primary.main}
      />
      {Boolean(loading) || loading === 0 ? (
        <Box width='100%' px={5}>
          <LinearProgress
            variant={
              typeof loading === 'number' ? 'determinate' : 'indeterminate'
            }
            color='primary'
            value={typeof loading === 'number' ? loading : undefined}
          />
          {typeof loading === 'number' && (
            <Typography textAlign='center'>{loading}%</Typography>
          )}
        </Box>
      ) : (
        <>
          <Typography variant='label' color={error ? 'error' : 'primary'}>
            {isActive ? releaseText : message}
          </Typography>
          <Stack direction='row' gap={2}>
            {buttonText && (
              <UploadFileButton
                icon={null}
                text={buttonText}
                onChange={onChange}
                size='small'
                multiple={multiple}
              />
            )}
            {buttons}
          </Stack>
          {hints && <Typography variant='caption'>{hints}</Typography>}
          {error && <Alert severity='error'>{error}</Alert>}
        </>
      )}
    </Stack>
  );
};

const FileDropper = (args: FileDropperProps): JSX.Element | null => {
  return (
    // we need context={window} to use multiple times in the document
    // https://github.com/react-dnd/react-dnd/issues/3257#issuecomment-1239254032
    <DndProvider backend={HTML5Backend} context={window}>
      <FileDropperComponent
        error={args.error}
        hints={args.hints}
        onChange={args.onChange}
        id={args.id}
        onDrop={args.onDrop}
        buttonText={args.buttonText}
        buttons={args.buttons}
        multiple={args.multiple}
        loading={args.loading}
        message={args.message}
      />
    </DndProvider>
  );
};

export default FileDropper;
