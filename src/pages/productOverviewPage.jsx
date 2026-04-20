import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingAnimation from "../components/loadingAnimation";
import { Link } from "react-router-dom";
import ImageSlideShow from "../components/imageSlidesShow";
import getFormattedPrice from "../utils/price-format";
import { addToCart, getCart } from "../utils/cart";

export default function ProductOverviewPage() {
    const parameters = useParams();
    const navigate = useNavigate();
    const [product, setProducts] = useState(null);
    const [status, setStatus] =  useState("loading");

    useEffect(
        () => {
            api.get("/products/"+parameters.productId).then(
                (response) => {
                    setProducts(response.data);
                    setStatus("success");
                }
            ).catch(
                (error) => {
                    toast.error(error?.response?.data?.message || "An error occurred while fetching data");
                    console.log(error);
                    setStatus("error");
                }
            )
        },[]
    );

    return(
        <div className="w-full h-full flex justify-center items-center">
            {
                status == "loading" && <LoadingAnimation />
            }
            {
                status == 'error' && <div className="w-full h-[300px] flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Failed to load product details.</h1>
                    <Link to="/products" className="px-4 py-2 bg-accent text-white rounded">Back to Products</Link>
                </div>
            }{
                status == "success" && <div className="w-full h-ful flex">
                        <div className="w-1/2 h-full flex justify-center items-center">
                            <ImageSlideShow images={product.images} />
                        </div>
                        <div className="w-1/2 h-full flex flex-col p-5">
                            <h1 className="text-3xl font-bold">{product.name}
                                {
                                    product.altNames.map(
                                        (alternativeName, index) => {
                                            return(
                                                <span key={index} className="text-sm text-gray-500"> | {alternativeName}</span>
                                            )
                                        }
                                    )
                                }
                            </h1>
                            <h2 className="text-sm text-gray-500 mt-5">{product.productId}</h2>
                            <div className="w-full pt-5 flex flex-col">
                                <p className="text-accent font-semibold text-4xl">
                                    {
                                        getFormattedPrice(product.price)
                                    }
                                </p>
                                {
                                    product.labelledPrice > product.price &&
                                    <span className="text-xl text-gray-500 line-through ">
                                        {
                                            getFormattedPrice(product.labelledPrice)
                                        }
                                    </span>
                                }
                            </div>
                            <div className="w-full mt-5 flex gap-10">
                                <span className="text-lg text-gray-500">Brand: <span className="text-gray-800 font-semibold">{product.brand}</span></span>
                                <span className="text-lg text-gray-500">Model: <span className="text-gray-800 font-semibold">{product.model}</span></span>
                            </div>
                            <div className="w-full mt-5 flex gap-10">
                                <span className="text-lg text-gray-500">Category: <span className="text-gray-800 font-semibold">{product.category}</span></span>
                            </div>
                            <p className="text-lg mt-5">
                                {
                                    product.description
                                }
                            </p>
                            <div className="flex mt-5 gap-5">
                                <button className="w-62.5 h-16 bg-green-500 text-white font-xl text-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300" onClick={()=>{addToCart(product, 1)}}>Add to Cart</button>
                                <button className="w-62.5 h-16 bg-blue-500 text-white font-xl text-semibold rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300" onClick={()=>{console.log(getCart())}}>But Now</button>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}