import React, {useState, useEffect} from 'react'
import alchemikas from '../images/alchemikas.jpg'
import altoriusesely from '../images/altoriusesely.jpg'
import avineliutylejimas from '../images/avineliutylejimas.jpg'
import styles from './Shop.css'

function Shop() {

    //array

    const [cartTotal, setCartTotal] = useState(0)
    const [cart, setCart] = useState([])
    const [count, setCount] = useState(1)
    
    const books=[
        {
            id: 1,
            name: "Avineliu Tylejimas",
            price: 15,
            src: avineliutylejimas
        },
        {
            id: 2,
            name: "Alchemikas",
            price: 10,
            src: alchemikas
        },
        {
            id: 3,
            name: "Altoriu Sesely",
            price: 17,
            src: altoriusesely
        }
    ]

    //-------------------total--------------

    useEffect(
        () => {
            total();
        }, [cart]
    )

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price
        }
        setCartTotal(totalVal)
    }

    const decrementCount = (el) => {
        setCount(prevCount => prevCount - 1)
    }

    const incrementCount = (el) => {
        setCount(prevCount => prevCount + 1)
        
    }

    //----------------------add-------------

    const addToCart = (el) => {
        let addIt = true;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === el.id) {
                alert("This book is already in the cart")
                addIt = false
            }
        }
        if (addIt) setCart([...cart, el])
    }

    const listBooks = books.map(el => (
        <div className="book" key={el.id}>
            <div className="bookimg"><img src={el.src}/></div>
            <p>{`${el.name}`}</p>
            {`€${el.price}`}
            <input type="submit" value="Add" onClick={() => addToCart(el)}/>
        </div>
    ))

    //-----------------------remove---------------

    const removeFromCart = (el) => {
        let copy = [...cart]
        copy = copy.filter(cartBook => cartBook.id !== el.id)
        setCount(1)
        setCart(copy)
    }

    const cartBooks = cart.map(el => (
        <div className="book" key={el.id}>
            <div className="bookimg"><img src={el.src}/></div>
            <p>{`${el.name}`}</p>
            {`€${el.price}`}
            <div className="quantity">
                <button onClick={decrementCount}>-</button>
                <span>{count}</span>
                <button onClick={incrementCount}>+</button>
            </div>
            <input type="submit" value="Remove" onClick={() => removeFromCart(el)}/>
        </div>
    ))

    return (
        <>
        <h2>Book Shop</h2>
        <div className="bookcont">
            {listBooks}
        </div>
        <h2>Cart</h2>
    <h5>Total price: €{cartTotal}</h5>
        <div className="cartcont">
            {cartBooks}
        </div>
        </>
    )
}

export default Shop
