import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { Signin, Signup } from '../Action/UserAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import regimg from '../registerclient.png'

function SignupPage(props){



    const[name, SetName] =useState();
    const [email, SetEmail] =useState();
    const [phone, SetPhone] = useState();
    const [password, setPassword] = useState();
    const customer_type ="Customer"

    const redirect = props.location.search ? props.location.search.split('=')[1]: '/';

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error} =userRegister;

    const dispatch = useDispatch();
    const SignUphandaler =(e)=>{
        e.preventDefault();
        
        dispatch(Signup(name, email, phone, customer_type, password));
        setTimeout((e) => {
            dispatch(Signin(email, password))
            console.log("run after 3 second")
        }, 3000);
    }
    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
            
        }

    }, [props.history,redirect,  userInfo]);


    return(
        <div className="main">
            <div className="col-1">
                <img className="large" src={regimg} alt="register"></img>
            </div>
            <div className="form col-2">

            <div>
                    {
                            loading? <LoadingBox></LoadingBox>
                        :
                            error? <MessageBox variant="danger">{error}</MessageBox>
                        : " "    
                    }
                </div>

                <form onSubmit={SignUphandaler}>
                    <div>
                        <h2>Welcome !</h2>
                    </div>
                    
                    <div className="">
                       
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Name"
                            onChange={(e) => SetName(e.target.value)}
                            
                        ></input>
                    </div>
                    <div className="">
                        
                        <input 
                            type="text" 
                            id="email" 
                            placeholder="Email"
                            onChange={(e) => SetEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="">
                        
                        <input 
                            type="text" 
                            id="phone" 
                            placeholder="Phone"
                            onChange={(e)=>SetPhone(e.target.value)}
                            
                        ></input>
                    </div>
                    
                    <div className="">
                       
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            onChange={(e)=>setPassword(e.target.value)}
                            
                        ></input>
                    </div>
                    <div>
                        <button type="submit" className="block primary">Sign Up</button>
                    </div>
                    <div>
                        <span>
                            Already Have account? { ' '}
                            <Link to={`/signin?redirect=${redirect}`} style={{ color:"blue"}}>
                                Sign In
                            </Link> 
                        </span>
                    </div>
                    
                </form>
                <div className="social_items">
                    <div>
                        or
                    </div>
                    <div>
                        <h2>Continue With</h2>
                    </div>
                    <div className="item facebook">
                        <i className="fa fa-facebook"></i>
                        {"    "}facebook
                    </div>
                    <div className="item google">
                        <i className="fa fa-google"></i>
                        {"    "}Google
                    </div>
                </div>
           
            </div>
            
        </div>
    )
}
export default SignupPage;