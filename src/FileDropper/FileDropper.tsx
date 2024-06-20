import { UploadFileButton } from '@/buttons';
import { UploadFileButtonProps } from '@/buttons/UploadFileButton/UploadFileButton';
import { CloudUploadIcon } from 'lucide-react';

import { Stack, Typography, useTheme } from '@mui/material';

import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';

type FileDropperProps = {
  id?: string;
  onDrop?: (files: File[]) => void;
  onChange: UploadFileButtonProps['onChange'];
};

const FileDropper = ({
  id,
  onDrop,
  onChange,
}: FileDropperProps): JSX.Element | null => {
  const theme = useTheme();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (e: { files: File[] }) => {
      onDrop?.(e.files);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;
  let bgColor = theme.palette.background.default;
  if (isActive) {
    bgColor = '#dcdcf6';
  } else if (!canDrop && isOver) {
    bgColor = 'red';
  }

  return (
    <Stack
      id={id}
      height='100%'
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgcolor={bgColor}
      borderRadius={5}
      sx={{ border: '3px dashed lightgrey' }}
      ref={drop}
    >
      <Stack display='block'>
        <CloudUploadIcon size={80} color={theme.palette.primary.main} />
      </Stack>
      <Typography variant='label' color='primary'>
        {isActive ? 'Release to drop' : 'Drag & drop\nor'}
      </Typography>
      <UploadFileButton onChange={onChange} size='small' />
    </Stack>
  );
};

const FileDropperWrapper = (args: FileDropperProps): JSX.Element | null => {
  return (
    // we need context={window} to use multiple times in the document
    // https://github.com/react-dnd/react-dnd/issues/3257#issuecomment-1239254032
    <DndProvider backend={HTML5Backend} context={window}>
      <FileDropper onChange={args.onChange} id={args.id} onDrop={args.onDrop} />
    </DndProvider>
  );
};

export default FileDropperWrapper;
