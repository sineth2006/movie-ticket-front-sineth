import { ChangeEvent, useState } from "react";
import { User, UserRole } from "../../models/User";
import AuthService from "../../service/AuthService";
import { useAuth } from "./AuthProvider";
import { useNavigate,Link } from "react-router-dom";
import logo from '../libs/Logo-RM.png';


export const SignUp = () => {
    const [user, setUser] = useState<User>({
        userId: "",
        name: "",
        email: "",
        password: "",
        role: UserRole.ADMIN
    })

   const handleReset = ()=>{
       setUser({
        userId: "",
        name: "",
        email: "",
        password: "",
        role: UserRole.ADMIN
       })
   } 
    //get context
    useAuth()
   const navigate= useNavigate()

    // Catch Input values
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser((prev) => ({ ...prev, [name]: value }))
    }

    const handleOnSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
       try {
        // 1. Call the API to create the user account
        await AuthService.signUp(user) 
        
        // 2. Clear the sign-up form fields
        handleReset() 
        
        // 3. Redirect them to the sign-in page so they can log themselves in
        navigate("/sign-in") 
    } catch (error) {
        console.error("Registration failed:", error)
    }


    }

    return (
        <>
    <div className="min-h-screen bg-bgPaper flex items-center justify-center">

            {/* <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm"> */}

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <div className="bg-gray-200 rounded-2xl border border-gray-200 shadow-2xl px-8 py-10 flex min-h-full flex-col justify-center lg:px-8">
                                    <img
                        alt="LOGO"
                        src={logo}
                         className="h-15 w-auto rounded-full"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-400">Register Now to CineSnap</h2>
                

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleOnSubmit}>
                        <div>
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-blue-400">
                                User Id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="user-id"
                                    name="userId"
                                    type="text"
                                    value={user.userId}
                                    onChange={handleOnChange}
                                    required
                                    className="block w-full rounded-md bg-blue/5 px-3 py-1.5 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="last-name" className="block text-sm/6 font-medium text-blue-400">
                                    Name
                                </label>
                                <div className="text-sm">
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={user.name}
                                    onChange={handleOnChange}
                                    required
                                    className="block w-full rounded-md bg-blue/5 px-3 py-1.5 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-blue-400">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={user.email}
                                    onChange={handleOnChange}
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
                                    value={user.password}
                                    onChange={handleOnChange}
                                    required
                                    className="block w-full rounded-md bg-blue/5 px-3 py-1.5 text-base text-blue outline-1 -outline-offset-1 outline-blue/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm/6 font-medium text-blue-400">
                                Role
                            </label>
                            <div className="mt-2">
                                <input
                                    id="role"
                                    name="role"
                                    type="text"
                                    value={user.role}
                                    onChange={handleOnChange}
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
                                Sign Up
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
                                         Already a member?{' '}
                                         <Link 
                                             to="/sign-in" 
                                             className="font-semibold text-blue-500 hover:text-blue-400 underline transition-colors"
                                         >
                                             Loging Here
                                         </Link>
                                     </p>
                </div>
            </div>
            </div>
            </div>
        </>

    )
};