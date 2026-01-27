import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { MenteeHome, AdminHome, MentorHome } from './pages/DashboardPages';
import MentorTasks from './pages/MentorTasks';
import TaskCatalog from './pages/TaskCatalog';
import PresencePage from './pages/PresencePage';
import AdminUsers from './pages/AdminUsers';
import LandingPage from './pages/LandingPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/"
                        element={
                            <PublicLayout>
                                <LandingPage />
                            </PublicLayout>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected Role-Based Routes */}
                    <Route path="/mentee">
                        <Route index element={<ProtectedRoute allowedRoles={['mentee']}><MenteeHome /></ProtectedRoute>} />
                        <Route path="tasks" element={<ProtectedRoute allowedRoles={['mentee']}><TaskCatalog /></ProtectedRoute>} />
                        <Route path="presence" element={<ProtectedRoute allowedRoles={['mentee']}><PresencePage /></ProtectedRoute>} />
                    </Route>

                    <Route path="/mentor">
                        <Route index element={<ProtectedRoute allowedRoles={['mentor']}><MentorHome /></ProtectedRoute>} />
                        <Route path="tasks" element={<ProtectedRoute allowedRoles={['mentor']}><MentorTasks /></ProtectedRoute>} />
                    </Route>

                    <Route path="/admin">
                        <Route index element={<ProtectedRoute allowedRoles={['admin']}><AdminHome /></ProtectedRoute>} />
                        <Route path="users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
                    </Route>

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
