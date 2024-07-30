import { createContext, useContext, useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

import { useMobileView } from '../hooks/useMobileView.js';

const MainMenuOpenContext = createContext({
  open: true,
  setOpen: () => {
    console.error('No Provider found for this context. Check your tree');
  },
});
export const MainMenuOpenContextProvider = ({
  open: initialOpen = true,
  children,
}) => {
  const { isMobile } = useMobileView();
  // the initial open state is:
  // on mobile: always closed by default
  // on desktop: initialized by the state passed by the parent, or open if not specified
  const [open, setOpen] = useState(isMobile ? false : initialOpen);
  return _jsx(MainMenuOpenContext.Provider, {
    value: {
      open,
      setOpen,
    },
    children: children,
  });
};
export const useMainMenuOpenContext = () => useContext(MainMenuOpenContext);
