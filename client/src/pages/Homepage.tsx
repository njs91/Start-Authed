import React from 'react';
import { Page } from '../components/Page';
import { homepageMeta } from './MetaTags';
import styles from '../css/pages/homepage.module.scss';
import { HeroArea } from '../components/default/Areas';

const Homepage: React.VFC = () => (
    <Page meta={homepageMeta} clsPage={styles.homepage} fullWidth={true}>
        <HeroArea title='Title' description='Description...' buttonText='Find Out More' buttonLink='/styles' />
    </Page>
);

export default Homepage;
