import React from 'react';
import { RecordOf } from 'immutable';
import Grid from '@material-ui/core/Grid';
import TextEditor from '../TextEditor';
import type { Item } from '../types';
import { DEFAULT_ITEM_DESCRIPTION } from '../constants';

interface WithCaptionProps<T> {
  item: RecordOf<Item<T>>;
  edit?: boolean;
  onSave?: (text: string) => void;
  saveButtonText?: string;
  saveButtonId?: string;
}

function withCaption<T>({
  item,
  edit,
  onSave,
  saveButtonText,
  saveButtonId,
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
                saveButtonId={saveButtonId}
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
