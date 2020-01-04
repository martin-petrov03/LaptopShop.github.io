import React, { useContext } from 'react';
import {listContext} from '../../contexts/ShoppingCart';

function Cart(){
    const { cart } = useContext(listContext);

    const cartlist = cart.map((i,index) => {
      return (
      <tr key={index}>
        <td>{i.id}</td>
        <td>{i.name}</td>
        <td>{'x'+i.count}</td>
        <td>{<Removebutton pd={i}/>}</td>
      </tr>
      )
    })

    if(cart.length > 0){
        return (
            <div style={
                {padding:'15px'}
            }>
            <table className='c'>
                
                <tr className='thead'>
                <th>ID</th>
                <th>Model</th>
                <th>QUANTITY</th>              
                </tr>
                {cartlist}
            </table>
            </div>
        );
    } else{
        return <p className='message'>cart is empty</p>
    }
  
}

function Removebutton(props){
    const state = useContext(listContext);
    return(
        <button onClick={()=>state.removePd(state.cart.indexOf(props.pd))}>
        remove
        </button>
    )
}

export default Cart;