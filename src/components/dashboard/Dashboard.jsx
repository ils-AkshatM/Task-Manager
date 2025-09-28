import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Button,
    Grid,
    Box,
    Fab,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import Navbar from './Navbar';
import ProjectCard from './ProjectCard';
import AddProjectDialog from './AddProjectDialog';
import StatisticsCards from './StatisticsCards';

const Dashboard = () => {
    const { projects } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);
    const [addProjectOpen, setAddProjectOpen] = useState(false);
    const userProjects = projects.filter(project => project.userId === user?.id || project.userId === 1);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <Container maxWidth="xl" className="py-8">
                <Box className="mb-8">
                    <Typography variant="h4" component="h1" className="mb-2">
                        Dashboard
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Manage your projects and track your tasks
                    </Typography>
                </Box>

                <StatisticsCards />

                {userProjects.length === 0 ? (
                    <Box className="text-center py-12">
                        <Typography variant="h6" className="mb-4">
                            No projects yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="mb-6">
                            Create your first project to get started with task management
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => setAddProjectOpen(true)}
                            size="large"
                        >
                            Create Your First Project
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box className="mb-6 flex justify-between items-center">
                            <Typography variant="h5" component="h2">
                                Your Projects ({userProjects.length})
                            </Typography>
                            <Button
                                variant="contained"
                                startIcon={<Add />}
                                onClick={() => setAddProjectOpen(true)}
                            >
                                Add Project
                            </Button>
                        </Box>

                        <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
                            {userProjects.map((project) => (
                                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={project.id}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
                <Fab
                    color="primary"
                    aria-label="add project"
                    className="fixed bottom-6 right-6 md:hidden"
                    onClick={() => setAddProjectOpen(true)}
                >
                    <Add />
                </Fab>
            </Container>            <AddProjectDialog
                open={addProjectOpen}
                onClose={() => setAddProjectOpen(false)}
            />
        </div>
    );
};

export default Dashboard;