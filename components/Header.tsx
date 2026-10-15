"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
export default function Header(){
 const [open,setOpen]=useState(false); const path=usePathname(); const button=useRef<HTMLButtonElement>(null);
 useEffect(()=>{setOpen(false)},[path]);
 useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);button.current?.focus()}};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
 return <header className="site-header"><div className="container-shell header-inner">
 <Link href="/" aria-label="SFYA home" className="brand"><Image className="brand-full" src="/sfya-logo.png" alt="Shared Futures Youth Alliance" width={310} height={103} priority/><Image className="brand-icon" src="/sfya-icon.png" alt="Shared Futures Youth Alliance" width={54} height={54} priority/></Link>
 <nav aria-label="Main navigation" className="desktop-nav">{nav.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined}>{label}</Link>)}</nav>
 <Link href="/contact" className="button button-gold header-cta">Let’s work together <ArrowUpRight size={16}/></Link>
 <button ref={button} className="menu-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open?"Close navigation":"Open navigation"}>{open?<X/>:<Menu/>}</button>
 </div>{open&&<nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav container-shell">{nav.map(([label,href])=><Link key={href} href={href} aria-current={path===href?'page':undefined} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={18}/></Link>)}</nav>}</header>
}
