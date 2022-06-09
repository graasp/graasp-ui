import React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface AnalyzeIconProps {
  sx?: SxProps<Theme>;
  disabled?: boolean;
}

const AnalyzeIcon: React.FC<AnalyzeIconProps> = ({ sx }) => {
  return <BarChartIcon sx={sx} />;
};

export default AnalyzeIcon;
