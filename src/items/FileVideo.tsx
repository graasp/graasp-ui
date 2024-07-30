import { SxProps, styled } from '@mui/material';

type FileVideoProps = {
  id?: string;
  url?: string;
  sx?: SxProps;
};

const StyledVideo = styled('video')({
  maxWidth: '100%',
});

const FileVideo = ({ id, url, sx }: FileVideoProps): JSX.Element => {
  return (
    <StyledVideo sx={sx} id={id} controls>
      <source src={url} />
    </StyledVideo>
  );
};

export default FileVideo;
