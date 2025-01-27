import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-columnHeader': {
      backgroundColor: theme.palette.grey[400],  // Light Gray
      color: theme.palette.getContrastText(theme.palette.grey[500]), 
    },
  }));