import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const pages = [
    { label: 'O nas', link: '/about' },
    { label: 'Moje podróże', link: '/my-travels' },
    { label: 'Wszystkie podróże', link: '/all-travels' },
    { label: 'Kontakt', link: '/contact' },
];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    let isLoggedIn = !!localStorage.getItem('logged');

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginButtonClick = async () => {
        if (isLoggedIn) {
            localStorage.clear();
            try {
                await axios.post('http://localhost:8080/logout', {}, { withCredentials: true });
                window.location.href = 'http://localhost:3000';
            } catch (error) {
                console.error("Wystąpił błąd", error);
            }
            navigate('/');
        } else {
            window.location.href = 'http://localhost:8080';

            localStorage.setItem('logged', 'true');
        }
    };

    const handlePageButtonClick = (link: string) => {
        navigate(link);
    };

    const handleUserProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isLoggedIn) {
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleUserMenuItemClick = (action: string) => {
        handleCloseUserMenu();
        switch (action) {
            case 'profile':
                navigate('/userpanel');
                break;
            default:
                break;
        }
    };

    return (
        <AppBar position="static" sx={{ borderRadius: '15px', backgroundColor: '#044d6a', margin: '10px', width: 'calc(100% - 20px)' }}>
            <Container maxWidth="xl" sx={{ padding: '0 20px' }}>
                <Toolbar disableGutters>
                    <TravelExploreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                        DREAM TRAVEL
                    </Typography>
                    {isLoggedIn &&
                        pages.map((page) => (
                            <Button
                                key={page.label}
                                variant="text"
                                onClick={() => handlePageButtonClick(page.link)}
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 50,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn && (
                            <>
                                <Tooltip title="Open user profile" arrow>
                                    <IconButton onClick={handleUserProfileClick} sx={{ p: 0, margin: 1 }} aria-label="Open user profile">
                                        <Avatar src="/profile-user.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => handleUserMenuItemClick('profile')}>
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                        <Button onClick={handleLoginButtonClick} sx={{ backgroundColor: 'white', color: '#044d6a' }}>
                            {isLoggedIn ? 'Wyloguj' : 'Zaloguj'}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
