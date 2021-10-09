import axios from "axios";
import { SERVICE_ADD_FAIL, SERVICE_ADD_REQUEST, SERVICE_ADD_SUCCESS, SERVICE_DETAILS_FAIL, SERVICE_DETAILS_REQUEST, SERVICE_DETAILS_SUCCESS, SERVICE_LIST_FAIL, SERVICE_LIST_REQUEST, SERVICE_LIST_SUCCESS, SERVICE_UPDATE_FAIL, SERVICE_UPDATE_REQUEST, SERVICE_UPDATE_SUCCESS, VENUE_SERVICE_LIST_FAIL, VENUE_SERVICE_LIST_REQUEST, VENUE_SERVICE_LIST_SUCCESS } from "../Constants/servicesConstants";



// venue services list action
//for user
export const ServicesListaction =(venueId) =>async(dispatch)=>{
    dispatch({
        type:VENUE_SERVICE_LIST_REQUEST,
        payload:venueId
        
    });

    try {
        
        const {data} = await axios.get(`/api/service/particularvenue/${venueId}/`)

        dispatch({
            type:VENUE_SERVICE_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:VENUE_SERVICE_LIST_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}


























// //////////////////////////////////////////////////

export const VenueServicesList =() =>async(dispatch, getState)=>{
    dispatch({
        type:VENUE_SERVICE_LIST_REQUEST,
        
        
    });

    try {
        const{userProfileView:{profile}} = getState();
        const {data} = await axios.get(`/api/service/particularvendor/${profile.id}/`)

        dispatch({
            type:VENUE_SERVICE_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:VENUE_SERVICE_LIST_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}
export const ServicesList =() =>async(dispatch)=>{
    dispatch({
        type:SERVICE_LIST_REQUEST,
        
        
    });

    try {
        
        const {data} = await axios.get('/api/service/admin/')

        dispatch({
            type:SERVICE_LIST_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:SERVICE_LIST_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}


export const ServiceAdd = (name, venue, actual_price, display_price, display_image,description,is_true)=>async(dispatch, getState)=>{
    dispatch({
        type:SERVICE_ADD_REQUEST,
        payload:{name, venue, actual_price, display_price, display_image,description,is_true}
    })
    try {
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.post('/api/service/vendor/',{name, venue, actual_price, display_price, display_image,description,is_true},{
            headers:{
                'Authorization': 'Bearer '+ userInfo
            }
        })
        dispatch({
            type:SERVICE_ADD_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:SERVICE_ADD_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const ServiceUpdateAction = (service)=>async(dispatch, getState)=>{
    dispatch({
        type:SERVICE_UPDATE_REQUEST,
        payload:{service}
    })
    try {
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.put(`/api/service/vendor/${service.id}/`,service, {
            headers:{
                'Authorization': 'Bearer ' + userInfo
            }
        })
        dispatch({
            type:SERVICE_UPDATE_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:SERVICE_UPDATE_FAIL,
            payload: 
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const vendorServiceDetails = (serviceId) => async(dispatch, getState)=>{
    dispatch({
        type:SERVICE_DETAILS_REQUEST,
        payload:serviceId
    })
    try {
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.get(`/api/service/vendor/${serviceId}`,{
            headers:{
                'Authorization': 'Bearer '+ userInfo
            }
        })
        dispatch({
            type:SERVICE_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:SERVICE_DETAILS_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}