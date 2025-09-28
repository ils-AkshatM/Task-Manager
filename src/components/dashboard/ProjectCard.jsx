import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
    Chip,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import {
    Add,
    MoreVert,
    Edit,
    Delete,
} from '@mui/icons-material';
import TaskCard from './TaskCard';
import AddTaskDialog from './AddTaskDialog';
import { updateProject, deleteProject } from '../../store/slices/projectSlice';

const ProjectCard = ({ project }) => {
    const dispatch = useDispatch();
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [showAllTasks, setShowAllTasks] = useState(false);
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
    });

    const todoTasks = project.tasks.filter(task => task.status === 'Todo');
    const inProgressTasks = project.tasks.filter(task => task.status === 'In Progress');
    const doneTasks = project.tasks.filter(task => task.status === 'Done');

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
        dispatch(deleteProject(project.id));
        handleMenuClose();
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProject({
            id: project.id,
            ...formData,
        }));
        setEditDialogOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <Card className="h-full">
                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" className="mb-4">
                        <Box>
                            <Typography variant="h5" component="h2" className="mb-2">
                                {project.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className="mb-3">
                                {project.description}
                            </Typography>
                        </Box>
                        <IconButton size="small" onClick={handleMenuOpen}>
                            <MoreVert />
                        </IconButton>
                    </Box>

                    <Box className="mb-4">
                        <Box display="flex" gap={2} className="mb-3">
                            <Chip
                                label={`Todo: ${todoTasks.length}`}
                                size="small"
                                color="default"
                            />
                            <Chip
                                label={`In Progress: ${inProgressTasks.length}`}
                                size="small"
                                color="primary"
                            />
                            <Chip
                                label={`Done: ${doneTasks.length}`}
                                size="small"
                                color="success"
                            />
                        </Box>

                        {project.tasks.length > 0 ? (
                            <Box>
                                <Typography variant="h6" className="mb-2">
                                    Tasks ({project.tasks.length})
                                </Typography>
                                <Grid container spacing={2}>
                                    {(showAllTasks ? project.tasks : project.tasks.slice(0, 3)).map((task) => (
                                        <Grid item xs={12} key={task.id}>
                                            <TaskCard task={task} />
                                        </Grid>
                                    ))}
                                </Grid>
                                {project.tasks.length > 3 && (
                                    <Box className="mt-2 text-center">
                                        <Button
                                            size="small"
                                            onClick={() => setShowAllTasks(!showAllTasks)}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {showAllTasks
                                                ? 'Show Less'
                                                : `Show ${project.tasks.length - 3} More Tasks`
                                            }
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Typography variant="body2" color="text.secondary" className="text-center py-4">
                                No tasks yet. Add your first task!
                            </Typography>
                        )}
                    </Box>
                </CardContent>

                <CardActions>
                    <Button
                        startIcon={<Add />}
                        onClick={() => setAddTaskOpen(true)}
                        variant="contained"
                        fullWidth
                    >
                        Add Task
                    </Button>
                </CardActions>
            </Card>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEdit}>
                    <Edit fontSize="small" className="mr-2" />
                    Edit Project
                </MenuItem>
                <MenuItem onClick={handleDelete} className="text-red-600">
                    <Delete fontSize="small" className="mr-2" />
                    Delete Project
                </MenuItem>
            </Menu>

            <AddTaskDialog
                open={addTaskOpen}
                onClose={() => setAddTaskOpen(false)}
                projectId={project.id}
            />

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Project</DialogTitle>
                <Box component="form" onSubmit={handleEditSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="name"
                            label="Project Name"
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            name="description"
                            label="Description"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">
                            Update Project
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    );
};

export default ProjectCard;