import axios from "axios"
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../Constants/orderConstants"

export const Createorder =(amounts,orders) => async(dispatch, getState)=>{


    dispatch({
        type:CREATE_ORDER_REQUEST,
        payload:{amounts, orders}
    })
    try {
        const {userSignin:{userInfo}} = getState()
        const razorpay = JSON.parse(localStorage.getItem('Razorpay'));
        const razorpayOrderId = razorpay.razorpay_order_id;
        const razorpayPaymentId = razorpay.razorpay_payment_id;
        const razorpaySignature = razorpay.razorpay_signature;
        console.log(razorpay.razorpay_order_id)
        const {data} = await axios.post('/api/order/customer/',{total_price:amounts, razorpay_order_id:razorpayOrderId, razorpay_payment_id:razorpayPaymentId, razorpay_signature:razorpaySignature,orders},{
            headers:{
                'Authorization': `Bearer ${userInfo}`
            }
        })
        dispatch({
            type:CREATE_ORDER_SUCCESS,
            payload:data
            
        })
        localStorage.removeItem('Razorpay');
    } catch (error) {
        dispatch({
            type:CREATE_ORDER_FAIL,
            payload:
            error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
        localStorage.removeItem('Razorpay');
    }

}