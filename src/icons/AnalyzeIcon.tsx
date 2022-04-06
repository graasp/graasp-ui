import React from 'react';
import BarChartIcon from '@material-ui/icons/BarChart';

interface AnalyzeIconProps {
  className?: string;
  disabled?: boolean;
}

const AnalyzeIcon: React.FC<AnalyzeIconProps> = ({ className }) => {
  return <BarChartIcon className={className} />;
};

export default AnalyzeIcon;
