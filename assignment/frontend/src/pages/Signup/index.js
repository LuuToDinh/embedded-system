import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from '../../axios'

const Index = () => {
    const navigate = useNavigate()
    const [data, setData] = useState({
        username: '',
        password: '',
        repeatpassword: ''
    })
    const [isErr, setIsErr] = useState({
        isShow: false,
        message: ''
    })
    const handleOnchange = (e) => {
        setData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleSignUp = (e) => {
        e.preventDefault()
        if (!data.username || !data.password || !data.repeatpassword) {
            setIsErr({ isShow: true, message: 'Missing data!' })
            return
        }
        if (data.password != data.repeatpassword) {
            setIsErr({ isShow: true, message: 'Repeat password not match!' })
            return
        }
        axios.post('/register', { username: data.username, password: data.password })
            .then(res => {
                if (res.status == 200) {
                    navigate('/')
                }
            })
            .catch(err => setIsErr({ isShow: true, message: err.response.data.message }))
    }

    return (
        <>
            <div className="flex flex-col md:flex-row h-screen items-center">
                <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
                    <img src="https://images.unsplash.com/photo-1625571705670-38fc39c923ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                    <div className="w-full h-100">
                        <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Signup account</h1>
                        <form onSubmit={handleSignUp} className="mt-6">
                            <div>
                                <label className="block text-gray-700">Username</label>
                                <input type="text" name="username" onChange={handleOnchange} placeholder="Enter Username" value={data.username} className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus autoComplete="true" required />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" name="password" onChange={handleOnchange} placeholder="Enter Password" value={data.password} minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>

                            <div className="mt-4">
                                <label className="block text-gray-700">Repeat Password</label>
                                <input type="password" name="repeatpassword" onChange={handleOnchange} placeholder="Enter Repeat Password" value={data.repeatpassword} minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" required />
                            </div>

                            <div className="mt-4">
                                {isErr.isShow && <div className="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{isErr.message}</div>}
                            </div>

                            <button onClick={handleSignUp} className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">Sign Up</button>
                        </form>
                        <hr className="my-6 border-gray-300 w-full" />
                        <p className="mt-8">already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700 font-semibold">Login</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index