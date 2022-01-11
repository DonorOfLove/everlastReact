import React from 'react';

const Modal = ({setUser,user}) => {

    return (
        <div className='modal'>
            <div className="modal-content">{user.modalText} <br/>
                <button onClick={()=>setUser({...user,modalVision:false})} className='modal__button'>close</button>
            </div>

        </div>
    );
};

export default Modal;