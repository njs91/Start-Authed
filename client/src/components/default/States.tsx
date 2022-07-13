import React, { FC } from 'react';
import styles from '../../css/default.module.scss';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoadingImage from '../../images/loading.svg';

// error
interface ErrorProps {
    msg: string;
    marginTop?: boolean;
    cls?: string;
}
export const Error: FC<ErrorProps> = ({ msg, marginTop, cls = '' }) => (
    <div className={`${styles.situationText} ${styles.error} ${cls} ${marginTop ? styles.marginTop : ''}`}>
        <FontAwesomeIcon icon={faExclamationTriangle} className={styles.error} aria-label='error' /> <span>{msg}</span>
    </div>
);

// success
interface SuccessProps {
    msg: string;
    marginTop?: boolean;
    cls?: string;
}
export const Success: FC<SuccessProps> = ({ msg, marginTop, cls = '' }) => (
    <div className={`${styles.situationText} ${styles.success} ${cls} ${marginTop ? styles.marginTop : ''}`}>
        <FontAwesomeIcon icon={faCheckCircle} className={styles.error} aria-label='success' /> <span>{msg}</span>
    </div>
);

// loading
interface LoadingProps {
    clsOuter?: string;
}
export const Loading: FC<LoadingProps> = ({ clsOuter = '' }) => (
    <div className={clsOuter}>
        <img src={LoadingImage} alt='loading' />
    </div>
);
