import React, { FC } from 'react';
import StyleGuide from './pages/StyleGuide';
import Homepage from './pages/Homepage';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/account/public/Login';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import CreateAccount from './pages/account/public/CreateAccount';
import EditAccount from './pages/account/private/EditAccount';
import UserProfile from './pages/account/private/UserProfile';
import { UserProvider } from './contexts/UserContext';
import { PrivateRoute } from './components/account/PrivateRoute';
import ForgotPassword from './pages/account/public/ForgotPassword';
import ForgotPasswordSuccess from './pages/account/public/ForgotPasswordSuccess';
import ResetPassword from './pages/account/public/ResetPassword';
import { HelmetProvider } from 'react-helmet-async';
import { setAffiliateCookies } from './scripts/affiliates';
import AffiliateProgram from './pages/affiliates/AffiliateProgram';
import AffiliateDashboard from './pages/account/private/AffiliateDashboard';
import AffiliateRegistry from './pages/affiliates/AffiliateRegistry';
import AffiliateLogin from './pages/affiliates/AffiliateLogin';

const App: FC = () => {
    setAffiliateCookies();

    return (
        <HelmetProvider>
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/styles' element={<StyleGuide />} />
                        <Route path='/about' element={<About />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/create-account' element={<CreateAccount />} />
                        <Route path='/forgot-password' element={<ForgotPassword />} />
                        <Route path='/forgot-password-success' element={<ForgotPasswordSuccess />} />
                        <Route path='/reset-password' element={<ResetPassword />} />
                        <Route
                            path='/user/profile'
                            element={
                                <PrivateRoute>
                                    <UserProfile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/profile/affiliate'
                            element={
                                <PrivateRoute>
                                    <AffiliateDashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/user/edit-account'
                            element={
                                <PrivateRoute>
                                    <EditAccount />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/terms' element={<Terms />} />
                        <Route path='/privacy' element={<Privacy />} />
                        <Route path='/affiliates' element={<AffiliateProgram />} />
                        <Route path='/affiliates/register' element={<AffiliateRegistry />} />
                        <Route path='/affiliates/login' element={<AffiliateLogin />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </HelmetProvider>
    );
};

export default App;
