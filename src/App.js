import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './scenes/global/Topbar';
import Sidebar from './scenes/global/Sidebar';
import Dashboard from './scenes/dashboard';
import Team from './scenes/team';
import Invoices from './scenes/invoices';
import Contacts from './scenes/contacts';
import Bar from './scenes/bar';
import Form from './scenes/form';
import Line from './scenes/line';
import Pie from './scenes/pie';
import FAQ from './scenes/faq';
import Geography from './scenes/geography';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import Calendar from './scenes/calendar/calendar';

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Routes>
                    <Route
                        path="/"
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
                        path="/line"
                        element={
                            <div className="app">
                                <Sidebar isSidebar={isSidebar} />
                                <main className="content">
                                    <Topbar setIsSidebar={setIsSidebar} />
                                    <Line />
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
                        path="/geography"
                        element={
                            <div className="app">
                                <Sidebar isSidebar={isSidebar} />
                                <main className="content">
                                    <Topbar setIsSidebar={setIsSidebar} />
                                    <Geography />
                                </main>
                            </div>
                        }
                    />
                    <Route path="/login" element={<div className="app">OK</div>} />
                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
