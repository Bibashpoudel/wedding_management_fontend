import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ServicesListaction } from '../Action/ServicesAction';
import { createComment, createRating, VenueDetails, VenueReviewAction } from '../Action/VenueAction';
import LoadingBox from '../components/LoadingBox'; 
import MessageBox from '../components/MessageBox';
import {Link} from 'react-scroll'
import { VenueImageList } from '../Action/ImageAction';

import { addtoCartS, reomveFromCart, } from '../Action/CartAction';
import swal from 'sweetalert';
import { ADD_REVIEW_RESET } from '../Constants/venueConstants';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CheckStatusAction } from '../Action/OrderAction';
import Rating from '../components/Rating';
import RatingDetails from '../components/RatingDetails';

function VenueDetailsPage(props){
    // const venue1 = data.venders.find((x) => x._id === props.match.params.id);

    const venueId = props.match.params.id;
    const dispatch = useDispatch();
    const DetailsVenue = useSelector((state) =>state.DetailsVenue);
    const {loading, error, venue} = DetailsVenue;
    const venueService =useSelector(state =>state.venueService);
    const {loading:loading_service, error:error_service, vService} = venueService;
    const venueImage = useSelector(state => state.venueImage);
    const { loading:loadingImage, error:errorImage, venImg} = venueImage;
    const userProfileView = useSelector((state) => state.userProfileView);
    const {profile} = userProfileView;
    const ReviewAdd = useSelector((state) => state.ReviewAdd);
    const {loading:loading_addreview, ReviewAdd:success,error:ReviewAddError} = ReviewAdd;
    const ReviewDisplay = useSelector((state) => state.ReviewDisplay);
    const { loading: VenueReviewLoading, venueReview, error: ReviewDisplayError } = ReviewDisplay;
    const CheckStatus = useSelector(state => state.CheckStatus)
    const { loading: statusLoading, eror: statusError, status } = CheckStatus;
    const RatingAdd = useSelector(state => state.RatingAdd);
    const { loading: rat_loading, error: rat_error, venueRating } = RatingAdd;
    const [, setserviceADD] = useState(['']);
    const [from, setFrom] = useState(' ');
    const [to, setTo] = useState(' ');
    const [total, setTotal] = useState();
    const [people, SetPeople] = useState(0);
    const [checkedState, setCheckedState] = useState([false, false, false,false])
    const [imageDisplay , setImageDispaly] = useState(false);
    const [videoDisplay , setVideoDispaly] = useState(false);
    const [rating, setRating] = useState();
    const [comment, setComment] = useState();
    const [dateErrorMessage, setDateErrorMessage] = useState("");

    const signin = (e) => {
        e.preventDefault();
        props.history.push(`/signin?redirect=/venue/${venueId}`)
    }
    
    const AddReview =(e) =>{
        e.preventDefault();
        if(comment && rating){
            dispatch(createComment(venueId, comment));
            dispatch(createRating(venueId, rating));
        }
    }
   
    useEffect(() =>{ 
        if(success){
            setRating('');
            setComment('')
            swal("Review Added successfully", "Wait For Approval", "success");
            dispatch({
                type:ADD_REVIEW_RESET
            })
        }
        dispatch(VenueReviewAction(venueId))
        dispatch(VenueDetails(venueId));
        dispatch(ServicesListaction(venueId))
        dispatch(VenueImageList(venueId))
       

   
    }, [dispatch, venueId, success] );
  
  
    const DisplayImage = () => {
    
    setImageDispaly(true);
    setVideoDispaly(false);
    }
    const DisplayVideo = () => {
    
    setVideoDispaly(true);
    setImageDispaly(false);
    }
    
    const CheckAvailable = (e) => {
        e.preventDefault();
        
        const date = new Date()
        function addLeadingZeros(n) {
            if (n <= 9) {
              return "0" + n;
            }
            return n
          }
    
        const today =date.getFullYear()+ "-" + addLeadingZeros(date.getMonth() + 1) + "-" + addLeadingZeros(date.getDate())
        
        console.log(from , to,today)
        if (from === ' ') {
            setDateErrorMessage("Please Select Start Date")
            return
        }
        if(to === '') {
            setDateErrorMessage("Please Select end Date")
            return
        }
        
        if (from > to) {
            setDateErrorMessage("End date can not be smaller")
            return
        }
        if(from < today || to < today)
        {
            setDateErrorMessage("Your Can't Select this format of date")
            return
            }
            setDateErrorMessage('')
            dispatch(CheckStatusAction(from, to,venueId))
    }


    
    // console.log(services)
    const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    
    
    const totalPrice = updatedCheckedState.reduce(
      (sum,  currentState, index) => {
         
        if (currentState === true) {
           
            const calcpric = parseInt(vService[index].display_price);

          if(vService[index].is_true ===true){

            

            return sum +  calcpric * people;
          }
          else{
            return sum + calcpric;
          }
        }
        return sum ;
      },
      0
    );
    const venueprice = parseInt(venue.display_price);
    const finalprice  = venueprice + totalPrice;
    setTotal( finalprice);

    // for adding service name
    const SelectedService = updatedCheckedState.reduce(
        (serviceId, currentState, index) =>{
            if(currentState === true){
                // return  names = names + ","+ vService[index].id;
                const serviceId = vService[index].id
                dispatch(addtoCartS(serviceId))
                console.log(serviceId)
                return serviceId;
            }
           else{
                dispatch(reomveFromCart(serviceId));
            }
            return serviceId;
        },
    );
    setserviceADD(SelectedService)
    
   
  };


    
    const Carthandaler=()=>{
        
        setTotal( 0);
        props.history.push(`/cart/${venueId}?from=${from}&to=${to}`);
    //    setTimeout ((e)=>{
    //     
    //     console.log("bibash")
    //    }, 3000)
       
        

    }

    const [IsOpen, setIsOpen] = useState(false);
    return(
        
    <div>
        {
            loading? <LoadingBox></LoadingBox>
        :
            error? <MessageBox variant="danger">{error}</MessageBox>
        :
        loadingImage? <LoadingBox></LoadingBox>
        :
            errorImage? <MessageBox variant="danger">{errorImage}</MessageBox>
        :
        VenueReviewLoading ? <LoadingBox></LoadingBox>
        :
        ReviewDisplayError ? <MessageBox variant="danger">{ReviewDisplayError}</MessageBox>
        
        :
        <div> 
            <div className="main top_center">
                <div className="det-col-1">
                    <div>
                       <img id="myimage"  className="det-large" src={venue.display_image} alt={venue.name}></img>
                    </div>
                    <div className="venue_details_margin">
                        <div className="venue_details_row">
                            
                            <div>
                                Name: {venue.name}
                            </div>
                                
                            
                            <div>
                            <RatingDetails rating={venue.rating} ></RatingDetails>
                            </div>
                        </div>
                        <div className="venue_details_row">
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <div>
                                    City: {venue.city.city}
                                </div>
                                <div style={{color:'#c0c0c0'}}>
                                    Venue Type: {venue.venue_type.type}
                                </div>
                                <span>
                                <i className="fa fa-location"></i>
                                    {venue.location}
                                </span>
                            </div>
                        </div>
                        <div className="venue_details_row_buttom">
                                <div className="colm-4">
                                    <i className="fa fa-image"></i>
                                    {/* {venue.gallery.length} */}
                                </div>
                                <div className="colm-4">
                                <i className="fa fa-image"></i>
                                
                                </div>
                                <div className="colm-4">
                                <i className="fa fa-share"></i>
                                
                                
                                </div>
                                <div className="colm-4">
                                <i className="fa fa-heart-o" aria-hidden="true"></i>

                                </div>
                        </div>
                        
                    </div>
                    <div className="venue_details">
                        <div className="venue_details_row">
                            <div>
                            <Link to='photo'     activeClass="active" style={{color:'black',cursor:'pointer'}} spy={true} smooth={true}>Photo</Link>
                            </div>
                            <div>
                            <Link to ='about'  spy={true} style={{color:'black',cursor:'pointer'}}  smooth={true}>About</Link>
                            </div>
                            <div>
                                <Link to='features'   spy={true} style={{color:'black',cursor:'pointer'}}  smooth={true}>Features</Link>
                            </div>
                            <div>
                            <Link to="reviews"  spy={true} style={{color:'black',cursor:'pointer'}}  smooth={true}>Reviews</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='det-col-2'>
                    <form className="form " >
                        <span className="form-fst-div" >
                            {
                                loading_service? <LoadingBox></LoadingBox>
                                :
                                error_service? <MessageBox variant="danger">{error_service}</MessageBox>
                                :
                                <div className="g_service" >
                                    <div className="g_ser_hed">
                                        <h3>
                                            Available Services
                                        </h3>
                                    </div>
                                    {
                                    vService.map((serv, index) =>(
                                    
                                        <div key={serv.id} className="Ven_service">
                                            <div className="dts_service">
                                            <div className="dts_col_1">
                                                    {serv.is_true? (
                                                        <span>
                                                            {/* <i className="fa fa-plus"></i> */}

                                                            <div className="tooltip">
                                                                <input className="tooltip"
                                                                type="checkbox"
                                                                    id={`custom-checkbox-${index}`}
                                                                    name={serv.name}
                                                                    value={serv.id}
                                                                    checked={serv[index]}
                                                                    onChange={() => handleOnChange(index)}
                                                                />
                                                        
                                                                <span class="tooltiptext">First Enter the number of guest and click me</span>
                                                            </div>
                                                        </span>

                                                    ):
                                                        <span>
                                                        {/* <i className="fa fa-plus"></i> */}

                                                    
                                                        <input
                                                        type="checkbox"
                                                            id={`custom-checkbox-${index}`}
                                                            name={serv.name}
                                                            value={serv.id}
                                                            checked={serv[index]}
                                                            onChange={() => handleOnChange(index)}
                                                        />
                                                    </span>
                                                    }
                                                <span>
                                                <label htmlFor={`custom-checkbox-${index}`}>{serv.name}</label>
                                                </span>
                                                <span>
                                                    {serv.display_price}
                                                    {
                                                        serv.is_true ? (
                                                            <span> Per Plate</span>
                                                        ):
                                                        <span></span>
                                                    }
                                                </span>
                                            </div>
                                            <div className="dts_col_2">
                                                    <span className={IsOpen ? 'hide_content' : ''}>
                                                    
                                                        <span >
                                                                <i className ="fa fa fa-angle-down"
                                                                        onClick={() => setIsOpen(true)}
                                                                ></i>

                                                        </span>
                                                </span>
                                                <span className="hide_content">
                                                <span className={IsOpen ? 'open' : ''}>
                                                <i className ="fa fa fa-angle-up"
                                                        onClick={() => setIsOpen(false)}
                                                ></i>
                                                </span>
                                                </span>

                                                
                                            </div>
                                            </div>
                                            <div className="hide_content dts_desc">
                                                <span className={IsOpen ? 'open' : ''}>
                                                    
                                                    {
                                                        serv.is_true ? (
                                                            <span  className={IsOpen ? 'open' : ''}>
                                                            <input type="number" placeholder="no of guest eg(50)" onChange={(e) =>SetPeople(e.target.value)}></input>
                                                        </span>

                                                        
                                                        ):
                                                        <span></span>
                                                    }
                                                        {serv.description}
                                                    
                                                </span>
                                            </div>
                                        </div>
                                        ))
                                    }
                                    <div className="g_details">
                                        <div className="ven_price_loc">
                                            <div>
                                                Price
                                            </div>
                                            <div>
                                                {venue.display_price}                                
                                            </div>
                                        </div>
                                        <div className="ven_price_loc">
                                            <div>
                                                Location
                                            </div>
                                            <div>  
                                                {venue.location}
                                            </div>
                                        </div>
                                        <div className="ven_price_loc">
                                            <div>
                                                final Price
                                            </div>
                                            <div>
                                                {total}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="g_details">
                                        <div className="ven_price_loc">
                                            <div>
                                                <label>Start Date</label>
                                                <div>
                                                    <input
                                                        type='date'
                                                        className='form-select form-select-lg mb-3 w-100'
                                                        onChange={e => setFrom(e.target.value)}   
                                                    >   
                                                    </input>
                                                </div>
                                            </div>
                                            <div>
                                                <label>End Date</label>
                                                <div>
                                                    <input
                                                        type='date'
                                                        className=' form-select form-select-lg mb-3 w-100'
                                                        onChange={e => setTo(e.target.value)}
                                                    ></input>
                                                </div>
                                            </div>
                                               
                                            <div>
                                                <button className='primary' style={{fontSize:'1.5rem'}} onClick={CheckAvailable} >Check Availability</button>
                                            </div>
                                        </div>
                                        <div className='single_row'>
                                            { dateErrorMessage !== ' ' &&
                                                <div style={{ color: 'rgba(213, 19, 62, 0.77)' }}>
                                                    {dateErrorMessage}
                                                </div>    
                                            }
                                            {statusLoading ?
                                                <div style={{ color: 'rgba(213, 19, 62, 0.77)' }} >
                                                    Loading...
                                                </div>
                                            :
                                            statusError ?
                                                <div style={{color:'rgba(213, 19, 62, 0.77)'}}>
                                                    {statusError}
                                                </div>
                                            :
                                                <div style={{ color: 'rgba(213, 19, 62, 0.77)' }}>
                                                    {status.status}
                                                </div>
                                            }
                                        </div>
                                        {statusLoading ?
                                            <div style={{ color: 'rgba(213, 19, 62, 0.77)' }} >
                                               ''
                                            </div>
                                            :
                                            statusError ?
                                                <div style={{ color: 'rgba(213, 19, 62, 0.77)' }}>
                                                    {statusError}
                                                </div>
                                                :
                                            <span>
                                               { status.status === 'Available' &&
                                                <div className="single_row">
                                                    <button className="secondary block"  onClick={Carthandaler}>Continue</button>
                                                </div>
                                                }
                                                {
                                                    status.status === 'Unavailable' &&
                                                    <div style={{color: 'rgba(213, 19, 62, 0.77)'}}>
                                                        Already booked
                                                    </div>
                                                }                                                  
                                            </span>
                                        }                                                
                                        <div className ="single_row">
                                                <input type="text" placeholder="leave a comment"></input>
                                        </div>
                                    </div>
                                </div>
                            }
                        </span>
                    </form>
                </div>
            </div>
            <div className="main top">
                <div className="venue_details_row-bottom">
                        {
                            loadingImage? <LoadingBox></LoadingBox>
                            :
                                errorImage? <MessageBox variant="danger">{errorImage}</MessageBox>
                            :
                            
                        
                        <div  id ="photo">
                            <h4>Pictures</h4>   
                            <div className="photos">
                                <div className="image" onClick={DisplayImage} style={{cursor:'pointer'}}>
                                        <h2>Images</h2>
                                </div>
                                <div className="video" onClick={DisplayVideo} style={{cursor:'pointer'}}>
                                        <h2>Videos</h2>
                                </div>
                            </div>
                            {
                                imageDisplay ?
                                <div className="img-area">
                                    {
                                        venImg.map((img)=>(
                                            <span>
                                                <img className="small" src={img.media} alt="imgs"></img>
                                            </span>
                                        ))
                                    }
                                </div>
                                :<span></span>
                            }
                            {
                                videoDisplay ?
                                <div className="img-area">
                                        Video
                                        
                                </div>
                                :<span></span>
                            }
                        </div>
    }
                        <div id="about">
                            <h2> About Venues</h2>
                            {venue.about}
                        </div>
                        <div id="features">
                            <h2> Venues Features</h2>
                            {venue.features}
                        </div>
                        <div id="reviews"> 
                            
                                <h2>Review</h2>
                                <ul style={{listStyle:'none'}}>
                                    
                                {venueReview.length === 0 && (
                                        <MessageBox>There is no review </MessageBox>
                                    )}
                                    
                                    {
                                        venueReview.map((review)=>(
                                        <div>
                                            
                                                <li>
                                                    <div style={{display:'flex'}}>
                                                        <span style={{marginLeft:'.2rem' }}><ion-icon name="contact" style={{ fontSize: '2.5rem', paddingLeft: '0.5rem', color: '#c0c0c0', display:'inline !important'}}></ion-icon></span>
                                                        <span style={{}}> {review.user.fullname}
                                                            <div style={{color:'#c0c0c0', fontSize:'1.1rem'}}>{ review.date}</div>
                                                        </span>
                                                    </div>
                                                    <div style={{marginLeft:'3.5rem'}}>
                                                        <p>{review.feedback}</p>    
                                                    </div>
                                            </li>
                                            
                                        </div>
                                        ))
                                    }
                                    <li>
                                        {profile ?(
                                            <form onSubmit={AddReview} className="form-dts" >
                                                <div>
                                                    <h4>
                                                        Write a Review
                                                    </h4>
                                                    <div className="ven_dts_fields">
                                                        <label htmlFor="rating">Rating</label>
                                                        <select id="rating" value={rating}
                                                        onChange={(e)=>setRating(e.target.value)}
                                                        
                                                        >
                                                            <option value="">select</option>
                                                            <option value="1">1- Poor</option>
                                                            <option value="2">2- Fair</option>
                                                            <option value="3">3- Good</option>
                                                            <option value="4">4- Very Good</option>
                                                            <option value="5">5- Excelent</option>
                                                        </select>
                                                    </div>
                                                    <div className="ven_dts_fields">
                                                        <label htmlFor="comment">
                                                            Comment
                                                        </label>
                                                        <textarea id="comment" value={comment} onChange={(e)=>setComment(e.target.value)}>

                                                        </textarea>
                                                    </div>
                                                    <div>
                                                        {loading_addreview ? <LoadingBox></LoadingBox>
                                                        :
                                                            rat_loading && <LoadingBox></LoadingBox>
                                                        }
                                                        { ReviewAddError ? <MessageBox variant="danger">{ReviewAddError}</MessageBox>
                                                            :
                                                            rat_error && <MessageBox>{rat_error}</MessageBox>    
                                                    }
                                                    </div>
                                                    <div style={{marginTop:'0.5rem'}} >
                                                        <label/>
                                                        <button className="primary" type="submit">Submit</button>
                                                    </div>
                                                </div>
                                            
                                            </form>
                                        ):
                                        <MessageBox><span onClick={signin} style={{color:'darkblue', cursor:'pointer'}}>Sign In</span> to write a review</MessageBox>
                                        }
                                    </li>
                                </ul>
                        </div>
                </div>
            </div>
        </div>
        }
    </div>
    )
}

export default VenueDetailsPage;