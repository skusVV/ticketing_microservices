import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doRequest, errors] = useRequest({
        url: '/api/users/sign-in',
        method: 'post',
        body: { email, password },
        onSuccess: () => Router.push('/'),
    })

    const onSubmit = async event => {
        event.preventDefault();

        doRequest();
    }

    return <form onSubmit={onSubmit}>
        <h1>Sign In</h1>
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
        <button className="btn btn-primary">Sign In</button>
    </form>
}

export default SignInComponent;