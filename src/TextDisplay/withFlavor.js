import { Alert, AlertTitle, Typography } from '@mui/material';

import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { DocumentItemExtraFlavor } from '@graasp/sdk';

const Title = ({ title, isAlert = false }) => {
  if (!title) {
    return false;
  }
  if (isAlert) {
    return _jsx(AlertTitle, {
      sx: { fontWeight: 700, fontSize: '1.1rem' },
      children: title,
    });
  }
  return _jsx(Typography, { variant: 'h5', children: title });
};
export const withFlavor = ({
  content,
  title,
  flavor = DocumentItemExtraFlavor.None,
}) => {
  if (flavor === DocumentItemExtraFlavor.None) {
    // need to wrap in a fragment because content can be a string which is not a JSX.Element
    return _jsxs(_Fragment, {
      children: [_jsx(Title, { title: title }), content],
    });
  }
  return _jsxs(Alert, {
    severity: flavor,
    sx: {
      alignItems: 'flex-start',
      '& .MuiAlert-message': {
        // this allows the content of the text to expand over all available space
        flexGrow: 1,
      },
    },
    children: [_jsx(Title, { title: title, isAlert: true }), content],
  });
};
