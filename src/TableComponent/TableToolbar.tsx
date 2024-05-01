import { TableCell, TableRow, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

interface Props {
  selected: string[];
  Actions?: ({ selectedIds }: { selectedIds: string[] }) => JSX.Element;
  NoSelectionToolbar?: () => JSX.Element;
  countTextFunction?: (selection: string[]) => string;
  colSpan?: number;
}

// casting is needed to support the `component` prop
// see: https://mui.com/material-ui/guides/typescript/#complications-with-the-component-prop
const StyledTitle = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}) as typeof Typography;

const TableToolbar = ({
  selected,
  Actions,
  NoSelectionToolbar,
  countTextFunction,
  colSpan = 1,
}: Props): JSX.Element | null => {
  const numSelected = selected.length;
  const StyledToolbar = styled(TableRow)(({ theme }) => ({
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    width: '100%',
    ...(numSelected > 0 && {
      background: theme.palette.primary.main,
      color: 'white',
    }),
  }));

  if (numSelected > 0) {
    return (
      <StyledToolbar>
        <TableCell colSpan={colSpan}>
          <StyledTitle color='inherit' variant='subtitle1'>
            {countTextFunction?.(selected) ?? `${numSelected} selected`}
          </StyledTitle>
          {Actions?.({ selectedIds: selected })}
        </TableCell>
      </StyledToolbar>
    );
  }

  if (NoSelectionToolbar) {
    // eslint-disable-next-line no-unused-expressions
    return NoSelectionToolbar?.();
  }

  return null;
};

export default TableToolbar;
