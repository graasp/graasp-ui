import { styled } from '@mui/material';

import React from 'react';

import { Context } from '@graasp/sdk';

import Header from '../Header/Header';
import Sidebar from '../Sidebar';
import { DRAWER_WIDTH } from '../constants';

const StyledRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100vw',
  height: '100%',
});

const StyledMain = styled('main')<{ open?: boolean; fullScreen: boolean }>(
  ({ theme, open, fullScreen }) => ({
    flexGrow: 1,
    marginLeft: 0,
    boxSizing: 'border-box',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    }),
    ...(fullScreen && {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    }),
  }),
);

// export interface MainProps {
//   context?: `${Context}` | Context;
//   children?: JSX.Element | JSX.Element[];
//   fullScreen?: boolean;
//   /**
//    * Header's center content
//    */
//   headerCenterContent?: React.ReactElement;
//   /**
//    * Header's left content
//    */
//   headerLeftContent?: React.ReactElement;
//   /**
//    * Header's right content
//    */
//   headerRightContent?: React.ReactElement;
//   /**
//    * Whether the sidebar is open by default
//    */
//   headerId?: string;
//   headerSx?: SxProps;
//   open?: boolean;
//   sidebar?: React.ReactElement;
//   menuButtonId?: string;
//   handleDrawerOpen?: () => void;
//   handleDrawerClose?: () => void;
// }

// type MainState = {
//   open: boolean;
// };

// export class MainClass extends Component<MainProps, MainState> {
//   state = ((): MainState => ({
//     open: this.props.open || false,
//   }))();

//   static defaultProps = {
//     fullScreen: false,
//   };

//   handleDrawerOpen = (): void => {
//     this.setState({ open: true });
//     this.props.handleDrawerOpen?.();
//   };

//   handleDrawerClose = (): void => {
//     this.setState({ open: false });
//     this.props.handleDrawerClose?.();
//   };

//   render(): JSX.Element {
//     const {
//       children,
//       fullScreen,
//       headerLeftContent,
//       headerRightContent,
//       headerCenterContent,
//       headerId,
//       menuButtonId,
//       sidebar,
//     } = this.props;
//     const { open } = this.state;
//     const hasSidebar = Boolean(sidebar);

//     return (
//       <StyledRoot>
//         <Header
//           context={this.props.context}
//           hasSidebar={hasSidebar}
//           isSidebarOpen={open}
//           handleDrawerOpen={this.handleDrawerOpen}
//           handleDrawerClose={this.handleDrawerClose}
//           leftContent={headerLeftContent}
//           rightContent={headerRightContent}
//           centerContent={headerCenterContent}
//           id={headerId}
//           menuButtonId={menuButtonId}
//           sx={this.props.headerSx}
//         />

//         {hasSidebar && <Sidebar isSidebarOpen={open}>{sidebar}</Sidebar>}

//         <StyledMain open={open} fullScreen={fullScreen}>
//           <>
//             <DrawerHeaderContainer />
//             {children}
//           </>
//         </StyledMain>
//       </StyledRoot>
//     );
//   }
// }

type Props = {
  context?: `${Context}` | Context;
  sidebar?: JSX.Element;
  /**
   * Header's center content
   */
  headerCenterContent?: JSX.Element;
  /**
   * Header's left content
   */
  headerLeftContent?: JSX.Element;
  /**
   * Header's right content
   */
  headerRightContent?: JSX.Element;
  /**
   * Whether the sidebar is open by default
   */
  sidebarOpen?: boolean;
  /**
   * Id for the header
   */
  headerId?: string;
  /**
   * Id for the burger button that opens and closes the sidebar
   */
  menuButtonId?: string;

  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;

  children: JSX.Element;
};

const Main = ({
  context,
  sidebar,
  sidebarOpen,
  headerId,
  menuButtonId,
  headerLeftContent,
  headerCenterContent,
  headerRightContent,
  handleDrawerOpen,
  handleDrawerClose,
  children,
}: Props): JSX.Element => {
  return (
    <StyledRoot>
      <Header
        context={context}
        hasSidebar={Boolean(sidebar)}
        isSidebarOpen={sidebarOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        leftContent={headerLeftContent}
        rightContent={headerRightContent}
        centerContent={headerCenterContent}
        id={headerId}
        menuButtonId={menuButtonId}
        // sx={sx}
      />

      {sidebar && <Sidebar isSidebarOpen={sidebarOpen}>{sidebar}</Sidebar>}

      <StyledMain open={sidebarOpen} fullScreen={true}>
        {children}
      </StyledMain>
    </StyledRoot>
  );
};

export default Main;
