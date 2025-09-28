import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Button,
    Paper,
    useTheme,
} from '@mui/material';
import {
    MoreVert,
    Edit,
    Delete,
    CalendarToday,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateTask, deleteTask } from '../../store/slices/projectSlice';

const TaskCard = ({ task }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: task.title,
        status: task.status,
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
    });

    const theme = useTheme();

    const getStatusColor = (status) => {
        switch (status) {
            case 'Done':
                return {
                    color: theme.palette.success.main,
                    bgcolor: `${theme.palette.success.main}15`,
                };
            case 'In Progress':
                return {
                    color: theme.palette.warning.main,
                    bgcolor: `${theme.palette.warning.main}15`,
                };
            case 'Todo':
                return {
                    color: theme.palette.text.secondary,
                    bgcolor: `${theme.palette.grey[500]}15`,
                };
            default:
                return 'default';
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setEditDialogOpen(true);
        handleMenuClose();
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        handleMenuClose();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTask({
            taskId: task.id,
            updates: {
                ...formData,
                dueDate: formData.dueDate ? formData.dueDate.toISOString().split('T')[0] : null,
            },
        }));
        setEditDialogOpen(false);
    };

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

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Done';

    return (
        <>
            <Paper
                elevation={1}
                sx={{
                    height: '100%',
                    borderRadius: 2,
                    borderLeft: isOverdue ? `4px solid ${theme.palette.error.main}` : 'none',
                    bgcolor: isOverdue ? `${theme.palette.error.main}05` : 'background.paper',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        boxShadow: theme.shadows[4],
                        transform: 'translateY(-2px)',
                    },
                }}
            >
                <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                        <Typography
                            variant="subtitle1"
                            component="h3"
                            sx={{
                                flexGrow: 1,
                                pr: 1,
                                fontWeight: 600,
                                fontSize: { xs: '0.95rem', md: '1.1rem' },
                                color: theme.palette.text.primary,
                                lineHeight: 1.4,
                            }}
                        >
                            {task.title}
                        </Typography>
                        <IconButton
                            size="small"
                            onClick={handleMenuOpen}
                            sx={{
                                color: theme.palette.text.secondary,
                                '&:hover': {
                                    bgcolor: theme.palette.action.hover,
                                },
                            }}
                        >
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Chip
                            label={task.status}
                            size="small"
                            sx={{
                                ...getStatusColor(task.status),
                                fontWeight: 500,
                                fontSize: '0.75rem',
                                alignSelf: 'flex-start',
                            }}
                        />

                        {task.dueDate && (
                            <Box
                                display="flex"
                                alignItems="center"
                                sx={{ color: theme.palette.text.secondary }}
                            >
                                <CalendarToday
                                    fontSize="small"
                                    sx={{
                                        mr: 1,
                                        fontSize: '1rem',
                                        color: isOverdue ? theme.palette.error.main : 'inherit',
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: '0.8rem',
                                        color: isOverdue ? theme.palette.error.main : 'text.secondary',
                                    }}
                                >
                                    Due: {new Date(task.dueDate).toLocaleDateString()}
                                    {isOverdue && (
                                        <Box
                                            component="span"
                                            sx={{
                                                color: theme.palette.error.main,
                                                fontWeight: 600,
                                                ml: 0.5
                                            }}
                                        >
                                            (Overdue)
                                        </Box>
                                    )}
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: theme.shadows[8],
                        minWidth: 150,
                    },
                }}
            >
                <MenuItem
                    onClick={handleEdit}
                    sx={{
                        py: 1.5,
                        fontSize: '0.9rem',
                        '&:hover': {
                            bgcolor: theme.palette.action.hover,
                        },
                    }}
                >
                    <Edit fontSize="small" sx={{ mr: 1.5 }} />
                    Edit
                </MenuItem>
                <MenuItem
                    onClick={handleDelete}
                    sx={{
                        py: 1.5,
                        fontSize: '0.9rem',
                        color: theme.palette.error.main,
                        '&:hover': {
                            bgcolor: `${theme.palette.error.main}10`,
                        },
                    }}
                >
                    <Delete fontSize="small" sx={{ mr: 1.5 }} />
                    Delete
                </MenuItem>
            </Menu>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                    <DialogTitle>Edit Task</DialogTitle>
                    <Box component="form" onSubmit={handleEditSubmit}>
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
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        sx: { mb: 2 }
                                    }
                                }}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" variant="contained">
                                Update Task
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </LocalizationProvider>
        </>
    );
};

export default TaskCard;