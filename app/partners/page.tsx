import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CallToAction from "@/components/CallToAction";
import { Users, GraduationCap, Landmark, Globe2, Network, BriefcaseBusiness } from "lucide-react";
const partners=[
 [Users,"Communities","Local knowledge, shared ownership. Working with community leaders, adolescents, youth and women to shape priorities and youth-led initiatives."],
 [GraduationCap,"Schools","Spaces to learn and lead. Connecting education with mentoring, school clubs, life skills and meaningful adolescent participation."],
 [Landmark,"Government","Connecting youth voices with local structures, civic participation and community planning to support inclusive development."],
 [Globe2,"UN & donors","Shared ambition for lasting change. Opportunities to support youth leadership, women’s empowerment and community resilience."],
 [Network,"NGOs & youth networks","Stronger through connection. Bringing together peer networks, complementary expertise and community engagement."],
 [BriefcaseBusiness,"Private sector & academia","Opening pathways to opportunity through skills, training, career guidance, apprenticeships and entrepreneurship."]
] as const;
export default function Page(){return <><PageHero eyebrow="Working together" title="Partnership is how change grows." body="Progress is a shared effort. We connect communities, institutions and sectors around the potential of adolescents, young people and women."/><section className="section"><div className="container-shell"><div className="section-heading"><div><p className="eyebrow">Our partnership approach</p><h2 className="section-title">Different strengths.<br/>Shared purpose.</h2></div><p>These are the partner categories in our organizational profile. Let’s explore where our priorities meet.</p></div><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{partners.map(([Icon,title,text],i)=><article className="partner-card" key={title}><div className="partner-icon"><Icon size={31}/><span>0{i+1} / CONNECT</span></div><h2>{title}</h2><p>{text}</p></article>)}</div></div></section><CallToAction/></>}

export const metadata: Metadata = {"title": "Partner With SFYA", "description": "Connect with SFYA through community, school, government, donor, NGO, youth network, private sector and academic partnerships.", "alternates": {"canonical": "/partners"}, "openGraph": {"title": "Partner With SFYA | SFYA", "description": "Connect with SFYA through community, school, government, donor, NGO, youth network, private sector and academic partnerships.", "url": "/partners", "images": [{"url": "/og-image.png", "width": 1200, "height": 630, "alt": "Shared Futures Youth Alliance"}]}};
