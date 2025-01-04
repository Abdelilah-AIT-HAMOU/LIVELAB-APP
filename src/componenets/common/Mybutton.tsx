import * as React from 'react';
import Button from '@mui/material/Button';

interface MyButtonProps {
  buttonName: string;
  onClick?: () => void;
}

export default function Mybutton({ buttonName, onClick }: MyButtonProps) {
  return (
    <Button variant="contained"  color="primary" onClick={onClick}>
      {buttonName}
    </Button>
  );
}
