// we could replace dnd with this https://docs.dndkit.com
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useDrop } from 'react-dnd';

export type InBetweenProps<T> = {
  colSpan: number;
  previousRowIdx: number;
  enableMoveInBetween: boolean;
  onDrop: (draggedRow: T, idx: number) => void;
};

const InBetween = <T extends object>({
  colSpan,
  previousRowIdx,
  onDrop,
  enableMoveInBetween,
}: InBetweenProps<T>): JSX.Element => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'row',
      drop: (draggedRow: T) => {
        console.log('wefwef', draggedRow);
        return onDrop(draggedRow, previousRowIdx);
      },
      canDrop: () => enableMoveInBetween,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [onDrop],
  );

  return (
    <TableRow ref={drop}>
      {(!isOver || !enableMoveInBetween) && (
        <TableCell colSpan={colSpan} style={{ padding: 0, height: 5 }} />
      )}
      {isOver && enableMoveInBetween && (
        <TableCell
          colSpan={colSpan}
          sx={{ background: 'green', height: 5, padding: 0 }}
        />
      )}
    </TableRow>
  );
};

export default InBetween;
