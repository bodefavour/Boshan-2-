// import React, { ReactNode } from "react";

// interface HeroSectionProps {
//   backgroundImage: string;
//   brandName?: string;
//   textSize?: string;
//   textSpacing?: string;
//   customStyle?: React.CSSProperties;
//   children?: ReactNode;
//   className?: string;
//   brandNameStyle?: React.CSSProperties;
// }

// const HeroSection: React.FC<HeroSectionProps> = ({
//   backgroundImage,
//   brandName,
//   children,
//   className = "",
// }) => {
//   return (
//     <section className={`relative w-full min-h-screen flex flex-col items-center ${className}`}>
//       {/* Background Image */}
//       <div className="relative w-full h-screen flex justify-center items-start">
//         <div className="w-full h-full bg-cover bg-center"
//           style={{
//             backgroundImage: `url(${backgroundImage})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             width: "100vw",
//             height: "100vh",
//           }}
//         ></div>
//       </div>

//       {/* Dark Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-300" style={{ width: "100%" }}></div>

//       {/* Mobile View */}
//       <div className="md:hidden absolute bottom-[13%] left-1/2 transform -translate-x-1/2 text-center text-white z-10 w-full">
//         {children}
//       </div>

//       {brandName && (
//         <h1 className="md:hidden absolute font-extralight uppercase font-phudu text-white"
//           style={{
//             top: "5%",
//             left: "52%",
//             transform: "translateX(-50%)",
//             whiteSpace: "nowrap",
//           }}
//         >
//           <span className="text-[4rem] tracking-[0.2em]">
//             {brandName}
//           </span>
//         </h1>
//       )}

//       {/* Desktop View */}
//       <div className="hidden md:flex absolute inset-0 items-center justify-start">
//         <div className="w-1/2 h-full bg-gradient-to-r from-black via-transparent to-transparent"></div>
//         <div className="absolute left-[8%] text-left text-white z-10 w-1/2">
//           {brandName && (
//             <h1 className="font-extralight uppercase font-sans text-white leading-tight"
//               style={{
//                 fontSize: "10rem",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               {brandName}
//             </h1>
//           )}
//           {children}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
