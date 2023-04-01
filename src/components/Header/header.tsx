// import { redirect, Link } from "react-router-dom";

// const Header = () => {
//     return (
//         <header className="py-4 container mx-auto flex justify-between items-center">
//             <div className="font-semibold font-mono text-3xl">
//                 <Link to="/">xtutor</Link>
//             </div>
//             <nav>
//                 <ul className="flex gap-x-6">
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/settings">Settings</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Header;

import React from "react";
import Logo from "../../assets/Logo";

export default function header() {
  return <Logo />;
}
