import React from 'react';
import { Main, MainMenu, MenuItem } from '@graasp/ui';
import HomeIcon from '@material-ui/icons/Home';
import '@graasp/ui/dist/index.css';

const App = () => {
  const mainMenu = (
    <MainMenu>
      <MenuItem text='Home' icon={<HomeIcon />} selected={true}></MenuItem>
    </MainMenu>
  );

  return <Main sidebar={mainMenu} />;
};

export default App;
