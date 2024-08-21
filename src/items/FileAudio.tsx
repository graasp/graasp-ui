import { SxProps, styled } from '@mui/material';

type FileAudioProps = {
  id?: string;
  url?: string;
  type: string;
  sx?: SxProps;
};

const FileAudio = ({ id, url, type, sx }: FileAudioProps): JSX.Element => {
  const StyledAudio = styled('audio')({
    maxWidth: '100%',
    width: '100%',
  });
  return (
    <StyledAudio sx={sx} id={id} controls>
      <source src={url} type={type} />
    </StyledAudio>
  );
};

export default FileAudio;
