export const initialState={
    accounts:[],
};
// //selector
// export const getBasketTotal=(basket)=>
//     // '?' is for no error if basket not there or empty etc..
//     basket?.reduce((amount,item)=> item.price+amount,0);


const reducer=(account,action)=>{
    switch(action.type){
        case "ADD_TO_ACCOUNTS":
            return {
                ...account,
               accounts:[...account.accounts,action.customer],
            };
            // case 'REMOVE_FROM_BASKET':
            //     const index= state.basket.findIndex(action.id)
       default:
            return account;
    }
};
export default reducer;