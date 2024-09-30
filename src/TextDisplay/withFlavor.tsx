import { Alert, AlertTitle, Typography } from '@mui/material';

import { DocumentItemExtraFlavor } from '@graasp/sdk';

const Title = ({
  title,
  isAlert = false,
}: {
  title?: string;
  isAlert?: boolean;
}): JSX.Element | null => {
  if (!title) {
    return null;
  }
  if (isAlert) {
    return (
      <AlertTitle sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
        {title}
      </AlertTitle>
    );
  }
  return <Typography variant='h5'>{title}</Typography>;
};
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
    return (
      <>
        <Title title={title} />
        {content}
      </>
    );
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
      <Title title={title} isAlert />
      {content}
    </Alert>
  );
};
