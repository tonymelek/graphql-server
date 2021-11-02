import { useMutation } from '@apollo/client'
import React, { useEffect, useMemo, useState } from 'react'
import { NEW_USER } from '../data_queries/users'


const NewUser = () => {
    const [addUser, newUserMutation] = useMutation(NEW_USER);

    const transactionHeaders = ['id', 'timeCreated', 'from', 'to', 'email', 'status', 'timeUpdated', 'action']
    const initialWidth = () => window.innerWidth > 776 ? 'large' : 'small'
    const [widthRange, setWidthRange] = useState(initialWidth())


    useMemo(() => {
        window.addEventListener('resize', () => setWidthRange(initialWidth))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        addUser({
            variables: {
                user: {
                    email: e.target.email.value,
                    firstName: e.target.firstName.value,
                    lastName: e.target.lastName.value,
                    role: e.target.role.value
                }
            }
        })
    }
    if (newUserMutation.loading) return (<p>Loading ...</p>)
    if (newUserMutation.error) return (<p>Error ...</p>)
    return (<>
        {newUserMutation.data && JSON.stringify(newUserMutation.data)}
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" aria-describedby="firstName" name="firstName" />
            </div>
            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" aria-describedby="lastName" name="lastName" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email" aria-describedby="email" name="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <input type="text" className="form-control" id="role" aria-describedby="role" name="role" />
            </div>


            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </>
    )

}
export default NewUser;