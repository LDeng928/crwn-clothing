import React from 'react';

import FormInput from '../form-input/form-input.component';

import CustomButton from '../custom-button/custom-button.component'
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        // clear out fields back to empty string
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const { value, name } = event.target;

        // dynamically set the state
        this.setState({[name]: value})
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    name='email' 
                    type='email' 
                    label='Email'
                    value={this.state.email} 
                    handleChange={this.handleChange} 
                    required/>
                    {/* <label htmlFor="email">Email</label> */}

                    <FormInput 
                    name='password' 
                    type='password' 
                    label='Password'
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    required/>
                    {/* <label htmlFor="password">Password</label> */}

                    <div className="buttons">
                        <CustomButton type="submit" >Sign In</CustomButton>
                        <CustomButton  onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                   
                </form>
            </div>
        )
    }
}

export default SignIn;