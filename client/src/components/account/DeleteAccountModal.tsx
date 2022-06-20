import React, { useContext, useState } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { UserContextType, UserContext } from '../../contexts/UserContext';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';

export const DeleteAccountModal = () => {
    const { user, setAccount } = useContext<UserContextType>(UserContext);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const deleteAccount = async () => {
        try {
            setLoading(true);

            const res = await fetch('http://localhost:8000/api/user/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user?.id }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                console.log('errorText', errorText);
                setError(`HTTP error (${res.status}): ${errorText}`);
                return;
            }

            setAccount(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={openModal} className={`${styles.btnRed} ${styles.marginTop}`}>
                Delete Account
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={styles.modal}
                contentLabel='Delete Account Modal'
                portalClassName={styles.modalOverlayWrap} // cannot use overlayClassName
            >
                <button onClick={closeModal} className={styles.close}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div>
                    <h2>Delete Your Account</h2>
                    <p>Are you sure you want to delete your account? (this action is irreversable)</p>
                    <div className={styles.buttonsContainerSpaced}>
                        {loading ? (
                            <Loading />
                        ) : (
                            <button onClick={deleteAccount} className={styles.btnRed}>
                                Delete
                            </button>
                        )}
                        <button onClick={closeModal} className={styles.btnPrimary}>
                            Cancel
                        </button>
                    </div>
                    {error && <Error msg={error as string} marginTop={true} />}
                </div>
            </Modal>
        </div>
    );
};
