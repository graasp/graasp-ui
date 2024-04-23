import { Button, Breadcrumbs as MuiBreadcrumbs } from '@mui/material';

import type { NavigationElement } from './types';

const ROW_MAX_NAME_LENGTH = 15;

type Props = {
  onSelect: (el: NavigationElement) => void;
  elements: NavigationElement[];
};

// todo: add in sdk? it exists in builder as well
const applyEllipsisOnLength = (longString: string, maxLength: number): string =>
  `${longString.slice(0, maxLength)}${
    (longString.length || 0) > maxLength ? '…' : ''
  }`;

const Breadcrumbs = ({ onSelect, elements }: Props): JSX.Element | null => {
  if (!elements) {
    return null;
  }

  return (
    <MuiBreadcrumbs separator='›' aria-label='breadcrumb'>
      {elements.map((ele) => (
        <Button
          variant='text'
          color='inherit'
          sx={{
            textTransform: 'none',
            p: 0,
            minWidth: 0,
            '&:hover': {
              textDecoration: 'underline',
              background: 'none',
            },
          }}
          key={ele.id}
          onClick={() => {
            onSelect(ele);
          }}
        >
          {ele.icon}
          {applyEllipsisOnLength(ele.name, ROW_MAX_NAME_LENGTH)}
        </Button>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
