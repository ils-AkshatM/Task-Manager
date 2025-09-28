import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addTask } from '../../store/slices/projectSlice';

const AddTaskDialog = ({ open, onClose, projectId }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        status: 'Todo',
        dueDate: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            dueDate: date,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim()) {
            dispatch(addTask({
                projectId,
                task: {
                    ...formData,
                    dueDate: formData.dueDate ? formData.dueDate.toISOString().split('T')[0] : null,
                },
            }));
            setFormData({ title: '', status: 'Todo', dueDate: null });
            onClose();
        }
    };

    const handleClose = () => {
        setFormData({ title: '', status: 'Todo', dueDate: null });
        onClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Task</DialogTitle>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="title"
                            label="Task Title"
                            fullWidth
                            variant="outlined"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            sx={{ mb: 2 }}
                        />

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="status"
                                value={formData.status}
                                label="Status"
                                onChange={handleChange}
                            >
                                <MenuItem value="Todo">Todo</MenuItem>
                                <MenuItem value="In Progress">In Progress</MenuItem>
                                <MenuItem value="Done">Done</MenuItem>
                            </Select>
                        </FormControl>

                        <DatePicker
                            label="Due Date (Optional)"
                            value={formData.dueDate}
                            onChange={handleDateChange}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth sx={{ mb: 2 }} />
                            )}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    sx: { mb: 2 }
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Add Task
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </LocalizationProvider>
    );
};

export default AddTaskDialog;