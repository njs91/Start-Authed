import React, { FC, useContext, useState } from 'react';
import headerStyles from '../css/components/header.module.scss';
import { Link } from 'react-router-dom';
import defaultStyles from '../css/default.module.scss';
import { faAngleRight, faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Section } from './default/Section';
import { UserContextType, UserContext } from '../contexts/UserContext';

interface HeaderProps {
    cls?: string;
}

export const Header: FC<HeaderProps> = ({ cls = '' }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Section clsOuter={`${headerStyles.headerOuter} ${cls}`} clsInner={headerStyles.headerInner} tag='header'>
            <h2>
                <Link to='/'>TITLE</Link>
            </h2>
            <div className={headerStyles.rightArea}>
                <FontAwesomeIcon icon={menuOpen ? faTimesCircle : faBars} onClick={() => setMenuOpen(!menuOpen)} />
                <div className={`${headerStyles.rightAreaInner} ${menuOpen ? headerStyles.open : ''}`}>
                    <ul>
                        {links.map((link) => (
                            <li key={link.title}>
                                <Link to={link.url}>
                                    {link.title}
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <AccountButton />
                </div>
            </div>
        </Section>
    );
};

const AccountButton = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const path = user ? '/user/profile' : '/login';
    const text = user ? 'My Account' : 'Login';

    return (
        <Link to={path} className={defaultStyles.btnSecondary}>
            {text}
        </Link>
    );
};

export const links = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'About',
        url: '/about',
    },
];
