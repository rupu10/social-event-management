import React, { use, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lotties/register.json'

const LogIn = () => {
    const {logInUser,googleLogIn} = use(AuthContext)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const isFormComplete = formData.email && formData.password;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogIn = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (passwordRegExp.test(password) === false) {
            return Swal.fire({
                icon: "error",
                title: "Invalid Password",
                text: "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
            });
        }

        logInUser(email,password)
        .then(res=>{
            console.log(res.user);
            Swal.fire({
                icon: "success",
                title: "Logged in successfully!",
                text: "Welcome back!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        })
        .catch(err=>{
            console.log("Login error:", err);
            
            // Handle different Firebase auth errors
            let errorMessage = "Login failed. Please try again.";
            
            switch (err.code) {
                case 'auth/invalid-email':
                    errorMessage = "Invalid email address format.";
                    break;
                case 'auth/user-disabled':
                    errorMessage = "This account has been disabled.";
                    break;
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Invalid password. Please try again.";
                    break;
                case 'auth/invalid-credential':
                    errorMessage = "Invalid email or password.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
                case 'auth/network-request-failed':
                    errorMessage = "Network error. Please check your connection.";
                    break;
                default:
                    errorMessage = err.message || "Login failed. Please try again.";
            }

            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: errorMessage,
                confirmButtonColor: "#7c3aed",
            });
        })
    }

    const handleGoogleLogIn = () =>{
        googleLogIn()
        .then(res=>{
            Swal.fire({
                icon: "success",
                title: "Logged in successfully!",
                text: "Welcome!",
                showConfirmButton: false,
                timer: 1500
            })
            navigate('/')
            console.log(res.user);
        })
        .catch(err=>{
            console.log("Google login error:", err);
            Swal.fire({
                icon: "error",
                title: "Google Login Failed",
                text: "Failed to login with Google. Please try again.",
                confirmButtonColor: "#7c3aed",
            });
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="md:hero md:min-h-screen mt-20 md:mt-0">
                <div className="hero-content flex-col md:flex-row-reverse md:gap-x-20">
                    <div className='hidden md:block'>
                        <Lottie style={{width: '300px'}} animationData={registerLottie} loop={true}></Lottie>
                    </div>
                    <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl">
                        <div className="card-body">
                            <h1 className="text-5xl font-bold">Log in now</h1>
                            <form onSubmit={handleLogIn} className="fieldset">
                                <label className="label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full"
                                    placeholder="Email"
                                    required
                                />
                                
                                <label className="label">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="input input-bordered w-full pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m9.02 9.02l3.411 3.411M9.88 9.88l3.412-3.411m0 9.02l3.411 3.411" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                
                                <div>
                                    <p className="text-sm">
                                        Don't have an account?
                                        <Link to="/signUp" className="text-purple-600 underline ml-1">
                                            please register
                                        </Link>
                                    </p>
                                </div>

                                {/* Styled Log In Button */}
                                <button
                                    type="submit"
                                    className={`px-8 py-3 text-white font-medium rounded-lg focus:ring-4 focus:ring-purple-200 focus:outline-none transition-all duration-200 w-full flex items-center justify-center space-x-2 mt-4 ${
                                        isFormComplete
                                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                                            : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-md cursor-not-allowed'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Log In</span>
                                </button>

                                <button
                                    type='button'
                                    onClick={handleGoogleLogIn}
                                    className="btn bg-white text-black border-[#e5e5e5] hover:bg-gray-50 w-full mt-2"
                                >
                                    <svg
                                        aria-label="Google logo"
                                        width="16"
                                        height="16"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <g>
                                            <path d="m0 0H512V512H0" fill="#fff"></path>
                                            <path
                                                fill="#34a853"
                                                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                            ></path>
                                            <path
                                                fill="#4285f4"
                                                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                            ></path>
                                            <path
                                                fill="#fbbc02"
                                                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                            ></path>
                                            <path
                                                fill="#ea4335"
                                                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                            ></path>
                                        </g>
                                    </svg>
                                    Login with Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;