import React, { FC, useEffect, useRef } from 'react';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import { makeStyles } from '@material-ui/core/styles';
import { DRAG_ICON_SIZE } from '../constants';

interface Props {
  data: {
    id: string;
  };
  registerRowDragger: (ref: SVGSVGElement) => void;
  buildId?: (id: string) => string;
}

const useStyles = makeStyles(() => ({
  dragIconContainer: {
    display: 'flex',
    '&:hover': {
      cursor: 'move',
    },
  },
  dragIcon: {
    fontSize: DRAG_ICON_SIZE,
  },
}));

const DragCellRenderer: FC<Props> = ({
  data: item,
  registerRowDragger,
  buildId,
}) => {
  const classes = useStyles();
  const dragRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (dragRef && dragRef.current) {
      registerRowDragger(dragRef.current);
    }
  }, [dragRef]);

  return (
    <div className={classes.dragIconContainer}>
      <DragIndicatorIcon
        id={buildId?.(item.id)}
        ref={dragRef}
        className={classes.dragIcon}
      />
    </div>
  );
};

export default DragCellRenderer;
