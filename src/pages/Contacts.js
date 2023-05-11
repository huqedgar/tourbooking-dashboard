import { useEffect, useState } from 'react';
import { authAPI, endpoints } from '../configs/API';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../layouts/components/Header';

const Contacts = () => {
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
            field: 'first_name',
            headerName: 'First Name',
            flex: 1,
        },
        {
            field: 'last_name',
            headerName: 'Last Name',
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
            field: 'gender',
            headerName: 'Gender',
            flex: 1,
        },
        {
            field: 'date_of_birth',
            headerName: 'Birthday',
            flex: 1,
            valueGetter: (params) => moment.tz(params.row.date_of_birth, 'UTC').format('DD/MM/YYYY'),
        },
        {
            field: 'address',
            headerName: 'Address',
            flex: 1,
        },
    ];

    return (
        <Box m="20px">
            <Header title="Information" subtitle="List of information for future reference" />
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

export default Contacts;
