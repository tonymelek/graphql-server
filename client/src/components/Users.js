import { useQuery } from '@apollo/client'
import React, { useContext, useMemo, useState } from 'react'
import { USERS } from '../data_queries/users';
import { AppContext } from '../stateManagement/AppContext';
import Cards from './common/Cards';
import Modal from './common/Modal';
import Table from './common/Table';

const Users = () => {
    const usersQuery = useQuery(USERS,
        {
            fetchPolicy: "network-only",
            // Used for first execution
            nextFetchPolicy: "cache-only"
            // Used for subsequent executions);
        });
    const userHeaders = ["id",
        "firstName",
        "lastName",
        "email",
        "lastLogin",
        "role",
        "availableBalance",
        "pendingBalance",
        "totalBalance"]
    const initialWidth = () => window.innerWidth > 776 ? 'large' : 'small'
    const [widthRange, setWidthRange] = useState(initialWidth())

    useMemo(() => {
        window.addEventListener('resize', () => setWidthRange(initialWidth))
    }, [])

    if (usersQuery.loading) return (<p>Loading ...</p>)
    if (usersQuery.error) return (<p>Error ...{JSON.stringify(usersQuery.error, null, 2)}</p>)
    return (
        <>
            <Modal headers={userHeaders} />
            {widthRange === 'small' ?
                <Cards cardsData={usersQuery.data.users} headers={userHeaders} />
                :
                <Table tableData={usersQuery.data.users} headers={userHeaders} />
            }
        </>
    )

}
export default Users;