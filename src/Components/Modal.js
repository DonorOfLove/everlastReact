import React from 'react';

const Modal = ({setUser, user}) => {

    React.useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key == 'Escape' || e.key == 'Enter') {
                setUser({...user, modalVision: false})
            }
        })
    }, [])

    return (
        <div className='modal'>
            <div className="modal-content">
                {user.modalText} <br/>
                <button onClick={() => setUser({...user, modalVision: false})}
                        className='modal__button'>close
                </button>
            </div>
        </div>
    );
};

export default Modal;