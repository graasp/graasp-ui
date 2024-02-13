import { createContext, useContext, useState } from 'react';

import { useMobileView } from '../hooks/useMobileView';

type MainMenuOpenContextType = {
  open: boolean;
  setOpen: (newState: boolean | ((state: boolean) => boolean)) => void;
};
const MainMenuOpenContext = createContext<MainMenuOpenContextType>({
  open: true,
  setOpen: () => {
    console.error('No Provider found for this context. Check your tree');
  },
});

export const MainMenuOpenContextProvider = ({
  open: initialOpen = true,
  children,
}: {
  open?: boolean;
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { isMobile } = useMobileView();

  // the initial open state is:
  // on mobile: always closed by default
  // on desktop: initialized by the state passed by the parent, or open if not specified
  const [open, setOpen] = useState(isMobile ? false : initialOpen);
  return (
    <MainMenuOpenContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </MainMenuOpenContext.Provider>
  );
};

export const useMainMenuOpenContext = (): MainMenuOpenContextType =>
  useContext(MainMenuOpenContext);
