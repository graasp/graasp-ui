import React from 'react';
import { Rnd } from 'react-rnd';
import ResizingIcon from '../icons/ResizingIcon';
import { UUID } from '../types';
import { getIframeResizeHeightCookie, setIframeResizeHeightCookie } from '@graasp/sdk';

interface WithResizingProps {
  height: string | number;
  memberId: UUID;
  itemId: UUID;
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

function withResizing({ height, memberId, itemId }: WithResizingProps) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithResizing extends React.Component<
      {},
      { variableHeight: string | number }
    > {
      constructor(props: any) {
        super(props);
        this.state = {
          variableHeight: height,
        };
      }

      componentDidMount(): void {
        const iframeResizeHeight = getIframeResizeHeightCookie(memberId, itemId);

        if (iframeResizeHeight) {
          this.setState({
            variableHeight: iframeResizeHeight,
          });
        }
      }

      componentDidUpdate(_prevProps: any, prevState: any) {
        if (prevState.variableHeight !== this.state.variableHeight) {
          setIframeResizeHeightCookie(memberId, itemId, this.state.variableHeight);
        }
      }

      render(): JSX.Element {
        return (
          <>
            <div style={resizeHandleStyles.resizableContainer}>
              <Rnd
                size={{ width: '100%', height: this.state.variableHeight }}
                position={{ x: 0, y: 0 }}
                style={{ position: 'relative' }}
                disableDragging
                enableResizing={{ bottom: true }}
                resizeHandleComponent={{ bottom: <ResizingIcon /> }}
                resizeHandleStyles={{
                  bottom: resizeHandleStyles.resizeHandleComponent,
                }}
                onResizeStop={(_e, _direction, ref, _delta, _position) => {
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
