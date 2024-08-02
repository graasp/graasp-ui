import Collapse from './Collapse';

const withCollapse = <T extends { name: string; displayName?: string }>({
  item,
  onCollapse,
}: {
  item: T;
  onCollapse?: () => void;
}) => {
  return (component: JSX.Element): JSX.Element => {
    return (
      <Collapse title={item.displayName ?? item.name} onCollapse={onCollapse}>
        {component}
      </Collapse>
    );
  };
};

export default withCollapse;
