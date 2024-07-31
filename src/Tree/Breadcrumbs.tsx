import truncate from 'lodash.truncate';

import {
  Button,
  Breadcrumbs as MuiBreadcrumbs,
  Stack,
  Tooltip,
} from '@mui/material';

import type { NavigationElement } from './types.js';

const DEFAULT_MAX_LENGTH = 15;

export type BreadcrumbsProps = {
  onSelect: (el: NavigationElement) => void;
  elements: NavigationElement[];
  rootElements?: NavigationElement[];
  /**
   * defines whether a root item should be displayed
   * does not filter over elements
   */
  selectedId?: string;
  maxLength?: number;
};

const Breadcrumbs = ({
  onSelect,
  elements,
  rootElements = [],
  selectedId,
  maxLength = DEFAULT_MAX_LENGTH,
}: BreadcrumbsProps): JSX.Element | null => {
  if (!elements) {
    return null;
  }

  // include root if selected or show elements
  const idx = rootElements.findIndex(({ id }) => id == selectedId);
  const showRootIdx = idx < 0 ? rootElements.length : idx + 1;

  const allElements = [
    // show rootElements until selectedId
    ...rootElements.slice(0, showRootIdx),
    // show elements if selected id not in rootElements
    ...(idx < 0 ? elements : []),
  ];

  return (
    <MuiBreadcrumbs separator='›' aria-label='breadcrumb'>
      {allElements.map((ele) => (
        <Tooltip title={ele.name}>
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
            <Stack direction='row' gap={1}>
              {ele.icon}
              {truncate(ele.name, { length: maxLength })}
            </Stack>
          </Button>
        </Tooltip>
      ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
