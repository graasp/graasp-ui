import { Interweave } from 'interweave';

import { Stack } from '@mui/material';

const DEFAULT_ITEM_DESCRIPTION = '';

type WithCaptionProps<T extends { description: string | null }> = {
  item: T;
};

function withCaption<T extends { description: string | null }>({
  item,
}: WithCaptionProps<T>) {
  return (component: JSX.Element): JSX.Element => {
    const ChildComponent = (): JSX.Element => {
      return (
        <Stack>
          {component}
          <Interweave content={item.description || DEFAULT_ITEM_DESCRIPTION} />
        </Stack>
      );
    };

    return <ChildComponent />;
  };
}

export default withCaption;
