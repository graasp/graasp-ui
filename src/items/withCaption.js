import React from 'react';
import { Grid } from '@material-ui/core';
import TextEditor from '../TextEditor';

const withCaption =
  ({ item, onBlur, edit }) =>
  (component) => {
    return (
      <Grid container>
        <Grid item xs={12}>
          {component}
        </Grid>
        <Grid item xs={12}>
          <TextEditor
            onBlur={onBlur}
            value={item.get('description')}
            edit={edit}
          />
        </Grid>
      </Grid>
    );
  };

export default withCaption;
