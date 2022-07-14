import React, { FC, ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import styles from '../css/default.module.scss';
import { Helmet } from 'react-helmet';

export const Page: FC<PageProps> = ({
    meta,
    children,
    fullWidth,
    clsPage = '',
    clsOuter = '',
    clsInner = '',
    clsHeader = '',
    clsFooter = '',
    showHeader = true,
    showFooter = true,
}) => {
    const pageClasses = `${styles.pageContainer} ${clsPage}`;
    const outerClasses = `${styles.outer} ${styles.mainBody} ${clsOuter}`;
    const innerClasses = `${!fullWidth ? styles.inner : ''} ${clsInner}`;
    const { title, description } = meta;

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
            </Helmet>
            <div className={pageClasses}>
                {showHeader && <Header cls={clsHeader} />}
                <div className={outerClasses}>
                    <div className={innerClasses}>{children}</div>
                </div>
                {showFooter && <Footer cls={clsFooter} />}
            </div>
        </>
    );
};

interface PageProps {
    meta: any;
    children: ReactNode;
    clsPage?: string;
    clsOuter?: string;
    clsInner?: string;
    clsHeader?: string;
    clsFooter?: string;
    fullWidth?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
}
