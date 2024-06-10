import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import menuItems from '../../data/menuItems.json'

// компонент для модального окна, которое нужно для добавления пользователем новой записи
const ModalAdd = ({ isOpen, onClose, customers }) => {
    const initialSelectedData= {
        title: '',
        published_date: '',
        price: '',
        customer_id: '',
    }; 

    const [selectedData, setSelectedData] = useState(initialSelectedData);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        // убедимся, что пользователь выбрал все необходимые значения для добавления записи
        const isAllFieldsFilled = Object.values(selectedData).every((value) => value !== '');
        setIsButtonDisabled(!isAllFieldsFilled);
    }, [selectedData]);

    const handleAddBook = async () => {
        try {
            await axios.post('/api/books', selectedData);
            window.location.reload();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const handleInputChange = (name, value) => {
        setSelectedData({
            ...selectedData,
            [name]: value,
        });
    };


    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="add-book-modal-title"
            aria-describedby="add-book-modal-description"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="add-book-modal-title" variant="h6" component="h2" gutterBottom>
                    Add New Book
                </Typography>
                {menuItems.map((item) => (
                    <FormControl fullWidth variant="outlined" margin="normal" key={item.id}>
                        <InputLabel id={`${item.id}-label`}>{item.label}</InputLabel>
                        <Select
                            labelId={`${item.id}-label`}
                            id={item.id}
                            value={selectedData[item.id]}
                            onChange={(e) => handleInputChange(item.id, e.target.value)}
                            label={item.label}
                        >
                            {item.options.map((option, index) => (
                                <MenuItem key={index} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                ))}
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="customer-id-label">Customer ID</InputLabel>
                    <Select
                        labelId="customer-id-label"
                        id="customer-id"
                        value={selectedData.customer_id}
                        onChange={(e) => handleInputChange('customer_id', e.target.value)}
                        label="Customer ID"
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer.id} value={customer.id}>
                                {customer.name} (ID: {customer.id})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleAddBook} disabled={isButtonDisabled}>
                        Add Book
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalAdd;
 