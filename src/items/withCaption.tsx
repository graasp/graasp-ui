import React from 'react';
import { Record } from 'immutable';
import Grid from '@material-ui/core/Grid';
import TextEditor from '../TextEditor';
import type { Item } from '../types';

interface WithCaptionProps {
  item: Record<Item>;
  edit?: boolean;
  onSave?: (text: string) => void;
  saveButtonText?: string;
  saveButtonId?: string;
}

const withCaption =
  ({ item, edit, onSave, saveButtonText, saveButtonId }: WithCaptionProps) =>
  (component: JSX.Element): JSX.Element => {
    class ComponentWithCaption extends React.Component {
      render(): JSX.Element {
        return (
          <Grid container>
            <Grid item xs={12}>
              {component}
            </Grid>
            <Grid item xs={12}>
              <TextEditor
                value={item.get('description') ?? ''}
                edit={edit}
                // onChange={this.onChange}
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

export default withCaption;
