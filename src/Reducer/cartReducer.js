import { ADD_CART_ITEM,  CART_ITEM_RESET,  REOMVE_CART_ITEM } from "../Constants/cartConstants"



export const cartReducer=(state = {cartItems:[]}, action) =>{
    switch(action.type){
        case ADD_CART_ITEM:
            const item = action.payload;
            if(item === 'venue'){
                const exitsItem = state.cartItems.find(x => x.venue === item.id); // check the current adding item is already added or not
                if(exitsItem){
                    return{
                        ...state,
                        cartItems: state.cartItems.map(x =>x.venue === exitsItem.venue? item: x), // if previously add item then update value of x with new item
                    } 
                }
                else{
                    return {
                        ...state,
                        cartItems:[...state.cartItems, item] //this added new item at the end of the item ... helps to concatinate
                    };
                }
            }
            else{
                const exitsItem = state.cartItems.find(x => x.service === item.id); // check the current adding item is already added or not
                if(exitsItem){
                   
                    return{
                        ...state,
                        cartItems: state.cartItems.map(x =>x.venue === exitsItem.venue? item: x), // if previously add item then update value of x with new item
                    } 
                }
                else{
                    return {
                        ...state,
                        cartItems:[...state.cartItems, item] //this  the end of the item ... helps to concatinate
                    };
                }
                
            }
            
        case REOMVE_CART_ITEM:
            const items = action.payload;
            if(items === 'venue'){
                return {
             
                    ...state,
                    cartItems: state.cartItems.filter(x => x.venue !== action.id)
                } 
            } 
            else{
                return {
             
                    ...state,
                    cartItems: state.cartItems.filter(x => x.service !== action.id)
                } 

            }
        case CART_ITEM_RESET:
            return {
                ...state, cartItems:[]
            }
        default:
            return state;
    }
}
