import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lotties/register.json'

const SignUp = () => {
  const { createUser, googleLogIn } = use(AuthContext);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const name = form.name.value;

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

  return (
    <div>
      <div className="md:hero md:min-h-screen mt-20 md:mt-0">
        <div className="hero-content flex-col lg:flex-row-reverse">
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
                  className="input"
                  placeholder="name..."
                />
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">photo URL</label>
                <input
                  type="url"
                  name="photo"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                />
                <div>
                  <p className="">
                    Have an account?
                    <Link to="/signUp" className="text-blue-500 underline">
                      please sign in
                    </Link>
                  </p>
                </div>
                <button className="btn btn-neutral mt-4">Sign Up</button>
                <button
                  onClick={handleGoogleLogIn}
                  className="btn bg-white text-black border-[#e5e5e5]"
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

export default SignUp;
