import type { NextConfig } from "next";
// Next.js needs inline styles for image sizing and Framer Motion. Inline scripts
// bootstrap App Router hydration; eval is permitted only by the local dev server.
const csp=["default-src 'self'",`script-src 'self' 'unsafe-inline'${process.env.NODE_ENV==='development'?" 'unsafe-eval'":""}`,"style-src 'self' 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self'","connect-src 'self'","frame-src 'none'","frame-ancestors 'none'","object-src 'none'","base-uri 'self'","form-action 'self'"].join('; ');
const config:NextConfig={outputFileTracingRoot:process.cwd(),poweredByHeader:false,async headers(){return [{source:"/(.*)",headers:[{key:"Content-Security-Policy",value:csp},{key:"X-Frame-Options",value:"DENY"},{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=(), payment=()"}]}]}};
export default config;
