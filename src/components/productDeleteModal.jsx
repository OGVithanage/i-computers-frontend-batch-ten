import { useState } from "react";
import { TbTrash } from "react-icons/tb";

export default function ProductDeleteModal(props){
    const [isModalOpen, setIsModalOpen] = useState(false)

    const product = props.product;
    const refresh = props.refresh;

    function handleDelete(){
        const token = localStorage.getItem("token")
            axios.delete(import.meta.env.VITE_API_URL+"/products/"+item.productId,{
            headers:{
                "Authorization": "Bearer "+token
            }
            }).then(
                ()=>{
                    toast.success("Product deleted sucsussfully")
                    refresh()
                }
            ).catch(
                (error)=>{
                    toast.error("Something went wrong")
                    console.log(error)
                }
            )
    }

    return(
        <>
            <TbTrash onClick={
                ()=>{
                    setIsModalOpen(true)
                }
            }/>
            {
                isModalOpen&&
                <div className="w-screen h-screen fixed bg-black/30 top-0 left-0 flex justify-center items-center">
                    <div className="w-[500px] h-[200px] bg-white flex flex-col justify-center items-center rounded-2xl">
                        
                    </div>
                </div>
            }
        </>
    )
}