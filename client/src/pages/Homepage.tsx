import React, { useContext } from 'react';
import { Page } from '../components/Page';
import { homepageMeta } from './MetaTags';
import styles from '../css/pages/homepage.module.scss';
import { HeroArea } from '../components/default/HeroArea';
import { UserContextType, UserContext } from '../contexts/UserContext';

const Homepage: React.VFC = () => {
    const { user } = useContext<UserContextType>(UserContext);

    React.useEffect(() => console.log('user from uE: ', user), [user]); // @todo: remove

    return (
        <Page meta={homepageMeta} clsPage={styles.homepage} fullWidth={true}>
            <HeroArea title='Title' description='Description...' buttonText='Find Out More' buttonLink='/styles' />
        </Page>
    );
};

export default Homepage;
