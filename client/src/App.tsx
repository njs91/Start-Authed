import './css/default.module.scss';
import StyleGuide from './pages/StyleGuide';
import Homepage from './pages/Homepage';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Login from './pages/account/public/Login';
import { FC } from 'react';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';
import CreateAccount from './pages/account/public/CreateAccount';
import EditAccount from './pages/account/private/EditAccount';
import UserProfile from './pages/account/private/UserProfile';

const App: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/styles' element={<StyleGuide />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />
            <Route path='/user/profile' element={<UserProfile />} />
            <Route path='/user/edit-account' element={<EditAccount />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default App;
