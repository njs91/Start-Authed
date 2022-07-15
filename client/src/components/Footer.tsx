import React, { FC } from 'react';
import footerStyles from '../css/components/footer.module.scss';
import { Link } from 'react-router-dom';
import { Section } from './default/Areas';
import { Links, LinkType } from './Header';

interface FooterProps {
    cls?: string;
}

export const Footer: FC<FooterProps> = ({ cls = '' }) => {
    const name = undefined;
    const year = new Date().getFullYear(); // consider manually entering year to prevent usage of unnecessary power
    const copyrightMsg = `\u00A9 ${name || window.location.host} 2021 - ${year}. All Rights Reserved.`;

    return (
        <Section clsOuter={`${footerStyles.footerOuter} ${cls}`} clsInner={footerStyles.footerInner} tag='footer'>
            <span>{copyrightMsg}</span>
            <ul>
                {footerLinks.map((link: LinkType) => (
                    <li key={link.title}>
                        <Link to={link.url}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </Section>
    );
};

export const footerLinks: Links = [
    {
        title: 'Terms',
        url: '/terms',
    },
    {
        title: 'Privacy',
        url: '/privacy',
    },
];
