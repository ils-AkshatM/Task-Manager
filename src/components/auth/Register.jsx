import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
    IconButton,
    InputAdornment,
    Fade,
    Slide,
    Avatar,
    useTheme,
    alpha,
    LinearProgress,
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    PersonAdd,
    Email,
    Lock,
    Person,
    CheckCircle,
    Cancel,
} from '@mui/icons-material';
import { registerUser, clearError } from '../../store/slices/authSlice';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);
    useEffect(() => {
        setMounted(true);
    }, []);

    const calculatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
        return strength;
    };

    const getPasswordStrengthColor = (strength) => {
        if (strength <= 25) return 'error';
        if (strength <= 50) return 'warning';
        if (strength <= 75) return 'info';
        return 'success';
    };

    const getPasswordStrengthText = (strength) => {
        if (strength <= 25) return 'Weak';
        if (strength <= 50) return 'Fair';
        if (strength <= 75) return 'Good';
        return 'Strong';
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        if (name === 'password') {
            setPasswordStrength(calculatePasswordStrength(value));
        }
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: '',
            }));
        }

        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }
        const { confirmPassword, ...userData } = formData;
        dispatch(registerUser(userData));
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const getPasswordMatchIcon = () => {
        if (!formData.password || !formData.confirmPassword) return null;
        if (formData.password === formData.confirmPassword) {
            return <CheckCircle color="success" />;
        }
        return <Cancel color="error" />;
    };

    return (
        <Container component="main" maxWidth="sm">
            <Slide direction="up" in={mounted} timeout={800}>
                <Box
                    sx={{
                        marginTop: { xs: 4, md: 8 },
                        marginBottom: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Paper
                        elevation={12}
                        sx={{
                            p: { xs: 3, md: 4 },
                            width: '100%',
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.02)} 0%, ${alpha(theme.palette.secondary.light, 0.02)} 100%)`,
                            backdropFilter: 'blur(10px)',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '4px',
                                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            }
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            <Avatar
                                sx={{
                                    mx: 'auto',
                                    mb: 2,
                                    bgcolor: 'primary.main',
                                    width: 64,
                                    height: 64,
                                    boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
                                }}
                            >
                                <PersonAdd sx={{ fontSize: 32 }} />
                            </Avatar>
                            <Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1
                                }}
                            >
                                Create Account
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ fontWeight: 500 }}
                            >
                                Join us today and get started
                            </Typography>
                        </Box>
                        <Fade in={!!error}>
                            <div>
                                {error && (
                                    <Alert
                                        severity="error"
                                        sx={{
                                            mb: 3,
                                            borderRadius: 2,
                                            '& .MuiAlert-icon': {
                                                alignItems: 'center'
                                            }
                                        }}
                                        onClose={() => dispatch(clearError())}
                                    >
                                        {error}
                                    </Alert>
                                )}
                            </div>
                        </Fade>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                value={formData.name}
                                onChange={handleChange}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        },
                                        '&.Mui-focused': {
                                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                                        }
                                    }
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                error={!!formErrors.email}
                                helperText={formErrors.email}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Email color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        },
                                        '&.Mui-focused': {
                                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                                        }
                                    }
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                value={formData.password}
                                onChange={handleChange}
                                error={!!formErrors.password}
                                helperText={formErrors.password}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePassword}
                                                edge="end"
                                                size="small"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        },
                                        '&.Mui-focused': {
                                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                                        }
                                    }
                                }}
                            />
                            {formData.password && (
                                <Box sx={{ mt: 1, mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                        <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                            Password strength:
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color={`${getPasswordStrengthColor(passwordStrength)}.main`}
                                            sx={{ fontWeight: 600 }}
                                        >
                                            {getPasswordStrengthText(passwordStrength)}
                                        </Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={passwordStrength}
                                        color={getPasswordStrengthColor(passwordStrength)}
                                        sx={{
                                            height: 6,
                                            borderRadius: 3,
                                            bgcolor: alpha(theme.palette.grey[300], 0.3),
                                        }}
                                    />
                                </Box>
                            )}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={!!formErrors.confirmPassword}
                                helperText={formErrors.confirmPassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Lock color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                {getPasswordMatchIcon()}
                                                <IconButton
                                                    aria-label="toggle confirm password visibility"
                                                    onClick={handleToggleConfirmPassword}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </Box>
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
                                        },
                                        '&.Mui-focused': {
                                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.25)}`,
                                        }
                                    }
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                                        boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:active': {
                                        transform: 'translateY(0px)',
                                    }
                                }}
                            >
                                {loading ? (
                                    <CircularProgress size={26} color="inherit" />
                                ) : (
                                    <>
                                        <PersonAdd sx={{ mr: 1 }} />
                                        Create Account
                                    </>
                                )}
                            </Button>

                            <Box textAlign="center">
                                <Typography variant="body2" color="text.secondary">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        style={{
                                            color: theme.palette.primary.main,
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        Sign In
                                    </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Slide>
        </Container>
    );
};
export default Register;