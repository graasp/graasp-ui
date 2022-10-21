import { SxProps, styled } from '@mui/material';

import React, { FC } from 'react';

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
  const StyledDiv = styled('div')({});
  return <StyledDiv {...props} />;
};

export { StyledImage, StyledDiv };
