export type NavigationElement = {
  id: string;
  name: string;
  // important to have to compute if an element should be disabled
  path: string;
  icon?: JSX.Element;
};
