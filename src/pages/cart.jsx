import { useState } from "react"
import { getCart, addToCart } from "../utils/cart";
import getFormattedPrice from "../utils/price-format";

export default function CartPage() {
    const[cart, setCart] = useState(getCart());
    return(
        <div className="w-full h-full flex flex-col p-5 items-center gap-10">
            {
                cart.map(
                    (item) => {
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
                                                        addToCart(item.product , -1)
                                                        setCart(getCart())
                                                    }
                                                }
                                            >-</button>
                                                <span>{item.quantity}</span>
                                            <button
                                                onClick={
                                                    ()=>{
                                                        addToCart(item.product , 1)
                                                        setCart(getCart())
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
        </div>
    )
}