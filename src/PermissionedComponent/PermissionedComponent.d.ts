import React from 'react';

export interface PermissionedComponentProps {
  component: React.ReactElement;
  checkPermissions: (e: unknown) => boolean;
}

declare const MenuItem: React.FC<PermissionedComponentProps>;
