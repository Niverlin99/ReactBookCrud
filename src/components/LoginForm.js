import React from 'react';
class LoginForm extends React.Component{
    state={
        email:'',
        pwd:''
    }

    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})
        
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        window.location.href="/home";
    }
    redirectToRegister = () => {
        window.location.href="/register";
        //props.updateTitle('Register');
    }
    render(){
        return(


            <div className="card col-6 ml-25 login-card mt-2">
            <form onSubmit = {this.handleSubmit}>
            <div className="form-group text-left">
                    <label htmlFor="exampleInputName">Email</label>
                    <input type="name" 
                        className="form-control" 
                        id="name" required
                        placeholder="Enter Email"
                        name='email'
                        onChange={this.handleChange} 
                    />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        name='pwd'
                        placeholder="Password"
                        required
                        onChange={this.handleChange} 
                    />
                </div>
                <button className='btn btn-primary' onSubmit={this.handleSubmit}>Log In</button>
            </form>
            <div className="mt-2">
            <span>Dont have an account? </span>
                <span className="loginText" onClick={() => {this.redirectToRegister()}}>Register here</span> 
            </div>


         
            </div>
        )
    }
}

export default LoginForm;