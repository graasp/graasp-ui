import Grid from '@mui/material/Grid';

import React from 'react';

import { ItemRecord } from '@graasp/sdk/frontend';

import TextEditor from '../TextEditor';
import { DEFAULT_ITEM_DESCRIPTION } from '../constants';

interface WithCaptionProps {
  item: ItemRecord;
  edit?: boolean;
  onSave?: (text: string) => void;
  saveButtonText?: string;
  saveButtonId?: string;
}

function withCaption({
  item,
  edit,
  onSave,
  saveButtonText,
  saveButtonId,
}: WithCaptionProps) {
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
