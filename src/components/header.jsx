import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-[100px] bg-gray-800 flex justify-center items-center gap-10">
            <Link to="/" className="w-[200px] h-full relative flex justify-center items-center">
                <img src="/logo.png" alt="logo" className="h-[60px] mr-2" />
            </Link>
            <div className="h-full w-[300px] bg-red-900">

            </div>
        </header>
    );
}