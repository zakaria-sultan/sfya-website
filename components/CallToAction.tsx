import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function CallToAction(){return <section className="cta-section"><div className="container-shell"><div><p className="eyebrow">A shared future starts with us</p><h2>Build possibility.<br/>Together.</h2><p>Connect with SFYA to advance youth-led, community-led development.</p></div><Link className="button button-gold" href="/contact">Explore a partnership <ArrowUpRight size={19}/></Link></div></section>}
