import React from 'react';
import { Rnd } from 'react-rnd';
import ResizingIcon from '../icons/ResizingIcon';
import { IFRAME_MIN_HEIGHT } from '../constants';

interface WithResizingProps {
  height: string | number;
}

const resizeHandleStyles = {
  resizeHandleComponent: {
    height: '24px',
    bottom: '-32px',
    width: '23px',
    marginRight: 'auto',
    marginLeft: 'auto',
    left: '0',
    right: '0',
  },
  resizableContainer: {
    paddingBottom: '35px',
    '-webkit-user-select': 'none',
    '-webkit-touch-callout': 'none',
    '-khtml-user-select': 'none',
    '-moz-user-select': 'none',
    '-ms-user-select': 'none',
    'user-select': 'none',
  },
};

function withResizing({ height }: WithResizingProps) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithResizing extends React.Component {
      constructor(props: any) {
        super(props);
        this.state = {variableHeight: height};
      }

      render(): JSX.Element {
        return (
          <>
            <div style={resizeHandleStyles.resizableContainer}>
              <Rnd
                style={{ position: 'relative' }}
                disableDragging
                enableResizing={{ bottom: true }}
                default={{
                  width: '100%',
                  height: height,
                  x: 0,
                  y: 0,
                }}
                minHeight={IFRAME_MIN_HEIGHT}
                resizeHandleComponent={{ bottom: <ResizingIcon /> }}
                resizeHandleStyles={{
                  bottom: resizeHandleStyles.resizeHandleComponent,
                }}
                onResizeStop={(ref: any) => {
                  this.setState({
                    variableHeight: ref.style.height,
                  });
                }}
              >
                {component}
              </Rnd>
            </div>
          </>
        );
      }
    }

    return <ComponentWithResizing />;
  };
}

export default withResizing;
