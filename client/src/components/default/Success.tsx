import React, { FC } from 'react';
import styles from '../../css/default.module.scss';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
