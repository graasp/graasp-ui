import React from 'react';

const PermissionedComponent = ({ component, checkPermissions }) => {
  if (checkPermissions()) {
    return component;
  }

  return null;
};

export default PermissionedComponent;
