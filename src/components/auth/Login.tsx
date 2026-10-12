import { ChangeEvent, useState } from "react";
import { SignIn } from "../../models/SignIn";
import { useAuth } from "./AuthProvider";
import { useNavigate,Link } from "react-router-dom";
import AuthService from "../../service/AuthService";
import logo from '../libs/Logo-RM.png';

export const LogIn = () => {
    const [signIn, setSignIn] = useState<SignIn>({
        email: "",
        password: "",

    })
    // Catch Input values
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignIn((prev) => ({ ...prev, [name]: value }))
    }
    const handleReset = () => {
        setSignIn({
            email: "",
            password: "",

        })
    } 

    //get context
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        const token = await AuthService.signIn(signIn)
              if (token) {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(window.atob(base64));
            
            // 3. Save the clean role ("ROLE_CUSTOMER" or "ROLE_ADMIN") directly
            localStorage.setItem("USER_ROLE", payload.roles);
        }
        login(token)
        handleReset()
        navigate("/movies")

       

    }
    return (
        <>
        <div className="min-h-screen bg-bgPaper flex items-center justify-center">
            {/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm"> */}

                            {/* Login Frame */}
                <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <div className="bg-[#c8d6e5] rounded-2xl border border-gray-200 shadow-2xl px-8 py-10 flex min-h-full flex-col justify-center lg:px-8">
                    <img
                        alt="LOGO"
                        src={logo}
                         className="h-15 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-400">Login to CineSnap</h2>
                

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleOnSubmit}>

                        <div>
                            
                            <label htmlFor="email" className="block text-sm/6 font-medium text-blue-400">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={signIn.email}
                                    onChange={handleOnChange}
                                     placeholder="E-mail"
                                    required
                                    className="block w-full rounded-md bg-blue/5 px-3 py-1.5 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm/6 font-medium text-blue-400">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={signIn.password}
                                    onChange={handleOnChange}
                                     placeholder="password"
                                    required
                                    className="block w-full rounded-md bg-blue/5 px-3 py-1.5 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mb-4"
                            >
                                Login
                            </button>
                            <button
                                type="reset"
                                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                            >
                                Reset
                            </button>
                        </div>
                        
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link 
                            to="/sign-Up" 
                            className="font-semibold text-blue-500 hover:text-blue-400 underline transition-colors"
                        >
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
        </>

    )
};