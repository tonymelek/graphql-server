import { useMutation } from '@apollo/client'
import React, { useEffect, useMemo, useState } from 'react'
import { NEW_TRANSACTION } from '../data_queries/transactions'


const NewTransaction = () => {
    const [addTransaction, newTransactionMutation] = useMutation(NEW_TRANSACTION);

    const transactionHeaders = ['id', 'timeCreated', 'from', 'to', 'amount', 'status', 'timeUpdated', 'action']
    const initialWidth = () => window.innerWidth > 776 ? 'large' : 'small'
    const [widthRange, setWidthRange] = useState(initialWidth())

    useEffect(() => { }
        // addTransaction({
        //     variables: {
        //         "transaction": {
        //             "amount": 15.62,
        //             "from": "Tonton",
        //             "to": "Cantine",
        //             "timeCreated": "10/10/21 13:02",
        //             "status": "pending"
        //         }
        //     }
        // })
        , [])
    useMemo(() => {
        window.addEventListener('resize', () => setWidthRange(initialWidth))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const options = {
            dateStyle: 'medium',
            timeStyle: 'medium',
            hour12: true,
            // day: 'numeric',
            // month: 'long',
            // year: '2-digit',
            // minute: '2-digit',
            // second: '2-digit',
        };

        addTransaction({
            variables: {
                transaction: {
                    amount: parseFloat(e.target.amount.value),
                    from: e.target.from.value,
                    to: e.target.to.value,
                    timeCreated: new Intl.DateTimeFormat("en-GB", options).format(new Date()),
                    status: "pending"
                }
            }
        })
    }
    if (newTransactionMutation.loading) return (<p>Loading ...</p>)
    if (newTransactionMutation.error) return (<p>Error ...</p>)
    return (<>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="from" className="form-label">From</label>
                <input type="text" className="form-control" id="from" aria-describedby="from" name="from" />
            </div>
            <div className="mb-3">
                <label htmlFor="to" className="form-label">To</label>
                <input type="text" className="form-control" id="to" aria-describedby="to" name="to" />
            </div>
            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Amount</label>
                <input type="text" className="form-control" id="amount" aria-describedby="amount" name="amount" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )

}
export default NewTransaction;