import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){

    const [logUser , setLogUser] = useState(({ email: "", password: "" }))
    const [logerror, setLogerror] = useState({})
    const [firebaseerror , setFirebaseError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {login} = useAuth()
    const navigate =useNavigate()

    function handleChange(event){

        const {name ,value}= event.target

        setLogUser({...logUser ,
            [name] :value })
    }

    function validateForm(){
        const newErrors = {};

        if (!logUser.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(logUser.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!logUser.password) {
            newErrors.password = "Password is required";
        }

        return newErrors;

    }

    async function handleSubmit(event){
            event.preventDefault()
            const validateerror = validateForm()

            if(Object.keys(validateerror).length>0)
            {
                setLogerror(validateerror)
                return 
            }

            setLogerror({})
            setIsSubmitting(true)

            try {
               await login(logUser.email , logUser.password)
                navigate("/")
            }

            

            catch(error){
                if(error.code==="auth/invalid-credential") {
                    setFirebaseError(
                        "Incorrect email or password."
                    );
                }
                 else if(error.code ==="auth/ wrong-password") {

                }
                else if (
                    error.code === "auth/invalid-email"
                ) {
                    setFirebaseError(
                        "Invalid email address."
                    );
                } else {
                    setFirebaseError(
                        "Something went wrong. Please try again."
                    );
                }
            } 
            finally {
                setIsSubmitting(false);
            }
            }

            


    

    return(

        <div className="flex min-h-screen items-center justify-center ">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
            <h1 className="mb-2 text-center text-3xl font-bold">
                    Welcome Back
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Fill details for Login
                </p>

                {firebaseerror && (
                    <p className="mb-4 rounded bg-red-100 p-3 text-red-600">
                        {firebaseerror}
                    </p>
                )}

            <form onSubmit={handleSubmit}>

                 <div className="mb-4">
                     <label className="mb-1 block font-medium" >Email</label>
                    <input  type="text" name="email" value= {logUser.email} placeholder="Enter the Email" onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2"/>

                    {logerror.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {logerror.email}
                            </p>
                        )}
                </div>

                <div>
                    <label className="mb-1 block font-medium">Password</label>
                    <input  type="password" name="password" value= {logUser.password} placeholder="Enter the password"onChange={handleChange} className=" w-full rounded-lg border border-gray-300 px-4 py-2"/>

                    {logerror.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {logerror.password}
                            </p>
                        )}

                </div>

                <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 mt-6 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    > 
                        {isSubmitting
                            ? "Logging in..."
                            : "Login"}
                    </button>


                    {isSubmitting && (
                        <p className="mt-3 text-center text-sm text-gray-500">
                            Please wait, you are being logged in...
                        </p>
                    )}

            </form>
            </div>
        </div>
    )
    }

export default Login