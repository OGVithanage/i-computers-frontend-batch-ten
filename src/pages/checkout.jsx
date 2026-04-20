import { useState } from "react"
import { getCart, addToCart, getCartTotal } from "../utils/cart";
import getFormattedPrice from "../utils/price-format";
import { useLocation } from "react-router-dom";
import CreateOrderModel from "../components/createOrderModal";

export default function CheckoutPage() {
    const location = useLocation();
    const[cart, setCart] = useState(location.state);
    return(
        <div className="w-full min-h-full flex flex-col p-5 pb-20 items-center gap-10">
            {
                cart.map(
                    (item, index) => {
                        return(
                            <div key={item.product.productId} className="bg-white w-[500px] h-[150px] rounded-2xl shadow-2xl flex p-2 items-center relative">
                                <img className="w-[100px] h-[100px] aspect-square object-cover rounded-l-lg" src={item.product.image} />
                                <div className="h-full w-[400px] ">
                                        <h1 className="text-lg font-semibold">{item.product.name}</h1>
                                        <p className="text-sm text-gray-500">{item.product.productId}</p>
                                        {
                                            item.product.labelledPrice > item.product.price && <span className="text-sm text-gray-500 mt-2 line-through">{getFormattedPrice(item.product.labelledPrice)}</span>
                                        }
                                        <p className="text-accent font-semibold text-sm ">
                                            {getFormattedPrice(item.product.price)}
                                        </p>
                                </div>
                                <div className="w-[200px] h-full absolute right-2  flex flex-col justify-end items-end p-2">
                                        <div className="w-[100px] h-[30px] border rounded-full flex items-center justify-between px-2">
                                            <button className="text-xl font-bold cursor-pointer hover:text-accent"
                                                onClick={
                                                    ()=>{
                                                        const newCart = [...cart]
                                                        newCart[index].quantity -= 1
                                                        if(cart[index].quantity <= 0){
                                                            cart.splice(index, 1)
                                                        }
                                                        setCart([cart])
                                                    }
                                                }
                                            >-</button>
                                                <span>{item.quantity}</span>
                                            <button
                                                onClick={
                                                    ()=>{
                                                        //const newCart = {...cart}
                                                        const newCart = [...cart]
                                                        newCart[index].quantity += 1
                                                        setCart(cart)
                                                    }
                                                }
                                             className="text-xl font-bold cursor-pointer hover:text-accent">+</button>
                                        </div>
                                        {/* total */}
                                        <p className="text-xl  mt-2"><span className="text-secondary font-semibold">{getFormattedPrice(item.product.price * item.quantity)}</span></p>
                                    </div>
                            </div>
                        )
                    }
                )
            }
            <div className="bg-white w-[500px] border rounded-t-lg flex p-2 items-center shadow-2xl justify-between fixed bottom-0">
                <CreateOrderModel cart={cart} />
                <p className="text-2xl font-bold ml-4">Total: {getFormattedPrice(getCartTotal(cart))}</p>
            </div>
        </div>
    )
}