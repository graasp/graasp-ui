import { Map } from 'immutable';

interface DocumentItemProps {
  item: Map;
  id?: string;
  edit?: boolean;
  saveButtonId?: string;
  saveButtonText?: string;
}

declare const Header: React.FC<DocumentItemProps>;
