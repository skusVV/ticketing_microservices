import { useState } from 'react';
import useRequest from '../../hooks/use-request';

const signUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doRequest, errors] = useRequest({
        url: '/api/users/sign-up',
        method: 'post',
        body: { email, password }
    })

    const onSubmit = async event => {
        event.preventDefault();

        doRequest();
    }

    return <form onSubmit={onSubmit}>
        <h1>Sign Up </h1>
        <div className="form-group">
            <label>Email address</label>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                className="from-control"/>
        </div>
        <div className="form-group">
            <label>Password</label>
            <input
                value={password}
                onChange={e => setPassword(e.target.value )}
                type="password"
                className="from-control"/>
        </div>
        { errors }
        <button className="btn btn-primary">Sign Up</button>
    </form>
}

export default signUp;