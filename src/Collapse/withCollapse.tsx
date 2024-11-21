import Collapse from './Collapse.js';

const withCollapse = <T extends { name: string }>({
  item,
  onCollapse,
}: {
  item: T;
  onCollapse?: (c: boolean) => void;
}) => {
  return (component: JSX.Element): JSX.Element => {
    return (
      <Collapse title={item.name} onCollapse={onCollapse}>
        {component}
      </Collapse>
    );
  };
};

export default withCollapse;
