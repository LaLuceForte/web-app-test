import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import DataTable from './DataTable';
import axios from 'axios';
import ModalDelete from './modals/ModalDelete';
import ModalAdd from './modals/ModalAdd';
import ModalUpdate from './modals/ModalUpdate';

// определим наименования столбцов для объединенной таблицы
const columnDefsJoined = [
    { headerName: 'Book ID', field: 'book_id' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Published Date', field: 'published_date' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Customer ID', field: 'customer_id' },
    { headerName: 'Customer Name', field: 'name' },
    { headerName: 'Customer Age', field: 'age' },
    { headerName: 'Customer Join Date', field: 'join_date' },
    { headerName: 'Customer Balance', field: 'balance' },
];

// компонент для отображения объединенных таблиц покупателей и книг, учитывая связь этих двух табли по внешнему ключу
const JoinedTable = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [customers, setCustomers] = useState([]);

    const fetchData = async () => {
        try {
            const customersResponse = await axios.get('/api/customers');
            setCustomers(customersResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = () => {
        setIsDeleteModalOpen(true);
    };

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleChange = () => {
        setIsUpdateModalOpen(true);
    };

    const handleModalClose = () => {
        setIsDeleteModalOpen(false);
        setIsAddModalOpen(false);
        setIsUpdateModalOpen(false);
    };

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Joined Table
            </Typography>
            <Grid container spacing={1} alignItems="center" sx={{ marginBottom: 2 }}>
                <Grid item>
                    <Button variant="contained" onClick={handleAdd} color="primary" sx={{ mr: 1 }}>
                        Add
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleChange} color="primary" sx={{ mr: 1 }}>
                        Change
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleDelete} sx={{ mr: 1 }}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
            <DataTable api="/api/books/joined" columnsDefs={columnDefsJoined} headerVariant="h6" />
            <ModalDelete isOpen={isDeleteModalOpen} onClose={handleModalClose} />
            <ModalAdd isOpen={isAddModalOpen} onClose={handleModalClose} customers={customers} />
            <ModalUpdate isOpen={isUpdateModalOpen} onClose={handleModalClose}/>
        </div>
    );
};

export default JoinedTable;
