import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../stateManagement/AppContext'
import { camelToSentence } from '../../utils/textFormat'
import InputText from './form/InputText'
import Selector from './form/Selector'
import { UPDATE_TRANSACTION } from '../../data_queries/transactions'
import { UPDATE_USER } from '../../data_queries/users'
import { useMutation } from '@apollo/client'

function Modal({ headers }) {
    const { state, dispatch } = useContext(AppContext);
    const [updateUser, updateUserMutation] = useMutation(UPDATE_USER);
    const [updateTransaction, updateTransactionMutation] = useMutation(UPDATE_TRANSACTION);

    const updater = {
        User: (user) => updateUser({ variables: { user } }),
        Transaction: (transaction) => updateTransaction({ variables: { transaction } })
    }
    const selectableFields = ["role", "status", "to"]

    const handleSubmit = e => {
        e.preventDefault();
        const toUpdate = {};
        for (let element of e.target.elements) {
            if (element.name === "") continue
            toUpdate[element.name] = element.value[0] === '$' ? Number(element.value.slice(1)) : element.value;
        };
        updater[state.modalData.__typename](toUpdate);
        dispatch({ type: 'toggleModalState' });
    }
    return (
        <div className={`${!state.modalState ? 'd-none' : 'd-block'} modal-try`}>
            <form onSubmit={handleSubmit}>
                {headers.map((header, index) =>
                    <div key={`form-${header}`} className="container" >
                        {!selectableFields.includes(header) ?
                            <InputText fieldName={header} fieldValue={state.modalData && state.modalData[header]} />
                            :
                            <Selector fieldName={header} fieldValue={state.modalData && state.modalData[header]} />
                        }
                    </div>
                )}
                <button type="submit" className="btn btn-primary d-block mx-auto w-75 m-3" >Submit</button>
            </form>

            <button className="btn btn-danger d-block mx-auto w-75 m-3" onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'toggleModalState' });
            }}>Close</button>
        </div>
    )
}

export default Modal
