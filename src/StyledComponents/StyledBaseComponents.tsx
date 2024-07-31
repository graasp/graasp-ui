import { SxProps, styled } from '@mui/material';

import { DetailedHTMLProps, HTMLAttributes, ImgHTMLAttributes } from 'react';

type ImageProps = {
  sx?: SxProps;
} & DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const StyledImage = (props: ImageProps): JSX.Element => {
  const StyledImage = styled('img')({});
  return <StyledImage {...props} />;
};

type DivProps = {
  sx?: SxProps;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const StyledDiv = (props: DivProps): JSX.Element => {
  const StyledDiv = styled('div')({});
  return <StyledDiv {...props} />;
};

export { StyledImage, StyledDiv };
