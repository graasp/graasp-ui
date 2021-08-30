import React, { FC } from 'react';

export interface PermissionedComponentProps {
  component: React.ReactElement;
  checkPermissions: () => boolean;
}

const PermissionedComponent: FC<PermissionedComponentProps> = ({
  component,
  checkPermissions,
}) => {
  if (checkPermissions()) {
    return component;
  }

  return null;
};

export default PermissionedComponent;
