import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';
import { styled } from '@mui/system';
import DataTable from './DataTable';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

// определим наименования столбцов таблицы книг
const columnDefsBooks = [
  { headerName: 'ID', field: 'id' },
  { headerName: 'Title', field: 'title' },
  { headerName: 'Published Date', field: 'published_date' },
  { headerName: 'Price', field: 'price' },
  { headerName: 'Customer ID', field: 'customer_id'}
];
 
// определим наименования столбцов таблицы покупателей
const columnDefsCustomers = [
  { headerName: 'ID', field: 'id' },
  { headerName: 'Name', field: 'name' },
  { headerName: 'Age', field: 'age' },
  { headerName: 'Join Date', field: 'join_date' },
  { headerName: 'Balance', field: 'balance' }
]

// компонент для отображения таблицы книг и покупателей
const Dashboard = () => {
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" component="h2" gutterBottom>
              Books
            </Typography>
            <DataTable api="/api/books" columnsDefs={columnDefsBooks} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" component="h2" gutterBottom>
              Customers
            </Typography>
            <DataTable api="/api/customers" columnsDefs={columnDefsCustomers} />
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Dashboard;
