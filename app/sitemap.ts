import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap{return ["","/about","/programmes","/experience","/leadership","/partners","/contact"].map(path=>({url:`https://sharedyouth.com${path}`,changeFrequency:"monthly",priority:path?0.8:1}));}
