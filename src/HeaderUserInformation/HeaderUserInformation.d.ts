import React from 'react';

interface HeaderUserInformationProps {
  id: UUID;
  username: string;
  avatar: string;
  isLoading?: boolean;
  onClick?: (e: MouseEvent) => void;
  noUsernameMessage?: string;
}

declare const HeaderUserInformation: React.FC<HeaderUserInformationProps>;
