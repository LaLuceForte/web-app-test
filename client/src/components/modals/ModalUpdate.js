import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import menuItems from '../../data/menuItems.json'

// компонент для модального окна, которое нужно для обновления пользователем существующей записи
const ModalUpdate = ({ isOpen, onClose }) => {
    const [selectedId, setSelectedId] = useState('');
    const [updatedDetails, setUpdatedDetails] = useState({
        title: '',
        published_date: '',
        price: '',
        customer_id: ''
    });

    const [bookIds, setBookIds] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const fetchBookIds = async () => {
            try {
                const response = await axios.get('/api/books');
                const ids = response.data.map(book => book.id);
                setBookIds(ids);
            } catch (error) {
                console.error('Error fetching book IDs:', error);
            }
        };

        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers');
                const options = response.data.map(customer => ({
                    value: customer.id,
                    label: `${customer.name} (ID: ${customer.id})`
                }));
                setCustomerOptions(options);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchBookIds();
        fetchCustomers();
    }, []);

    useEffect(() => {
        setIsButtonDisabled(selectedId === '' || Object.values(updatedDetails).some(value => value === ''));
    }, [selectedId, updatedDetails]);

    const handleOk = async () => {
        try {
            const customerId = parseInt(updatedDetails.customer_id);
            const url = `/api/books/${selectedId}`;
            await axios.put(url, { ...updatedDetails, customer_id: customerId });
            window.location.reload();
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const handleChange = (event) => {
        setSelectedId(event.target.value);
    };

    const handleInputChange = (name, value) => {
        setUpdatedDetails({ ...updatedDetails, [name]: value });
    };

    const getMenuItems = (id) => {
        const menuItem = menuItems.find(item => item.id === id);
        return menuItem ? menuItem.options : [];
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-update-title"
            aria-describedby="modal-update-description"
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white', boxShadow: 24, p: 4 }}>
                <Typography id="modal-update-title" variant="h6" component="h2" gutterBottom>
                    Update Book Details
                </Typography>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="book-id-label">Select Book ID</InputLabel>
                    <Select
                        labelId="book-id-label"
                        id="book-id-select"
                        value={selectedId}
                        label="Select Book ID"
                        onChange={handleChange}
                    >
                        {bookIds.map((id) => (
                            <MenuItem key={id} value={id}>
                                {id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal" disabled={!selectedId}>
                    <InputLabel id="title-label">Title</InputLabel>
                    <Select
                        labelId="title-label"
                        id="title-select"
                        value={updatedDetails.title}
                        label="Title"
                        onChange={(e) => handleInputChange('title', e.target.value)}
                    >
                        {getMenuItems('title').map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal" disabled={!selectedId}>
                    <InputLabel id="published-date-label">Published Date</InputLabel>
                    <Select
                        labelId="published-date-label"
                        id="published-date-select"
                        value={updatedDetails.published_date}
                        label="Published Date"
                        onChange={(e) => handleInputChange('published_date', e.target.value)}
                    >
                        {getMenuItems('published_date').map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal" disabled={!selectedId}>
                    <InputLabel id="price-label">Price</InputLabel>
                    <Select
                        labelId="price-label"
                        id="price-select"
                        value={updatedDetails.price}
                        label="Price"
                        onChange={(e) => handleInputChange('price', e.target.value)}
                    >
                        {getMenuItems('price').map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth variant="outlined" margin="normal" disabled={!selectedId}>
                    <InputLabel id="customer-id-label">Customer ID</InputLabel>
                    <Select
                        labelId="customer-id-label"
                        id="customer-id-select"
                        value={updatedDetails.customer_id}
                        label="Customer ID"
                        onChange={(e) => handleInputChange('customer_id', e.target.value)}
                    >
                        {customerOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleOk} disabled={isButtonDisabled}>
                        Update Book
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalUpdate;
