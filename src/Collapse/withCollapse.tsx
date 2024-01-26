import Collapse from './Collapse';

const withCollapse = <T extends { name: string }>({ item }: { item: T }) => {
  return (component: JSX.Element): JSX.Element => {
    return <Collapse title={item.name}>{component}</Collapse>;
  };
};

export default withCollapse;
