import { createContext, useContext, useState } from 'react';

import { useMobileView } from '../hooks/useMobileView';

type MainMenuOpenContextType = {
  open: boolean;
  setOpen: (newState: boolean | ((state: boolean) => boolean)) => void;
};
const MainMenuOpenContext = createContext<MainMenuOpenContextType>({
  open: true,
  setOpen: () => null,
});

export const MainMenuOpenContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const { isMobile } = useMobileView();

  const [open, setOpen] = useState(!isMobile);
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
