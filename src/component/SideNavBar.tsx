import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Article, BrandingWatermarkOutlined, ChatBubbleOutline, Close, DashboardOutlined, Diversity3Outlined, EmailOutlined, ProductionQuantityLimitsOutlined, WidgetsOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/joy';
const drawerWidth = 240;
export default function SideNav() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
        theme.direction = "ltr"
    };
    const handleDrawerClose = () => {
        setOpen(false);
        theme.direction = "ltr"
    };
    const navigate = useNavigate()
    return (
        <Box sx={{ display: 'flex', p: "0", m: "0" }}>
            {open ?
                (<IconButton
                    aria-label="close drawer"
                    onClick={handleDrawerClose}
                    edge="end"
                    sx={{ rotate: "90deg", transformOrigin: " left bottom ", zIndex: 1000, position: "fixed", color: "white", padding: "5px", "&:hover": { background: "var(--btn--hover)" }, background: "var(--btn--main)", marginLeft: "239px", display: "flex", borderRadius: "0" }}
                >
                    <Close /> <Typography sx={{ color: "white" }}>CLOSE</Typography>
                </IconButton>) :
                (<IconButton

                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="end"
                    sx={{ rotate: "90deg", transformOrigin: " left bottom ", zIndex: 1000, position: "fixed", color: "white", padding: "5px", "&:hover": { background: "var(--btn--hover)" }, background: "var(--btn--main)", borderRadius: "0", display: "flex" }}
                >
                    <WidgetsOutlined /><Typography sx={{ color: "white" }}>PAGES</Typography>
                </IconButton>)}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    marginTop: "55px",
                    '& .MuiDrawer-paper': {
                        marginTop: "55px",
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: " 3px solid var(--btn--main)",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton aria-labelledby="dashboard" onClick={() => { setOpen(false) }}>
                            <ListItemIcon>
                                <DashboardOutlined />
                            </ListItemIcon>
                            <Link to={""}>
                                <ListItemText primary={"DASHBOARD"} />
                            </Link>
                        </ListItemButton>
                    </ListItem>

                </List>
                <Divider />
                <List>
                    {['comments', 'mail'].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => {
                            navigate(`${text}`);
                        }}>
                            <ListItemButton onClick={() => { setOpen(false) }} aria-labelledby="dashboard">
                                <ListItemIcon>
                                    {[<ChatBubbleOutline />, <EmailOutlined />][index]}
                                </ListItemIcon>
                                <ListItemText primary={text.toUpperCase()} >
                                    <Link to={text}>
                                    </Link>
                                </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['products', 'team', "brands", "blogs"].map((text, index) => (
                        <ListItem key={text} disablePadding onClick={() => {
                            navigate(`${text}`);
                        }}>
                            <ListItemButton onClick={() => { setOpen(false) }} aria-labelledby="dashboard">
                                <ListItemIcon>
                                    {[<ProductionQuantityLimitsOutlined />, <Diversity3Outlined />, <BrandingWatermarkOutlined />, <Article />][index]}
                                </ListItemIcon>
                                <ListItemText primary={text.toUpperCase()} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </Box>
    );
}