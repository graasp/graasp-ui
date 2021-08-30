import React from 'react';
import { Main, MainMenu, MenuItem } from '@graasp/ui';
import HomeIcon from '@material-ui/icons/Home';
import '@graasp/ui/dist/bundle.css';

const App = () => {
  const mainMenu = (
    <MainMenu>
      <MenuItem text='Home' icon={<HomeIcon />}></MenuItem>
    </MainMenu>
  );

  return <Main sidebar={mainMenu} />;
};

export default App;
