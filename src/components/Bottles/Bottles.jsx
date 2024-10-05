import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLs, getStoredCart, removeFromLs } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles,setBottles] = useState([]);
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        fetch('bottles.json')
        .then(res=>res.json())
        .then(data=>setBottles(data))
    },[])

    useEffect(()=>{
        console.log('Called the useEffect',bottles.length);
       if(bottles.length > 0){
        const storedCart = getStoredCart();
        console.log(storedCart,bottles);
        const savedCart = [];
        for(const id of storedCart){
            console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                 savedCart.push(bottle);
            }
        }
        console.log('Saved cart',  savedCart);
        setCart(savedCart);
       }
    },[bottles])

    const handelAddToCart = bottle =>{
        const newCart = [...cart,bottle];
        setCart(newCart);
        addToLs(bottle.id);
    }

const handelRemoveFromCart = id =>{
    const remainingCart = cart.filter(bottle => bottle.id !== id);
    setCart(remainingCart);
removeFromLs(id);
}

    return (
        <div>
            <h2>Bottle Available :{bottles.length}</h2>
         
            <Cart cart={cart} handelRemoveFromCart={handelRemoveFromCart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottol=><Bottle key={bottol.id} bottle={bottol} handelAddToCart ={handelAddToCart}></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;