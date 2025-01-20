import * as React from 'react';
import Button from '@mui/material/Button';

interface MyButtonProps {
  buttonName: string;
  onClick?: () => void;
}

export default function Mybutton({ buttonName, onClick }: MyButtonProps) {
  return (
    <Button variant="contained"   sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}    onClick={onClick}>
      {buttonName}
    </Button>
  );
}
