import { useReducer, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MyUserReducer from './reducers/MyUserReducer';
import { MyUserContext } from './contexts/MyContext';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Cookies from 'js-cookie';
import 'moment/locale/vi';
import moment from 'moment';
import Topbar from './layouts/components/Topbar';
import Sidebar from './layouts/components/Sidebar';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Invoices from './pages/Invoices';
import Contacts from './pages/Contacts';
import Bar from './pages/Bar';
import Form from './pages/Form';
import Pie from './pages/Pie';
import FAQ from './pages/FAQ';
import Calendar from './pages/Calendar';
import Login from './pages/Login';
moment().local('vi');

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const [user, dispatch] = useReducer(
        MyUserReducer,
        Cookies.get('current-user') ? JSON.parse(Cookies.get('current-user')) : null,
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <CssBaseline />
                    <MyUserContext.Provider value={[user, dispatch]}>
                        <Routes>
                            <Route path="/" element={<Navigate to={'/dashboard'} />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Dashboard />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/team"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Team />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/contacts"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Contacts />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/invoices"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Invoices />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/form"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Form />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/calendar"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Calendar />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/faq"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <FAQ />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/bar"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Bar />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/pie"
                                element={
                                    <div className="app">
                                        <Sidebar isSidebar={isSidebar} />
                                        <main className="content">
                                            <Topbar setIsSidebar={setIsSidebar} />
                                            <Pie />
                                        </main>
                                    </div>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <div className="app">
                                        <Login />
                                    </div>
                                }
                            />
                        </Routes>
                    </MyUserContext.Provider>
                </LocalizationProvider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
