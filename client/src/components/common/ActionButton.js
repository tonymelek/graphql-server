import React, { useContext } from 'react'
import { AppContext } from '../../stateManagement/AppContext'

function ActionButton({ details }) {
    const { dispatch } = useContext(AppContext)
    const openModal = (e) => {
        e.preventDefault();
        dispatch({ type: 'toggleModalState' })
        dispatch({ type: 'setModalData', details })
    }
    return (
        <div className="m-3">
            <button className="btn btn-primary w-75 d-block mx-auto" onClick={e => openModal(e)}>Edit</button>
        </div>
    )
}

export default ActionButton
