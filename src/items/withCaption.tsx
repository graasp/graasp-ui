import Grid from '@mui/material/Grid';

import React from 'react';

import TextEditor from '../TextEditor';

const DEFAULT_ITEM_DESCRIPTION = '';

interface WithCaptionProps<T> {
  item: T;
  edit?: boolean;
  onSave?: (text: string) => void;
  onCancel?: (text: string) => void;
  saveButtonText?: string;
  saveButtonId?: string;
  cancelButtonId?: string;
}

function withCaption<T extends { description: string | null }>({
  item,
  edit,
  onSave,
  onCancel,
  saveButtonText,
  saveButtonId,
  cancelButtonId,
}: WithCaptionProps<T>) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithCaption extends React.Component {
      render(): JSX.Element {
        return (
          <Grid container>
            <Grid item xs={12}>
              {component}
            </Grid>
            <Grid item xs={12}>
              <TextEditor
                value={item.description || DEFAULT_ITEM_DESCRIPTION}
                edit={edit}
                onSave={onSave}
                onCancel={onCancel}
                saveButtonId={saveButtonId}
                cancelButtonId={cancelButtonId}
                saveButtonText={saveButtonText}
              />
            </Grid>
          </Grid>
        );
      }
    }

    return <ComponentWithCaption />;
  };
}

export default withCaption;
