import { AlertTitle } from '@mui/material';
import Alert from '@mui/material/Alert';

import { DocumentItemExtraFlavor } from '@graasp/sdk';

type WithFlavorProps = {
  content: JSX.Element | string;
  title?: string;
  flavor?: `${DocumentItemExtraFlavor}` | DocumentItemExtraFlavor;
};

export const withFlavor = ({
  content,
  title,
  flavor = DocumentItemExtraFlavor.None,
}: WithFlavorProps): JSX.Element => {
  if (flavor === DocumentItemExtraFlavor.None) {
    // need to wrap in a fragment because content can be a string which is not a JSX.Element
    return <>{content}</>;
  }
  return (
    <Alert
      severity={flavor}
      sx={{
        alignItems: 'flex-start',
        '& .MuiAlert-message': {
          // this allows the content of the text to expand over all available space
          flexGrow: 1,
        },
      }}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {content}
    </Alert>
  );
};
