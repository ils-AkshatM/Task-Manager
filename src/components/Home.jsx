import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Container,
    Typography,
    Button,
    Box,
    Paper,
    Grid,
    Card,
    CardContent,
    Fade,
    Avatar,
    useTheme,
    alpha,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    Assignment,
    CheckCircle,
    Schedule,
    TrendingUp,
    Security,
    Devices,
    Speed,
    ArrowForward,
    Login as LoginIcon,
    PersonAdd,
} from '@mui/icons-material';

const Home = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        setMounted(true);
    }, []);

    const features = [
        {
            icon: <Assignment className="text-blue-600" />,
            title: 'Project Management',
            description: 'Create and manage multiple projects with ease',
            color: 'bg-blue-50',
        },
        {
            icon: <CheckCircle className="text-green-600" />,
            title: 'Task Tracking',
            description: 'Track task progress from Todo to completion',
            color: 'bg-green-50',
        },
        {
            icon: <Schedule className="text-orange-600" />,
            title: 'Due Date Management',
            description: 'Never miss deadlines with smart due date tracking',
            color: 'bg-orange-50',
        },
        {
            icon: <TrendingUp className="text-purple-600" />,
            title: 'Progress Analytics',
            description: 'Visualize your productivity with detailed statistics',
            color: 'bg-purple-50',
        },
        {
            icon: <Security className="text-indigo-600" />,
            title: 'Secure Authentication',
            description: 'Your data is protected with secure user authentication',
            color: 'bg-indigo-50',
        },
        {
            icon: <Devices className="text-pink-600" />,
            title: 'Responsive Design',
            description: 'Works seamlessly on desktop, tablet, and mobile devices',
            color: 'bg-pink-50',
        },
    ];

    const stats = [
        { number: '100%', label: 'Responsive', icon: <Devices /> },
        { number: '24/7', label: 'Available', icon: <Schedule /> },
        { number: 'Free', label: 'To Use', icon: <CheckCircle /> },
        { number: 'Fast', label: 'Performance', icon: <Speed /> },
    ];

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            {/* Hero Section */}
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 8 }, textAlign: 'center', width: '100%', maxWidth: 900 }}>
                    <Fade in={mounted} timeout={800}>
                        <Box>
                            <Avatar
                                sx={{
                                    width: { xs: 64, md: 80 },
                                    height: { xs: 64, md: 80 },
                                    mx: 'auto',
                                    mb: { xs: 2, md: 3 },
                                    bgcolor: theme.palette.primary.main,
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                }}
                            >
                                <DashboardIcon fontSize="large" />
                            </Avatar>

                            <Typography
                                variant="h2"
                                component="h1"
                                sx={{
                                    fontWeight: 700,
                                    color: theme.palette.text.primary,
                                    mb: { xs: 1.5, md: 2 },
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                                    lineHeight: { xs: 1.2, md: 1.1 },
                                }}
                            >
                                Task Manager
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: { xs: 2, md: 3 },
                                    fontWeight: 400,
                                    fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
                                    px: { xs: 2, md: 0 },
                                }}
                            >
                                Organize • Track • Achieve
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    mb: { xs: 3, md: 4 },
                                    maxWidth: { xs: '90%', sm: 600 },
                                    mx: 'auto',
                                    fontSize: { xs: '1rem', md: '1.1rem' },
                                    lineHeight: 1.6,
                                    px: { xs: 1, sm: 2, md: 0 },
                                }}
                            >
                                A modern, intuitive task management dashboard built with React, Redux, and Material-UI.
                                Streamline your workflow and boost productivity with our comprehensive project management solution.
                            </Typography>

                            <Box sx={{
                                display: 'flex',
                                gap: { xs: 1.5, md: 2 },
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                px: { xs: 2, md: 0 },
                                mt: { xs: 2, md: 0 }
                            }}>
                                <Button
                                    variant="contained"
                                    size={window.innerWidth < 600 ? "medium" : "large"}
                                    component={Link}
                                    to="/login"
                                    startIcon={<LoginIcon />}
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        py: { xs: 1.2, md: 1.5 },
                                        px: { xs: 3, md: 4 },
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        borderRadius: 2,
                                        boxShadow: theme.shadows[4],
                                        minWidth: { xs: '140px', md: '160px' },
                                        '&:hover': {
                                            boxShadow: theme.shadows[8],
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Get Started
                                </Button>

                                <Button
                                    variant="outlined"
                                    size={window.innerWidth < 600 ? "medium" : "large"}
                                    component={Link}
                                    to="/register"
                                    startIcon={<PersonAdd />}
                                    sx={{
                                        py: { xs: 1.2, md: 1.5 },
                                        px: { xs: 3, md: 4 },
                                        fontSize: { xs: '1rem', md: '1.1rem' },
                                        borderRadius: 2,
                                        borderWidth: 2,
                                        minWidth: { xs: '140px', md: '160px' },
                                        '&:hover': {
                                            borderWidth: 2,
                                            transform: 'translateY(-2px)',
                                        },
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    Create Account
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Box>

                {/* Stats Section */}
                <Box sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, md: 0 }, display: 'flex', justifyContent: 'center' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 800, justifyContent: 'center' }}>
                        {stats.map((stat, index) => (
                            <Grid item xs={6} sm={3} key={index}>
                                <Paper
                                    elevation={2}
                                    sx={{
                                        p: { xs: 2, md: 3 },
                                        textAlign: 'center',
                                        borderRadius: 2,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: theme.shadows[8],
                                        },
                                    }}
                                >
                                    <Box sx={{ color: theme.palette.primary.main, mb: { xs: 0.5, md: 1 } }}>
                                        {stat.icon}
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 700, mb: { xs: 0.5, md: 1 }, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                                        {stat.number}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Features Section */}
                <Box sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, md: 0 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Fade in={mounted} timeout={1200}>
                        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 }, px: { xs: 2, md: 0 } }}>
                            <Typography variant="h3" sx={{ fontWeight: 600, mb: { xs: 1.5, md: 2 }, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' } }}>
                                Why Choose Task Manager?
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 600, mx: 'auto' }}>
                                Powerful features designed to enhance your productivity
                            </Typography>
                        </Box>
                    </Fade>

                    <Grid container spacing={{ xs: 3, md: 4 }} sx={{ maxWidth: 1200, justifyContent: 'center' }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} sm={6} lg={4} key={index}>
                                <Card
                                    elevation={2}
                                    sx={{
                                        height: '100%',
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: theme.shadows[12],
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 2.5, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box
                                            sx={{
                                                width: { xs: 48, md: 56 },
                                                height: { xs: 48, md: 56 },
                                                borderRadius: 2,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mb: { xs: 1.5, md: 2 },
                                                mx: { xs: 'auto', md: 0 },
                                            }}
                                            className={feature.color}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: { xs: 1, md: 1.5 }, fontSize: { xs: '1.1rem', md: '1.25rem' }, textAlign: { xs: 'center', md: 'left' } }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, fontSize: { xs: '0.875rem', md: '1rem' }, textAlign: { xs: 'center', md: 'left' }, flexGrow: 1 }}>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* CTA Section */}
                <Fade in={mounted} timeout={1600}>
                    <Box sx={{ textAlign: 'center', pb: { xs: 6, md: 8 }, px: { xs: 2, md: 0 } }}>
                        <Typography variant="h4" sx={{ fontWeight: 600, mb: { xs: 1.5, md: 2 }, fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.125rem' } }}>
                            Ready to Get Organized?
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 3, md: 4 }, fontSize: { xs: '1rem', md: '1.1rem' }, maxWidth: 500, mx: 'auto', px: { xs: 1, md: 0 } }}>
                            Join thousands of users who have improved their productivity with Task Manager
                        </Typography>

                        <Button
                            variant="contained"
                            size="large"
                            component={Link}
                            to="/register"
                            sx={{
                                py: { xs: 1.5, md: 2 },
                                px: { xs: 4, md: 6 },
                                fontSize: { xs: '1rem', md: '1.2rem' },
                                borderRadius: 3,
                                boxShadow: theme.shadows[6],
                                minWidth: { xs: '200px', md: '280px' },
                                '&:hover': {
                                    boxShadow: theme.shadows[12],
                                    transform: 'translateY(-3px)',
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            Start Managing Tasks Today
                        </Button>
                    </Box>
                </Fade>
            </Container>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: alpha(theme.palette.grey[900], 0.05),
                    borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    mt: 'auto',
                }}
            >
                <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 }, px: { xs: 2, md: 3 } }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' }, lineHeight: 1.5, px: { xs: 1, md: 0 } }}>
                            © 2025 Task Manager. Built for demonstration purposes with React, Redux & Material-UI.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Home;