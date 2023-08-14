import { styled } from '@mui/material';
import Alert from '@mui/material/Alert';

import React, { FC, Fragment, useRef, useState } from 'react';

import { ScormItemTypeRecord } from '@graasp/sdk/frontend';

import withCollapse from '../Collapse/withCollapse';
import { ITEM_MAX_HEIGHT } from './constants';
import withCaption from './withCaption';
import withResizing, { StyledIFrame } from './withResizing';

export interface ScormItemProps {
  /**
   * Id of the current member used for saving the resizing preferences
   */
  memberId?: string;
  editCaption?: boolean;
  errorMessage?: string;
  height?: number | string;
  /**
   * whether the link can be resized
   */
  isResizable?: boolean;
  item: ScormItemTypeRecord;
  loadingMessage?: string;
  onSaveCaption?: (text: string) => void;
  onCancelCaption?: (text: string) => void;
  /**
   * id of the save button
   */
  saveButtonId?: string;
  /**
   * id of the cancel button
   */
  cancelButtonId?: string;
  /**
   * whether the caption should be displayed
   */
  showCaption?: boolean;
  /**
   * whether the component should be collapse
   */
  showCollapse?: boolean;

  /**
   * where the scorm files are stored
   */
  storageUrl: string;
}

const IFrameContainer = styled('div')({
  position: 'relative',
  maxHeight: ITEM_MAX_HEIGHT,
  overflow: 'auto',
});

const ScormItem: FC<ScormItemProps> = ({
  item,
  memberId,
  onSaveCaption,
  onCancelCaption,
  saveButtonId,
  cancelButtonId,
  editCaption = false,
  showCaption = true,
  loadingMessage = 'Scorm file is Loading...',
  storageUrl,
  height: defaultHeight = 400,
  errorMessage = 'The scorm file is malformed.',
  isResizable = false,
  showCollapse = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [height] = useState<string | number>(defaultHeight);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const id = item.id;
  const name = item.name;
  const url = `${storageUrl}/${item.extra.scorm.contentFilePath}/story.html`;

  const CaptionWrapper = withCaption({
    item,
    onSave: onSaveCaption,
    onCancel: onCancelCaption,
    saveButtonId,
    cancelButtonId,
    edit: editCaption,
  });

  const handleLoad = (): void => {
    setIsLoading(false);
  };

  const renderIframe = (): JSX.Element | null => {
    const iframe = (
      <StyledIFrame
        height={height}
        id={id}
        isResizable={isResizable}
        onLoad={handleLoad}
        ref={iframeRef}
        src={storageUrl}
        title={name}
        sandbox='allow-scripts'
      />
    );

    const ResizableScorm = withResizing({
      height,
      component: iframe,
      memberId,
      itemId: item.id,
    });

    return (
      <>
        <IFrameContainer hidden={!isLoading} style={{ height }}>
          {loadingMessage}
        </IFrameContainer>
        <div hidden={isLoading}>
          {isResizable ? (
            <div>
              <ResizableScorm />
            </div>
          ) : (
            iframe
          )}
        </div>
      </>
    );
  };

  const getComponent = (): JSX.Element => {
    if (!url) {
      return <Alert severity='error'>{errorMessage}</Alert>;
    }

    return <Fragment>{renderIframe()}</Fragment>;
  };

  let scormItem = getComponent();

  if (showCaption) {
    scormItem = CaptionWrapper(scormItem);
  }

  if (showCollapse) {
    scormItem = withCollapse({ itemName: name })(scormItem);
  }

  return scormItem;
};

export default React.memo(ScormItem);
