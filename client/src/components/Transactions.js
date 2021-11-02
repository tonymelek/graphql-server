import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useMemo, useState } from 'react'
import { TRANSACTIONS } from '../data_queries/transactions'
import Cards from './common/Cards';
import Modal from './common/Modal';
import Table from './common/Table';

const Transactions = () => {
    // const transactionsQuery = useQuery(TRANSACTIONS);
    const [loadTransactions, transactionsQuery] = useLazyQuery(TRANSACTIONS);

    const transactionHeaders = ['id', 'timeCreated', 'from', 'to', 'amount', 'status', 'timeUpdated']
    const initialWidth = () => window.innerWidth > 776 ? 'large' : 'small'
    const [widthRange, setWidthRange] = useState(initialWidth())

    useMemo(() => {
        window.addEventListener('resize', () => setWidthRange(initialWidth));
    }, [])

    useEffect(() => {
        loadTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if (transactionsQuery.error) return (<p>Error ...{JSON.stringify(transactionsQuery.error, null, 2)}</p>)
    if (transactionsQuery.called && transactionsQuery.data) return (
        <>
            <Modal headers={transactionHeaders} />
            {widthRange === 'small' ?
                <Cards cardsData={transactionsQuery?.data?.transactions} headers={transactionHeaders} />
                :
                <Table tableData={transactionsQuery?.data?.transactions} headers={transactionHeaders} />
            }
        </>
    )
    return (<></>)
}
export default Transactions;