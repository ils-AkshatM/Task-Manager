import React from 'react';
import { Alert, AlertTitle, Button, Container, Box } from '@mui/material';
import { Refresh } from '@mui/icons-material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="md" className="py-8">
                    <Box className="text-center">
                        <Alert severity="error" className="mb-4">
                            <AlertTitle>Something went wrong!</AlertTitle>
                            An unexpected error occurred. Please refresh the page or try again later.
                        </Alert>
                        <Button
                            variant="contained"
                            startIcon={<Refresh />}
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </Button>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;