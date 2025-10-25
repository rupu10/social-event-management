import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lotties/register.json';
import useImageUpload from "../../hooks/useImageUpload";

const SignUp = () => {
  const { createUser, googleLogIn } = use(AuthContext);
  const navigate = useNavigate();
  const { uploadImage, loading: imgLoading, error: imgError } = useImageUpload();
  const [showPassword, setShowPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Check if form is complete
  const isFormComplete = formData.name && formData.email && formData.password && uploadedUrl && !imgLoading;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      try {
        const result = await uploadImage(file);
        console.log("Upload result:", result);
        
        if (result) {
          setUploadedUrl(result);
          console.log("Profile photo URL set successfully:", result);
          Swal.fire({
            icon: "success",
            title: "Photo Uploaded!",
            text: "Your profile photo has been uploaded successfully.",
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          console.error("No URL returned from upload");
          Swal.fire({
            icon: "error",
            title: "Upload Failed",
            text: "Photo uploaded but no URL returned. Please try again.",
            timer: 3000,
          });
        }
      } catch (error) {
        console.error("Photo upload failed:", error);
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Failed to upload photo. Please try again.",
          timer: 3000,
        });
      }
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    // Use uploaded URL for photo
    const photo = uploadedUrl;

    if (!photo) {
      return Swal.fire({
        icon: "warning",
        title: "Photo Required",
        text: "Please upload a profile photo first!",
        timer: 2000,
      });
    }

    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (passwordRegExp.test(password) === false) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters long and include both uppercase and lowercase letters.",
      });
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        }).then(() => {
          Swal.fire("Success!", "Account created successfully", "success");
          form.reset();
          setUploadedUrl("");
          setImageFile(null);
          setFormData({ name: "", email: "", password: "" });
          navigate("/");
        });
      })
      .catch((error) => {
        Swal.fire("Error!", error.message, "error");
      });
  };

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="md:hero md:min-h-screen mt-20 md:mt-0">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className='hidden md:block'>
            <Lottie style={{width: '300px'}} animationData={registerLottie} loop={true}></Lottie>
          </div>
          <div className="card bg-base-100 mx-auto max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Sign Up now</h1>
              <form onSubmit={handleSignUp} className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Your name..."
                  required
                />
                
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder="Your email"
                  required
                />

                {/* Compact Profile Photo Upload */}
                <label className="label">Profile Photo</label>
                <div className="space-y-2">
                  <div className={`border-2 border-dashed rounded-lg p-3 transition-all duration-200 ${
                    uploadedUrl 
                      ? 'border-green-400 bg-green-50' 
                      : imgError 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 hover:border-purple-400'
                  }`}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className="cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          uploadedUrl ? 'bg-green-100' : imgError ? 'bg-red-100' : 'bg-purple-100'
                        }`}>
                          {uploadedUrl ? (
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : imgError ? (
                            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${
                            uploadedUrl ? 'text-green-900' : imgError ? 'text-red-900' : 'text-gray-700'
                          }`}>
                            {imageFile ? imageFile.name : "Choose profile photo"}
                          </p>
                        </div>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </label>
                  </div>

                  {/* Upload Status - Compact */}
                  {imgLoading && (
                    <div className="flex items-center space-x-2 text-purple-600 text-sm">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-purple-600"></div>
                      <span>Uploading...</span>
                    </div>
                  )}
                  {imgError && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{imgError}</span>
                    </div>
                  )}
                  {uploadedUrl && !imgLoading && (
                    <div className="flex items-center space-x-2 text-green-600 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Photo ready!</span>
                    </div>
                  )}
                </div>

                {/* Password with visibility toggle */}
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input input-bordered w-full pr-10"
                    placeholder="Password"
                    name="password"
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
                    Have an account?
                    <Link to="/signIn" className="text-purple-600 underline ml-1">
                      please sign in
                    </Link>
                  </p>
                </div>

                {/* Styled Sign Up Button - Never disabled, just changes appearance */}
                <button
                  type="submit"
                  className={`px-8 py-3 text-white font-medium rounded-lg focus:ring-4 focus:ring-purple-200 focus:outline-none transition-all duration-200 w-full flex items-center justify-center space-x-2 mt-4 ${
                    isFormComplete
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 shadow-md cursor-not-allowed'
                  }`}
                >
                  {imgLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Sign Up</span>
                    </>
                  )}
                </button>

                <button
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
                  Sign up with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;