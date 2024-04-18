import Collapse from './Collapse';

const withCollapse = <T extends { name: string; displayName?: string }>({
  item,
}: {
  item: T;
}) => {
  return (component: JSX.Element): JSX.Element => {
    return (
      <Collapse title={item.displayName ?? item.name}>{component}</Collapse>
    );
  };
};

export default withCollapse;
