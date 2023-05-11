import { useEffect, useState } from 'react';
import { authAPI, endpoints } from '../configs/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokens } from '../theme';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import Header from '../layouts/components/Header';

const Team = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [users, setUsers] = useState(null);

    const loadUsers = async () => {
        try {
            const res = await authAPI().get(endpoints['all-user']);
            setUsers(res.data);
        } catch (ex) {
            toast.error(ex);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    if (!users) {
        return <div className="app"></div>;
    }

    console.log(users);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'last_name',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'phone_number',
            headerName: 'Phone Number',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            headerName: 'Access Level',
            flex: 1,
            renderCell: (params) => (
                <Box
                    width="60%"
                    m="0 auto"
                    p="5px"
                    display="flex"
                    justifyContent="center"
                    backgroundColor={
                        params.row.username === 'admin'
                            ? colors.greenAccent[600]
                            : params.row.is_staff === true
                            ? colors.greenAccent[700]
                            : colors.greenAccent[800]
                    }
                    borderRadius="4px"
                >
                    {params.row.username === 'admin' ? (
                        <>
                            <AdminPanelSettingsOutlinedIcon />
                            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                                {'Admin'}
                            </Typography>
                        </>
                    ) : params.row.is_staff === true ? (
                        <>
                            <SecurityOutlinedIcon />
                            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                                {'Staff'}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <LockOpenOutlinedIcon />
                            <Typography color={colors.grey[100]} sx={{ ml: '5px' }}>
                                {'User'}
                            </Typography>
                        </>
                    )}
                </Box>
            ),
        },
    ];

    return (
        <Box m="20px">
            <Header title="Account Manage" subtitle="Manage accounts" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    '& .MuiDataGrid-root': {
                        border: 'none',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: 'none',
                    },
                    '& .name-column--cell': {
                        color: colors.greenAccent[300],
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: 'none',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                        backgroundColor: colors.primary[400],
                    },
                    '& .MuiDataGrid-footerContainer': {
                        borderTop: 'none',
                        backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiCheckbox-root': {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    disableSelectionOnClick={true}
                    rows={users}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Team;
