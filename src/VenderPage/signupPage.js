import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import { GSTPANAdd, VendorCityList,    VendorSignup,    VendorTypeList } from '../Action/vendorAction.js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import venimg  from '../vreg.jpg'
import Load from '../assets/load.gif'

import swal from 'sweetalert'
import { registerSendOtp } from '../Action/OtpAction.js';

window.Swal = swal;

function SignupPageVendor(props){
    const[name, SetName] =useState();
    const [email, SetEmail] =useState();
    const [phone, SetPhone] = useState();
    const [password, setPassword] = useState();
    const [city , setCity] = useState();
    const [vendor_type, setType] = useState();
    const [otp, setOtp] = useState();
    const [pan, setPan] = useState();
    const [gst, setGst] = useState();

   
    const customer_type ="Vendor"

    // const redirect = props.location.search ? props.location.search.split('=')[1]: '/'

    // const userRegister = useSelector(state => state.userRegister);
    // const {  userInfo, } =userRegister;
   

    const VendorCitys = useSelector((state) => state.VendorCitys);
    const {loading:loading_city, error:error_city, citys} = VendorCitys;

    const VendorTypes = useSelector((state) => state.VendorTypes);
    const {loading:loading_types, error:error_types, types} =VendorTypes;

    const vendorRegister = useSelector(state => state.vendorRegister);
    const{ VendorInfo} = vendorRegister
    // const userSignin = useSelector(state => state.userSignin);
    // const{ userInfo} = userSignin;
    const addGstPan = useSelector(state => state.addGstPan);
    const {gstpan} = addGstPan
    const otpSendReg = useSelector(state => state.otpSendReg);
    const {loading:otploading, success} = otpSendReg;

    const regOtpVerify = useSelector(state => state.regOtpVerify);
    const { error:verifyError } = regOtpVerify;


    const [form, setform] = useState(true);
    const [otpform, setOtpform] = useState(false);
    const [panform, setPanform] = useState(false);



    const dispatch = useDispatch();
    const SignUphandaler =(e)=>{
        e.preventDefault();
        
            dispatch(registerSendOtp(phone))

            
        
    }
    const otphandaler = (e) =>{
        e.preventDefault();
       
            dispatch(VendorSignup(name, email, phone, customer_type, vendor_type, city,  password,otp));
            // console.log(VendorInfo)
            //  setTimeout((e) => {
            //     dispatch(Signin(email, password))
            //     console.log("run after 3 second")
            // }, 5000);
            // setOtpform(false);
            // setPanform(true)
        
        
    }
    const panhandaler = (e) =>{

        e.preventDefault()
        dispatch(GSTPANAdd(gst,  pan))
       
    }
    const backButton = (e) =>{
        e.preventDefault()
        setform(true)
        setOtpform(false)
    }
    useEffect(() =>{


        if(success){
            setform(false);
            setOtpform(true)
        }
        
       if(!types || ! citys ){
           
            dispatch(VendorCityList())
            dispatch(VendorTypeList())
       }
       
       
           
        if(VendorInfo ){
            
            setOtpform(false)
            setPanform(true)
        }
        if(gstpan){
           swal("Account Approval in process!!!", "You will be notified soon checked your mail ", "success");
           
        }
        
        
        

    }, [dispatch, VendorInfo, gstpan, success, types, citys]);

    

    return(
        <div>

{
            loading_city  ? <LoadingBox></LoadingBox>
        :
            error_city? <MessageBox variant="danger">{error_city}</MessageBox>
        :
        loading_city? <LoadingBox></LoadingBox>
        :
            error_city? <MessageBox variant="danger">{error_city}</MessageBox>
        :
       

        <div className="main  ">
            <div className="col-1">
                <img className="large" src={venimg} alt="register"></img>
            </div>
            <div className="form col-2">

                {form ? 
                <form onSubmit={SignUphandaler} style={{marginLeft:'2rem'}}>
                   <div>
                   <div>
                        <h2>
                            “Business with Sevenoath"<br></br>
                            Sign Up to access your Dashboard
                        </h2>
                        
                    </div>
                    
                    
                    <div className="">
                       
                        <input 
                            type="text" 
                            id="brand_name" 
                            placeholder="Name"
                            onChange={e => SetName(e.target.value)}
                            
                        ></input>
                    </div>
                    <div className="">
                    {
                            loading_city? <LoadingBox></LoadingBox>
                        :
                            error_city? <MessageBox variant="danger">{error_city}</MessageBox>
                        :
                        <select  onChange={(e)=> setCity(e.target.value)} required> 
                             <option  value="">Select City</option>
                           {
                               citys.map((c) =>(
                                   <option key={c.id} id={c.id} value={c.id}  >
                                    {c.city}   
                                    </option>
                               ))
                           }
                        </select>
}
                    </div>
                    <div className="">
                    {
                            loading_types? <LoadingBox></LoadingBox>
                        :
                            error_types? <MessageBox variant="danger">{error_types}</MessageBox>
                        :
                        <select  onChange={e => setType(e.target.value)} required>
                             <option value ="" >Select Type</option>
                           {
                               types.map((t) =>(
                                    
                                    <option key={t.id} id={t.id} value={t.id}>
                                     {t.type}
                                    </option>
                                   
                               ))
                           }
                        </select>
}
                    </div>
                    <div className="">
                        
                        <input 
                            type="text" 
                            id="email" 
                            placeholder="Email"
                            onChange={e => SetEmail(e.target.value)}
                        ></input>
                    </div>
                    <div className="">
                        
                        <input 
                            type="text" 
                            id="phone" 
                            placeholder="Phone"
                            onChange={e => SetPhone(e.target.value)}
                            
                        ></input>
                    </div>
                    
                    <div className="">
                       
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Password"
                            onChange={e =>setPassword(e.target.value)}
                            
                        ></input>
                    </div>
                    <div className="btn_center">
                        <button type="submit" className="block primary">Continue</button>
                    </div>
                    <div>
                        <span>
                            Already Have account? { ' '}
                            <Link to={`/dashboard`}   style={{ color:"blue"}}>
                                Sign In
                            </Link> 
                        </span>
                    </div>
                    </div>
                    
                    <div className="btn_center">
                        <button onClick={()=>props.history.push('/signin')} className="block primary">Signup as User</button>
                    </div>
                    
                </form>

                : <span> </span>
}
            {otpform ?
                <div className="form_hide">
                   
                    
                    <form className="form" >
                    <   div>
                            <h2> Enter Your Otp</h2>            
                        </div>
                         
                        <div>
                            <input 
                                    type="text" 
                                    id="otp" 
                                    placeholder="otp"
                                    onChange={e =>setOtp(e.target.value)}
                                    
                                ></input>
                        </div>
                        <div className='code-row'>{verifyError && <span className='resend-Code' onClick={SignUphandaler}> Resend Code?</span>}
                                {'  '} {otploading && <img className="img small" src={Load} alt="loading"></img>}
                            </div>
                        <div className="btn_center">
                            <button onClick={backButton}  style={{backgroundColor:"grey",fontSize:'2rem',marginRight:'.5rem',color:'white'}}   ><i className='fa fa-arrow-left' style={{fontSize:'2rem',color:'white'}}> </i>{' '} Back</button>

                            <button type="submit" onClick={otphandaler} className="block secondary">verify</button>
                        </div>
                                
                        
                    </form>

                </div>
                :<span></span>
            }
            {panform ?
                <div className="form_hide">
                    <form className="form" onSubmit={panhandaler}>
                    <div>
                        <h2>
                            Enter Pan And GST Number<br></br>
                            To approve as a Vendor
                        </h2>
                        
                    </div>
                       
                            <div>
                            <input 
                                    type="text" 
                                    id="pan" 
                                    placeholder="pan Number"
                                    onChange={e =>setPan(e.target.value)}
                                    
                                ></input>
                            </div>
                                <div>
                                    <input 
                                        type="text" 
                                        id="gst" 
                                        placeholder="GSt Number"
                                        onChange={e =>setGst(e.target.value)}
                                        
                                    ></input>
                                </div>
                                <div className="btn_center">
                                    <button type="submit" className="block secondary">Save </button>
                                </div>
                       
                    </form>
                </div>
                :<span></span>
            }
                
                
           
            </div>
            
        </div>
}
         </div>
    )
}
export default SignupPageVendor;