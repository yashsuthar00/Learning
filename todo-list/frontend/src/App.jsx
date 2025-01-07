import React, {Suspense, lazy} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Spinner from './components/Spinner';
import Home from './components/Home';

const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const NotFound = lazy(() => import('./components/NotFound'));
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Suspense fallback={<Spinner />}>
                <Routes>
                    <Route path="*" element={<NotFound />} />   
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/login" element={<Login />} />     
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
