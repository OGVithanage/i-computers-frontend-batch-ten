import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadMedia from "../../utils/mediaUpload";
import axios from "axios";

export default function AdminAddProductPage(){
    const navigate = useNavigate()
    const [productId, setProductId] = useState("")
    const [name, setName] = useState("")
    const [altNames, setAltNames] = useState("")
    const [price, setPrice] = useState("")
    const [labelledPrice, setLabelledPrice] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [category, setCategory] = useState("Laptop")
    const [isAvailable, setisAvailable] = useState("")
    const [stock, setStock] = useState("")

    async function handleSave(){
        try{
            const token = localStorage.getItem("token");
            if(token == null){
                toast.error("Unauthorized")
                window.location.href = "/login";
                return;
            }

            //upoload images
            const mediaUploadPromises = []

            for(let i=0; i<images.length ; i++){
                mediaUploadPromises.push(uploadMedia(images[i]));
            }

            const urls = await Promise.all(mediaUploadPromises);
            const altNameArray = altNames.split(",")

            const productData = {
                productId: productId,
                name: name,
                altNames: altNameArray,
                price: price,
                labelledPrice: labelledPrice,
                description: description,
                images: urls,
                brand: brand,
                model: model,
                category: category,
                isAvailable: isAvailable,
                stock: stock
            }

            await axios.post(import.meta.env.VITE_API_URL+"/products", productData,
                {
                    headers: {
                        "Authorization": "Bearer "+token
                    }
                }
            )

            toast.success("Product added sucessfully!");
            navigate("/admin/products")
        }catch(error){
            console.log(error)
            console.log(error?.response)
            toast.error(error?.response?.data?.message || "Something Went Worng!")
        }
    }

    return(
        <div className="w-ful h-full flex flex-col items-center p-4 overflow-y-scroll">
            <div className="sticky top-0 w-full h-[100px] rounded-lg bg-accent text-white flex items-center justify-between p-5 shadow-2xl">
                <h1 className="text-2xl font-semibold">Add New Product</h1>
                <div className="h-full flex items-center justify-center">
                    <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer">Save</button>
                    <button className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">Cancel</button>
                </div>
            </div>
            <div className="w-full flex flex-wrap bg-white shadow-2xl p-5 mt-5 rounded-lg">
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Product ID</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={productId}
                        onChange={(e)=>setProductId(e.target.value)}
                    />
                </div>
                <div className="w-3/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Name</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                <div className="w-full bg-white p-2">
                    <label className="block mb-2 font-semibold">Alternative Names (comma separated)</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={altNames}
                        onChange={(e)=>setAltNames(e.target.value)}
                    />
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={price}
                        onChange={(e)=>setPrice(e.target.value)}
                    />
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Labled Price</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={labelledPrice}
                        onChange={(e)=>setLabelledPrice(e.target.value)}
                    />
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Catogory</label>
                    <select value={category} onChange={(e) => {setCategory(e.target.value)}} className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="Laptop">Laptop</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Camera">Camera</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="w-1/4 bg-white p-2">
                    {/* Images */}
                    <label className="block mb-2 font-semibold">Images</label>
                    <input type="file" multiple={true} className="border border-gray-300 rounded-md p-2 w-full cursor-pointer"
                        onChange={
                            (e) => {
                                setImages(e.target.files)
                            }
                        }
                    />
                </div>
                <div className="w-full bg-white p-2">
                    <label className="block mb-2 font-semibold">Description</label>
                    <textarea className="border border-gray-300 rounded-md p-2 w-full"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Brand</label>
                    <select value={brand} onChange={(e) => {setBrand(e.target.value)}} className="border border-gray-300 rounded-md p-2 w-full">
                        <option value="Apple">Apple</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Soney">Soney</option>
                        <option value="LG">LG</option>
                        <option value="Dell">Dell</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Model</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={model}
                        onChange={(e)=>setModel(e.target.value)}
                    />
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Stock</label>
                    <input className="border border-gray-300 rounded-md p-2 w-full"
                        value={stock}
                        onChange={(e)=>setStock(e.target.value)}
                    />
                </div>
                <div className="w-1/4 bg-white p-2">
                    <label className="block mb-2 font-semibold">Avalability</label>
                    <select className="border border-gray-300 rounded-md p-2 w-full">
                        value={isAvailable}
                        onChange={(e)=>setisAvailable(e.target.value === "true")}
                        <option className="bg-green-600 text-white font-semibold" value={true} >Available</option>
                        <option className="bg-red-600 text-white font-semibold" value={false}>Not Available</option>
                    </select>
                </div>
            </div>
        </div>
    )
}