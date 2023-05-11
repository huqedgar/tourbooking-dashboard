import { useCallback, useEffect, useState } from 'react';
import { authAPI, endpoints } from '../configs/API';
import moment from 'moment-timezone';
import { NumericFormat } from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokens } from '../theme';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../layouts/components/Header';

const Invoices = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [bills, setBills] = useState(null);

    const loadBills = async () => {
        try {
            const res = await authAPI().get(endpoints['all-bill']);
            setBills(res.data);
        } catch (ex) {
            toast.error(ex);
        }
    };

    useEffect(() => {
        loadBills();
    }, []);

    const handlePaymentClick = useCallback((billId) => {
        const updateBill = async () => {
            try {
                const formData = new FormData();
                formData.append('status_bill', 'Success');
                formData.append('method_pay', '...');
                const res = await authAPI().patch(endpoints['update-bill'](billId), formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(res.status);
                if (res.status === 200) {
                    toast.promise(
                        () =>
                            new Promise((resolve) => {
                                setTimeout(() => resolve('Successfully!'), 1500);
                            }),
                        {
                            pending: 'Processing!',
                            success: 'Successfully!',
                            error: 'Error!',
                        },
                    );
                    loadBills();
                }
            } catch (ex) {
                toast.error(ex.message);
            }
        };
        updateBill();
    }, []);

    if (!bills) {
        return <div className="app"></div>;
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
            field: 'code_bill',
            headerName: 'Code Bill',
            flex: 1,
            cellClassName: 'name-column--cell',
        },
        {
            field: 'name_customer',
            headerName: 'Name',
            flex: 1,
            valueGetter: (params) => params.row.user.name_customer,
        },
        {
            field: 'phone_customer',
            headerName: 'Phone Number',
            flex: 1,
            valueGetter: (params) => params.row.user.phone_customer,
        },
        {
            field: 'created_date',
            headerName: 'Created Date',
            flex: 1,
            valueGetter: (params) => moment.tz(params.row.created_date, 'UTC').format('DD/MM/YYYY'),
        },
        {
            field: 'amount_ticket',
            headerName: 'Tickets',
            flex: 0.5,
            valueGetter: (params) =>
                params.row.ticket_of_bill[1]
                    ? Number(params.row.ticket_of_bill[0].amount_ticket) +
                      Number(params.row.ticket_of_bill[1].amount_ticket)
                    : Number(params.row.ticket_of_bill[0].amount_ticket),
        },
        {
            field: 'totals_bill',
            headerName: 'Total Bill',
            flex: 1,
            valueGetter: (params) => params.row.totals_bill,
            renderCell: (params) => (
                <Typography color={colors.greenAccent[500]}>
                    <NumericFormat
                        className="bg-transparent text-left"
                        value={params.row.totals_bill}
                        allowLeadingZeros
                        thousandSeparator=","
                        decimalScale={0}
                        suffix={' VND'}
                    />
                </Typography>
            ),
        },
        {
            field: 'status_bill',
            headerName: 'Status Bill',
            flex: 0.5,
        },
        {
            field: 'payment_bill',
            headerName: 'Payment Bill',
            flex: 0.75,
            renderCell: (params) => {
                if (params.row.status_bill === 'Pending') {
                    return (
                        <Button variant="contained" onClick={() => handlePaymentClick(params.row.id)}>
                            Payment
                        </Button>
                    );
                }
            },
        },
    ];

    return (
        <Box m="20px">
            <Header title="Bills" subtitle="List of bills" />
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
                    rows={bills}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Invoices;
