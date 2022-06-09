import React, { FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material';

const StyledDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

interface TreeItemLabelProps {
  name: string;
  className?: string;
  showCheckbox?: boolean;
  checked?: boolean;
}

const TreeItemLabel: FC<TreeItemLabelProps> = ({
  showCheckbox = false,
  checked = false,
  className,
  name,
}) => {
  if (showCheckbox) {
    return (
      <StyledDiv>
        <Checkbox
          checked={checked}
          color='primary'
          size='small'
          className={className}
        />
        {name}
      </StyledDiv>
    );
  }

  return <React.Fragment>{name}</React.Fragment>;
};

export default TreeItemLabel;
