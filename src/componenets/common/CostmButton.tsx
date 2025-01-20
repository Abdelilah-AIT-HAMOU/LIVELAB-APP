/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
**
*/

import * as React from 'react';
import Button from '@mui/material/Button';

interface CostmButtonttonProps {
  buttonName: string;
  onClick?: () => void;
}

export default function CostmButton({ buttonName, onClick }: CostmButtonttonProps) {
  return (
    <Button variant="contained"        sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}    onClick={onClick}>
      {buttonName}
    </Button>
  );
}
