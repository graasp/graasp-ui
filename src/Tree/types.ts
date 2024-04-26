export type NavigationElement = {
  id: string;
  name: string;
  // important to compute if an element should be disabled
  path: string;
  icon?: JSX.Element;
};
