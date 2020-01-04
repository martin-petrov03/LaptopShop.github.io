import React, { useState, createContext } from 'react';

export const listContext = createContext({});

function ShoppingCart({children}){
    const initialState = { 
      cart:[],
      cartCount:0,
      addNew: addNew,
      removePd: removePd      
    };      

    const [ appstate, setState ] = useState(initialState);   
      
    return(
      <listContext.Provider value={appstate}>
        {children}
      </listContext.Provider>
    )

    function addNew(pd){
        let newList = appstate.cart;
        let newItem = {};
        if(pd.model) {
            newItem = {
                count:1,
                id:pd._id,
                model:pd.model
            }    
        } else {
            newItem = {
                count:1,
                id:pd._id,
                model:pd.title
            }
        }
        
        const filtered = newList.filter(i =>{
          return i.id === pd._id;
        });
    
        if(filtered.length > 0){
          const pos = newList.map(i => { return i.id; }).indexOf(pd._id);
          newList[pos].count += 1;
        }else{
          newList.push(newItem);
        }
        
        setState({...appstate, cart:newList, cartCount:getCartCount()});
        console.log(appstate)
    }
         
    function removePd(indx){
    const cartList = appstate.cart;

    cartList.splice(indx,1);

    setState({...appstate, cart:cartList, cartCount:getCartCount()});
    }

    function getCartCount(){

    let cnt = 0;

    if(appstate.cart.length > 0){

        appstate.cart.forEach(item => {
        cnt += item.count;
        });
        
    }

    return cnt;

    }
}

export default ShoppingCart;