import React, { FC } from 'react';
import { styled, SxProps } from '@mui/material';

type ImageProps = {
  sx?: SxProps;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const StyledImage: FC<ImageProps> = (props) => {
  const StyledImage = styled('img')({});
  return <StyledImage {...props} />;
};

type DivProps = {
  sx?: SxProps;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const StyledDiv: FC<DivProps> = (props) => {
  const StyledImage = styled('div')({});
  return <StyledImage {...props} />;
};

export { StyledImage, StyledDiv };
