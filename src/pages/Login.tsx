// import React from "react";

// import Logo from "../assets/Logo";
// import spinner from "../assets/spinner.png";
// import { Link } from "react-router-dom";

// const Login = () => {
//   return (
//     <>
//       <header className="container mx-auto">
//         <Link to="/">
//           <Logo className="w-36 h-36" />
//         </Link>
//       </header>
//       <main className="container mx-auto flex items-center justify-center gap-10">
//         <section>
//           <img
//             src={spinner}
//             width={400}
//             height={400}
//             className="object-cover"
//           />
//         </section>
//         <section className="w-1/2">
//           <h2 className="text-5xl font-bold font-serif mb-8">Login</h2>
//           <form className="space-y-5">
//             <div className="flex gap-4 text-center">
//               <input
//                 placeholder="Email"
//                 type="email"
//                 className="w-full bg-neutral-700 text-white p-2.5 text-center focus:outline-none placeholder:text-white"
//               />
//               <input
//                 placeholder="Password"
//                 type="password"
//                 className="w-full bg-neutral-700 text-white p-2.5 text-center focus:outline-none placeholder:text-white"
//               />
//             </div>
//             <div className="flex justify-between">
//               <Link
//                 to="/auth/register"
//                 className="underline text-lg cursor-pointer font-medium"
//               >
//                 Create an account?
//               </Link>
//               <Link
//                 to="/auth/reset"
//                 className="underline text-lg cursor-pointer font-medium"
//               >
//                 Forgot your password?
//               </Link>
//             </div>
//           </form>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Login;

import React, { useState } from "react";
import Avatar from "../components/Avatar";
import Header from "../components/Header/header";

export default function Register() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col text-white min-h-[100vh] pb-4 px-12 ">
      <Header />
      <div className="flex justify-between flex-1 items-center">
        <div>
          <Avatar isAnimate={true} style="w-[300px] h-[300px] ml-32" />
        </div>
        <div className="ml-auto max-w-[475px] mr-12  flex-1  flex flex-col justify-center">
          <p className="text-[34px] font-light font-abel leading-none ">
            Welcome Back !
          </p>
          <p className="text-[34px] font-light font-abel mb-3">Login Now</p>
          <div className="flex flex-col space-y-1 mb-3">
            <label className="text-[20px]">Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
            />
          </div>
          <div className="flex flex-col space-y-1 mb-1.5">
            <label className="text-[20px]">Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              className="bg-transparent outline-none border border-white rounded-lg px-2 py-2"
            />
          </div>

          <p className="text-sm text-gray-400 font-abel mt-1 underline text-right">
            Forgot your Password?
          </p>

          <button className="bg-gradient-to-r from-[#58fec4] w-full to-blue-500 rounded-lg py-2.5 mt-8 text-black">
            Login
          </button>
          <p className="text-sm text-gray-400 font-abel text-center mt-6">
            Don't have an account?{" "}
            <span className="text-white underline">Create Account</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
