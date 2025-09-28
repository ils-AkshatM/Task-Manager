import { useSelector } from 'react-redux';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    LinearProgress,
    Paper,
    useTheme,
    Fade,
} from '@mui/material';
import {
    Assignment,
    CheckCircle,
    Schedule,
    TrendingUp,
} from '@mui/icons-material';

const StatisticsCards = () => {
    const { projects } = useSelector((state) => state.projects);
    const { user } = useSelector((state) => state.auth);

    // Calculate statistics
    const userProjects = projects.filter(project => project.userId === user?.id || project.userId === 1);
    const allTasks = userProjects.flatMap(project => project.tasks);

    const totalProjects = userProjects.length;
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(task => task.status === 'Done').length;
    const inProgressTasks = allTasks.filter(task => task.status === 'In Progress').length;
    const todoTasks = allTasks.filter(task => task.status === 'Todo').length;

    const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    // Overdue tasks
    const overdueTasks = allTasks.filter(task =>
        task.dueDate &&
        new Date(task.dueDate) < new Date() &&
        task.status !== 'Done'
    ).length;

    const theme = useTheme();

    const stats = [
        {
            title: 'Total Projects',
            value: totalProjects,
            icon: <Assignment sx={{ color: theme.palette.primary.main, fontSize: { xs: 24, md: 28 } }} />,
            color: theme.palette.primary.main,
            bgColor: `${theme.palette.primary.main}15`,
        },
        {
            title: 'Completed Tasks',
            value: completedTasks,
            icon: <CheckCircle sx={{ color: theme.palette.success.main, fontSize: { xs: 24, md: 28 } }} />,
            color: theme.palette.success.main,
            bgColor: `${theme.palette.success.main}15`,
        },
        {
            title: 'In Progress',
            value: inProgressTasks,
            icon: <Schedule sx={{ color: theme.palette.warning.main, fontSize: { xs: 24, md: 28 } }} />,
            color: theme.palette.warning.main,
            bgColor: `${theme.palette.warning.main}15`,
        },
        {
            title: 'Completion Rate',
            value: `${completionRate.toFixed(1)}%`,
            icon: <TrendingUp sx={{ color: theme.palette.secondary.main, fontSize: { xs: 24, md: 28 } }} />,
            color: theme.palette.secondary.main,
            bgColor: `${theme.palette.secondary.main}15`,
        },
    ];

    return (
        <Box sx={{ mb: { xs: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ maxWidth: 1000, justifyContent: 'center' }}>
                {stats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Fade in={true} timeout={600 + (index * 100)}>
                            <Paper
                                elevation={2}
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[8],
                                    },
                                }}
                            >
                                <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ mb: stat.title === 'Completion Rate' ? 2 : 0 }}
                                    >
                                        <Box>
                                            <Typography
                                                variant="h4"
                                                component="div"
                                                sx={{
                                                    fontWeight: 700,
                                                    mb: 1,
                                                    fontSize: { xs: '1.75rem', md: '2rem' },
                                                    color: theme.palette.text.primary,
                                                }}
                                            >
                                                {stat.value}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                                sx={{
                                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {stat.title}
                                            </Typography>
                                        </Box>
                                        <Box
                                            sx={{
                                                width: { xs: 48, md: 56 },
                                                height: { xs: 48, md: 56 },
                                                borderRadius: 2,
                                                bgcolor: stat.bgColor,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {stat.icon}
                                        </Box>
                                    </Box>

                                    {stat.title === 'Completion Rate' && (
                                        <Box sx={{ mt: 2 }}>
                                            <LinearProgress
                                                variant="determinate"
                                                value={completionRate}
                                                sx={{
                                                    height: 8,
                                                    borderRadius: 4,
                                                    bgcolor: `${stat.color}20`,
                                                    '& .MuiLinearProgress-bar': {
                                                        borderRadius: 4,
                                                        bgcolor: stat.color,
                                                    },
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                sx={{ mt: 1, display: 'block', textAlign: 'center' }}
                                            >
                                                {completedTasks} of {totalTasks} tasks completed
                                            </Typography>
                                        </Box>
                                    )}
                                </CardContent>
                            </Paper>
                        </Fade>
                    </Grid>
                ))}
            </Grid>

            {/* Overdue Tasks Alert */}
            {overdueTasks > 0 && (
                <Box sx={{ mt: 3 }}>
                    <Fade in={true} timeout={1000}>
                        <Paper
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                borderLeft: `6px solid ${theme.palette.error.main}`,
                                bgcolor: `${theme.palette.error.main}08`,
                                border: `1px solid ${theme.palette.error.main}30`,
                            }}
                        >
                            <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: theme.palette.error.dark,
                                        fontWeight: 600,
                                        mb: 1,
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                    }}
                                >
                                    ⚠️ {overdueTasks} Overdue Task{overdueTasks > 1 ? 's' : ''}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                                >
                                    You have tasks that are past their due date. Please review and update them.
                                </Typography>
                            </CardContent>
                        </Paper>
                    </Fade>
                </Box>
            )}
        </Box>
    );
};

export default StatisticsCards;