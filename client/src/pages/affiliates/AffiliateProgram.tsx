import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroArea, Section } from '../../components/default/Areas';
import { Page } from '../../components/Page';
import { affiliateProgramMeta } from '../MetaTags';
import styles from '../../css/default.module.scss';
import { UserContextType, UserContext } from '../../contexts/UserContext';

const AffiliateProgram = () => {
    const { user } = useContext<UserContextType>(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) navigate('/user/profile/affiliate');
    }, [user, navigate]);

    return (
        <Page meta={affiliateProgramMeta} fullWidth={true}>
            <HeroArea
                title='Our Affiliate Program'
                description='Become an affiliate and bla bla bla'
                buttonText='Learn More'
                buttonLink='#learn-more'
                buttonTwoText='Affiliate Login'
                buttonTwoLink='/affiliates/login'
            />

            <Section id='learn-more' patterned={true}>
                <h2>Becoming an affiliate</h2>
                <p>Register below:</p>
                <Link to='/affiliates/register' className={styles.btnPrimary}>
                    Register
                </Link>
            </Section>
        </Page>
    );
};

export default AffiliateProgram;
