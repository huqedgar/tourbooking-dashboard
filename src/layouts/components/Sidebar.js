import { useContext, useEffect, useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MyUserContext } from '../../contexts/MyContext';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState('Dashboard');

    const [user, dispatch] = useContext(MyUserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user === null) {
            navigate('/login', { state: { from: location.pathname } });
        }
    }, [user, navigate, location.pathname]);

    const handleClickLogout = () => {
        setSelected('Log Out');
        navigate('/login', { state: { from: location.pathname } });
        dispatch({
            type: 'logout',
        });
    };

    // console.log(user);

    return (
        user && (
            <Box
                sx={{
                    '& .pro-sidebar-inner': {
                        background: `${colors.primary[400]} !important`,
                    },
                    '& .pro-icon-wrapper': {
                        backgroundColor: 'transparent !important',
                    },
                    '& .pro-inner-item': {
                        padding: '5px 35px 5px 20px !important',
                    },
                    '& .pro-inner-item:hover': {
                        color: '#868dfb !important',
                    },
                    '& .pro-menu-item.active': {
                        color: '#6870fa !important',
                    },
                }}
            >
                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                        {/* LOGO AND MENU ICON */}
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{
                                margin: '10px 0 20px 0',
                                color: colors.grey[100],
                            }}
                        >
                            {!isCollapsed && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                    <Typography variant="h3" color={colors.grey[100]}>
                                        Tour Booking
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="profile-user"
                                        width={100}
                                        height={100}
                                        src={user.avatar || require('../../assets/images/noimage.jpg')}
                                        style={{ cursor: 'pointer', borderRadius: '50%' }}
                                    />
                                </Box>
                                <Box textAlign="center">
                                    <Typography
                                        variant="h2"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: '10px 0 0 0' }}
                                    >
                                        {user.first_name} {user.last_name}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item
                                title="Home"
                                to="/"
                                icon={<HomeOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                                Data
                            </Typography>
                            <Item
                                title="Account Manage"
                                to="/team"
                                icon={<PeopleOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Information Manage"
                                to="/contacts"
                                icon={<ContactsOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Bills"
                                to="/invoices"
                                icon={<ReceiptOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                                Pages
                            </Typography>
                            <Item
                                title="User Form"
                                to="/form"
                                icon={<PersonOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="Calendar"
                                to="/calendar"
                                icon={<CalendarTodayOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title="FAQ Page"
                                to="/faq"
                                icon={<HelpOutlineOutlinedIcon />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            {user.username === 'admin' && (
                                <>
                                    <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                                        Statistical
                                    </Typography>
                                    <Item
                                        title="Revenue"
                                        to="/bar"
                                        icon={<BarChartOutlinedIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                    <Item
                                        title="Tours"
                                        to="/pie"
                                        icon={<PieChartOutlineOutlinedIcon />}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                </>
                            )}

                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
                                Account
                            </Typography>
                            <MenuItem
                                active={selected === 'Log Out'}
                                style={{
                                    color: colors.grey[100],
                                }}
                                onClick={handleClickLogout}
                                icon={<LogoutIcon />}
                            >
                                <Typography>{'Log Out'}</Typography>
                            </MenuItem>
                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
        )
    );
};

export default Sidebar;
