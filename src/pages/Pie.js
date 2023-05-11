import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../layouts/components/Header';
import PieChart from '../components/PieChart';
import { useCallback, useEffect, useState } from 'react';
import { authAPI, endpoints } from '../configs/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DatePicker } from '@mui/x-date-pickers';

const Pie = () => {
    // --- For data
    const [revenue, setRevenue] = useState(null);

    // --- For filter
    const [filter, setFilter] = useState('Timeline');

    const handleFilterChange = useCallback((event) => {
        setFilter(event.target.value);
        if (event.target.value === 'Interval') {
            setDay('All');
            setMonth('All');
            setYear('All');
            setIsDay(false);
            setIsMonth(false);
            setIsYear(false);
            setIsFromTo(true);
        } else {
            setFromDay(null);
            setToDay(null);
            setIsYear(true);
            setIsFromTo(false);
        }
    }, []);

    // --- For time filter
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = [2021, 2022, 2023, 2024, 2025];

    const [day, setDay] = useState('All');
    const [month, setMonth] = useState('All');
    const [year, setYear] = useState('All');

    const [isDay, setIsDay] = useState(false);
    const [isMonth, setIsMonth] = useState(false);
    const [isYear, setIsYear] = useState(true);

    const handleDayChange = useCallback((event) => {
        setDay(event.target.value);
    }, []);

    const handleMonthChange = useCallback((event) => {
        setMonth(event.target.value);
        if (event.target.value === 'All') {
            setDay('All');
            setIsDay(false);
        } else {
            setIsDay(true);
        }
    }, []);

    const handleYearChange = useCallback((event) => {
        setYear(event.target.value);
        if (event.target.value === 'All') {
            setDay('All');
            setMonth('All');
            setIsDay(false);
            setIsMonth(false);
        } else {
            setIsMonth(true);
        }
    }, []);

    // --- For time range filter
    const [fromDay, setFromDay] = useState(null);
    const [toDay, setToDay] = useState(null);

    const [isFromTo, setIsFromTo] = useState(false);

    // --- For logic
    const loadRevenue = useCallback(async () => {
        try {
            let endpoint = `${endpoints['revenue']}`;
            if (filter === 'Timeline') {
                if (year !== 'All') {
                    endpoint += `?date_exact=${year}`;
                    if (month !== 'All') {
                        endpoint += `-${month}`;
                        if (day !== 'All') {
                            endpoint += `-${day}`;
                        }
                    }
                }
            } else {
                if (fromDay) {
                    endpoint += `?date_fr=${fromDay.$y}-${fromDay.$M + 1}-${fromDay.$D}`;
                    if (toDay) {
                        endpoint += `&date_to=${toDay.$y}-${toDay.$M + 1}-${toDay.$D}`;
                    }
                }
            }
            //console.log(endpoint);
            const res = await authAPI().get(endpoint);
            setRevenue(res.data);
        } catch (ex) {
            toast.error(ex);
        }
    }, [filter, day, month, year, fromDay, toDay]);

    useEffect(() => {
        loadRevenue();
    }, [loadRevenue]);

    //console.log(revenue);

    if (!revenue) {
        return <div className="app"></div>;
    }

    return (
        <Box m="20px">
            <Header title="Tours" subtitle="Number of tours by month, quarter, year" />
            <Box height="75vh">
                <Box sx={{ display: 'flex', gap: '15px' }}>
                    <FormControl sx={{ width: '100px' }}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Filter"
                            onChange={handleFilterChange}
                        >
                            <MenuItem value={'Timeline'}>Timeline</MenuItem>
                            <MenuItem value={'Interval'}>Interval</MenuItem>
                        </Select>
                    </FormControl>
                    <DatePicker
                        sx={{ width: '150px' }}
                        label="From"
                        value={fromDay}
                        onChange={(fromDay) => setFromDay(fromDay)}
                        disabled={isFromTo ? false : true}
                    />
                    <DatePicker
                        sx={{ width: '150px' }}
                        label="To"
                        value={toDay}
                        onChange={(toDay) => setToDay(toDay)}
                        disabled={isFromTo ? false : true}
                    />
                    <FormControl sx={{ width: '100px' }} disabled={isDay ? false : true}>
                        <InputLabel id="demo-simple-select-label">Day</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={day}
                            label="Day"
                            onChange={handleDayChange}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {days.map((day) => (
                                <MenuItem value={day} key={day}>
                                    {day}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '100px' }} disabled={isMonth ? false : true}>
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            label="Month"
                            onChange={handleMonthChange}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {months.map((month) => (
                                <MenuItem value={month} key={month}>
                                    {month}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '100px' }} disabled={isYear ? false : true}>
                        <InputLabel id="demo-simple-select-label">Year</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year}
                            label="Year"
                            onChange={handleYearChange}
                        >
                            <MenuItem value={'All'}>All</MenuItem>
                            {years.map((year) => (
                                <MenuItem value={year} key={year}>
                                    {year}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <PieChart data={revenue.RELATED_TOUR.Tour} />
            </Box>
            <ToastContainer />
        </Box>
    );
};

export default Pie;
