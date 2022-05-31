import React from 'react';
import { Rnd } from 'react-rnd';
import ExtensionIcon from '../icons/ExtensionIcon';
import { IFRAME_MIN_HEIGHT } from '../constants';

interface WithExtensionProps {
  height: string | number;
}

const resizeHandleStyles = {
  height: '24px',
  bottom: '-32px',
  width: '23px',
  marginRight: 'auto',
  marginLeft: 'auto',
  left: '0',
  right: '0',
};

function withExtension({ height }: WithExtensionProps) {
  return (component: JSX.Element): JSX.Element => {
    class ComponentWithExtension extends React.Component {
      render(): JSX.Element {
        return (
          <>
            <div style={{ paddingBottom: '35px' }}>
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
                resizeHandleComponent={{ bottom: <ExtensionIcon /> }}
                resizeHandleStyles={{ bottom: resizeHandleStyles }}
              >
                {component}
              </Rnd>
            </div>
          </>
        );
      }
    }

    return <ComponentWithExtension />;
  };
}

export default withExtension;
