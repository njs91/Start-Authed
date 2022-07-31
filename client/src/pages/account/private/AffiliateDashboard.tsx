import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from '../../../components/Page';
import { affiliateDashboardMeta } from '../../MetaTags';

const AffiliateDashboard = () => {
    return (
        <Page meta={affiliateDashboardMeta}>
            <h1>Affiliate Dashboard</h1>
            <p>@todo</p>
            <p>
                @todo: also if they did not sign up directly as an affiliate, include a message telling them that we've
                made them an affiliate anyway
            </p>
            <p>
                Back to your <Link to='/user/profile'>account profile</Link>.
            </p>
        </Page>
    );
};

export default AffiliateDashboard;
