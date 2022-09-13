import React from 'react';
import { Rnd } from 'react-rnd';
import Cookies from 'js-cookie'
import ResizingIcon from '../icons/ResizingIcon';
import { UUID } from '../types';

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

const IFRAME_RESIZE_HEIGHT_KEY = 'iFrameResizeHeight';

const buildIframeResizeHeightKey = (memberId: UUID, itemId: UUID) => `${IFRAME_RESIZE_HEIGHT_KEY}-${memberId}-${itemId}`;


function withResizing({ height, memberId, itemId }: WithResizingProps) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithResizing extends React.Component<{}, {variableHeight: string | number}> {
      constructor(props: any) {
        super(props);
        this.state = {
          variableHeight: height,
        };
      }

      componentDidMount(): void {
        const iframeResizeHeight = Cookies.get(buildIframeResizeHeightKey(memberId, itemId));
        if(iframeResizeHeight) {
          this.setState({
            variableHeight: iframeResizeHeight,
          });
        }
      }

      componentDidUpdate(_prevProps: any, prevState: any) {
        if (prevState.variableHeight !== this.state.variableHeight) {
          Cookies.set(buildIframeResizeHeightKey(memberId, itemId), String(this.state.variableHeight));
        }
      }

      render(): JSX.Element {
        return (
          <>
            <div style={resizeHandleStyles.resizableContainer}>
              <Rnd
                size={{ width: '100%',  height: this.state.variableHeight }}
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
