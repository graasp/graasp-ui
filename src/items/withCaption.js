import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextEditor from '../TextEditor';

const withCaption =
  ({ item, edit, onSave, saveButtonText, saveButtonId }) =>
  (component) => {
    class ComponentWithCaption extends React.Component {
      render() {
        return (
          <Grid container>
            <Grid item xs={12}>
              {component}
            </Grid>
            <Grid item xs={12}>
              <TextEditor
                value={item.get('description')}
                edit={edit}
                onChange={this.onChange}
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
