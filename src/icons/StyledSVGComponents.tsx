import { SxProps, styled } from '@mui/material';

import React, { FC, PropsWithChildren } from 'react';

import { SECONDARY_COLOR } from '../theme';

type SVGWrapperProps = {
  viewBox?: string;
  size?: number;
  sx?: SxProps;
} & React.SVGProps<SVGElement>;

const SVGWrapper: FC<PropsWithChildren<SVGWrapperProps>> = ({
  children,
  viewBox,
  size,
  sx,
}) => {
  const StyledSVG = styled('svg')({
    width: size,
    height: size,
  });
  return (
    <StyledSVG viewBox={viewBox} sx={sx}>
      {children}
    </StyledSVG>
  );
};

type SVGPathProps = {
  sx?: SxProps;
} & React.SVGProps<SVGPathProps>;
const SVGPath: FC<SVGPathProps> = ({ d, sx }) => {
  const StyledPath = styled('path')();
  return <StyledPath d={d} sx={sx} />;
};

type SVGCircleProps = {
  sx?: SxProps;
} & React.SVGProps<SVGCircleElement>;
const SVGCircle: FC<SVGCircleProps> = (props) => {
  const StyledCircle = styled('circle')({
    fill: SECONDARY_COLOR,
  });
  return <StyledCircle sx={props.sx} {...props} />;
};

export { SVGWrapper, SVGPath, SVGCircle };
