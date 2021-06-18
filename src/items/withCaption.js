import React from 'react';
import { Grid, Button } from '@material-ui/core';
import TextEditor from '../TextEditor';

const withCaption =
  ({ item, edit, onSave, saveButtonText = 'Save', saveButtonId }) =>
  (component) => {
    class ComponentWithCaption extends React.Component {
      state = {
        content: null,
      };

      onChange = (content) => {
        this.setState({ content });
      };

      render() {
        const { content } = this.state;

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
              />
              {edit && (
                <Button
                  variant='contained'
                  id={saveButtonId}
                  color='primary'
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    onSave?.(content);
                  }}
                >
                  {saveButtonText}
                </Button>
              )}
            </Grid>
          </Grid>
        );
      }
    }

    return <ComponentWithCaption />;
  };

export default withCaption;
