import { Box, Typography } from '@mui/material';

import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend, NativeTypes } from 'react-dnd-html5-backend';

type FileDropperProps = {
  id?: string;
  onDrop?: (files: File[]) => void;
  maxFileUploadNumber?: number;
};

const FileDropper = ({
  id,
  onDrop,
  maxFileUploadNumber = 10,
}: FileDropperProps): JSX.Element | null => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop: (e: { files: File[] }) => {
      onDrop?.(e.files);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: ({ files }: { files: File[] }) => {
      return files.length <= maxFileUploadNumber;
    },
  });

  const isActive = canDrop && isOver;

  return (
    <Box
      id={id}
      height='100%'
      width='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
      bgcolor='#ededed'
      sx={{ border: '3px dashed grey' }}
      ref={drop}
    >
      <Typography>
        {isActive
          ? 'Release to drop'
          : 'Please select files or drag & drop here'}
      </Typography>
    </Box>
  );
};

const FileDropperWrapper = (args: FileDropperProps): JSX.Element | null => {
  return (
    <DndProvider backend={HTML5Backend}>
      <FileDropper
        id={args.id}
        onDrop={args.onDrop}
        maxFileUploadNumber={args.maxFileUploadNumber}
      />
    </DndProvider>
  );
};

export default FileDropperWrapper;
