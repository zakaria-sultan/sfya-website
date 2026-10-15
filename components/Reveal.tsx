"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({children,className=""}:{children:React.ReactNode;delay?:number;className?:string}) {
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={false} whileInView={reduce?{}:{y:[8,0]}} viewport={{once:true,amount:.1}} transition={{duration:.4}}>{children}</motion.div>;
}
