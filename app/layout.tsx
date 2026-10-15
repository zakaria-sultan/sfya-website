import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const description="A youth-led organization founded in 2020, equipping adolescents, youth and women to lead, thrive and shape inclusive communities, with an East African outlook.";
export const metadata: Metadata={metadataBase:new URL("https://sharedyouth.com"),title:{default:"Shared Futures Youth Alliance | Youth-led change",template:"%s | SFYA"},description,alternates:{canonical:"/"},openGraph:{title:"Shared Futures Youth Alliance",description,url:"https://sharedyouth.com",siteName:"SFYA",type:"website",locale:"en_US",images:[{url:"/og-image.png",width:1200,height:630,alt:"Shared Futures Youth Alliance"}]},twitter:{card:"summary_large_image",title:"Shared Futures Youth Alliance",description,images:["/og-image.png"]},robots:{index:true,follow:true},icons:{icon:[{url:"/sfya-favicon-v2.ico",sizes:"any",type:"image/x-icon"},{url:"/sfya-favicon-32-v2.png",sizes:"32x32",type:"image/png"}],shortcut:"/sfya-favicon-v2.ico",apple:"/apple-icon.png"},manifest:"/manifest.webmanifest"};
export const viewport: Viewport={width:"device-width",initialScale:1,themeColor:"#082653"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><Header/><main id="main-content">{children}</main><Footer/></body></html>}
