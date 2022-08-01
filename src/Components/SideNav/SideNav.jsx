import { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate, Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Wishlist from './Wishlist';
import FavoriteIcon from '@mui/icons-material/Favorite';
const drawerWidth = 240;
function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const [remove, setRemove] = useState(false);
    const [firstLink, setFirstLink] = useState("")

    const getRemoveAccount = function () {
        const deleteUserId = localStorage.removeItem("token");
        setRemove(deleteUserId);
        setFirstLink("/");
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    let navigate = useNavigate();

    const handleHistory = () => {
        navigate(-1);
    }

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton style={{ fontSize: "22px", fontWeight: "500" }}>
                        <Link to="wishlist">< FavoriteIcon style={{ fontSize: "2rem", color: "#bf0000" }} />  Wishlist</Link>
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={getRemoveAccount} style={{ fontSize: "22px", fontWeight: "500" }}>
                        <Link to={firstLink}>
                            < LogoutIcon style={{ fontSize: "2rem", color: "#ccc" }} />  Log Out
                        </Link>
                    </ListItemButton>
                </ListItem>
            </List>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" onClick={handleHistory}>
                        <ArrowBackIosIcon />
                    </Typography>
                    <Typography sx={{ marginRight: "20px" }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </Typography>
                    <Typography variant="h6" noWrap component="div">
                        Welcome Abbosbek
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Wishlist />
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
