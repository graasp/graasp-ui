import React from 'react';
import { Map, List } from 'immutable';
import { Main, MainMenu, MenuItem, DynamicTreeView } from '@graasp/ui';
import HomeIcon from '@material-ui/icons/Home';
import {
  QueryClientProvider,
  queryClient,
  hooks,
} from './configureQueryClient';
import '@graasp/ui/dist/index.css';

const ITEM_TYPES = {
  FOLDER: 'folder',
  FILE: 'file',
  S3_FILE: 's3File',
  LINK: 'embeddedLink',
  SHORTCUT: 'shortcut',
  DOCUMENT: 'document',
  APP: 'app',
};

const App = () => {
  const mainMenu = (
    <MainMenu>
      <MenuItem text='Home' icon={<HomeIcon />} selected={true}></MenuItem>
    </MainMenu>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Main sidebar={mainMenu}>
        <DynamicTreeView
          id='293584'
          rootLabel='Root Items'
          rootId='erg3244'
          rootClassName='flwef'
          useItem={() => ({
            isLoading: false,
            data: Map({
              id: Math.random() * 300,
              name: Math.random() * 300,
              type: ITEM_TYPES.FOLDER,
            }),
          })}
          useChildren={() => ({
            isLoading: false,
            data: List([
              { id: '23rwe', name: '234retfd', type: ITEM_TYPES.FOLDER },
              { id: 'bfdvc', name: '234retfd', type: ITEM_TYPES.FOLDER },
              { id: 'rtbgf ', name: '234retfd', type: ITEM_TYPES.FILE },
            ]),
          })}
          item={Map({ id: '293584', type: ITEM_TYPES.FOLDER })}
          items={[
            { id: '293584', type: ITEM_TYPES.FOLDER },
            { id: 'htrgr', type: ITEM_TYPES.FOLDER },
          ]}
          showItemFilter={(item: any) =>
            item?.get('type') === ITEM_TYPES.FOLDER
          }
        />
      </Main>
    </QueryClientProvider>
  );
};

export default App;
