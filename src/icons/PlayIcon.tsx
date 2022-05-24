import { makeStyles } from '@mui/styles';
import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';

interface PlayIconProps {
  size?: number;
  className?: string;
  disabled?: boolean;
}

const PlayIcon: React.FC<PlayIconProps> = ({ className, size = 30 }) => {
  const useStyles = makeStyles(() => ({
    background: { fill: PRIMARY_COLOR },
    circle: { fill: SECONDARY_COLOR },
    disabledBackground: { fill: SECONDARY_COLOR },
    disabledCircle: { fill: PRIMARY_COLOR },
  }));
  const classes = useStyles();
  return (
    <svg height={size} width={size} viewBox='0 0 40 40' className={className}>
      <g>
        <circle className={classes.circle} cx='18.93' cy='19.39' r='17.4' />
        <path
          className={classes.background}
          d='M19.9,0.49C9.11,0.49,0.36,9.23,0.36,20.02c0,10.79,8.75,19.54,19.54,19.54s19.54-8.75,19.54-19.54
		C39.43,9.23,30.69,0.49,19.9,0.49z M31.61,21.33l-18.56,8.99c-0.13,0.06-0.28,0.1-0.42,0.1c-0.18,0-0.36-0.05-0.51-0.15
		c-0.28-0.18-0.45-0.48-0.45-0.82V12.08c0-0.33,0.17-0.63,0.44-0.81c0.27-0.18,0.62-0.2,0.92-0.07l18.56,8.38
		c0.34,0.15,0.56,0.49,0.57,0.86C32.16,20.83,31.94,21.17,31.61,21.33z'
        />
      </g>
    </svg>
  );
};

export default PlayIcon;
