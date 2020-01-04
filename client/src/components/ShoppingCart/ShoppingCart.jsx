import React, { Fragment, useContext } from 'react';
import './index.css';
import CheckoutSection from './CheckoutSection';
import {listContext} from '../../contexts/ShoppingCart';

function Cart(){
    const state = useContext(listContext);
    const { cart } = useContext(listContext);

    const cartList = cart.map((i,index) => {
      return (
      <tr key={index}>
        <td>{index}</td>
        <td>{i.model}</td>
        <td>{'x'+i.count}</td>        
        <td>
            <button className="btn" onClick={()=>state.removePd(state.cart.indexOf(i.pd))}>
                remove
            </button>
        </td>
      </tr>
      )
    });

    if(cart.length > 0){
        return (            
            <Fragment>
                <table className='products-table'>            
                    <tr className='thead'>
                    <th>ID</th>
                    <th>Model</th>
                    <th>QUANTITY</th>              
                    </tr>
                    {cartList}
                </table>            
                <CheckoutSection />
            </Fragment>
        )
    } else{
        return <p className='message'>cart is empty</p>
    }
}

export default Cart;