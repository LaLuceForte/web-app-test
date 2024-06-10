import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

// компонент для модального окна, которое нужно для удаления пользователем существующей записи
const ModalDelete = ({ isOpen, onClose }) => {
    const [idToDelete, setIdToDelete] = useState('');
    const [bookIds, setBookIds] = useState([]);
    // state для определения, выбран ли id книги из списка для активизации кнопки ok 
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

        fetchBookIds();
    }, []);


    useEffect(() => {
        setIsButtonDisabled(idToDelete === '');
    }, [idToDelete]);

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/api/books/${idToDelete}`);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="delete-modal-title"
            aria-describedby="delete-modal-description"
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
                <Typography id="delete-modal-title" variant="h6" component="h2" gutterBottom>
                    Select ID to Delete
                </Typography>
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="delete-id-label">ID</InputLabel>
                    <Select
                        labelId="delete-id-label"
                        id="delete-id"
                        value={idToDelete}
                        onChange={(e) => setIdToDelete(e.target.value)}
                        label="ID"
                    >
                        {bookIds.map((id) => (
                            <MenuItem key={id} value={id}>
                                {id}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleConfirmDelete} disabled={isButtonDisabled}>
                        Delete Book
                    </Button>
                    <Button variant="contained" onClick={onClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}; 

export default ModalDelete;
 