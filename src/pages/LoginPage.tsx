// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebaseConfig';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate('/account');
//     } catch (err: any) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#FFF8F5] flex items-center justify-center px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-[#C07C6C]">Welcome Back to Boshan</h2>
//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//           />
//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 rounded-md hover:bg-opacity-90 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center">
//           Don’t have an account?{' '}
//           <a href="/register" className="text-orange-600 hover:underline">
//             Register here
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
