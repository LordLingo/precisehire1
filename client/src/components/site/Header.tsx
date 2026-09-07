import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown } from "lucide-react";
import { NAV_PRIMARY, COMPANY, type NavItem } from "@/content/site";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Preserve the existing client portal URL and new-tab behavior exactly.
const CLIENT_LOGIN_URL = "https://dot.precisehire.com/login.php";
function ClientLogin({ className = "" }: { className?: string }) {
  return <a href={CLIENT_LOGIN_URL} target="_blank" rel="noopener noreferrer" className={className}>Client sign in</a>;
}
export function Brand() {
  return <Link href="/" className="ph-brand" aria-label="Precise Hire home"><img src="/brand/precisehire-logo-icon.png" alt="" width="48" height="40" /><span>Precise<span>Hire</span></span></Link>;
}
function DesktopItem({ item }: { item: NavItem }) {
  if (!item.children?.length) return <Link href={item.href}>{item.label}</Link>;
  return <DropdownMenu><DropdownMenuTrigger className="ph-nav-dropdown">{item.label}<ChevronDown aria-hidden="true" size={14} /></DropdownMenuTrigger><DropdownMenuContent align="start" className="ph-dropdown-panel"><DropdownMenuItem asChild><Link href={item.href}>All {item.label.toLowerCase()}</Link></DropdownMenuItem>{item.children.map(child => <DropdownMenuItem key={child.href} asChild><Link href={child.href} className="ph-dropdown-link"><strong>{child.label}</strong>{child.description && <span>{child.description}</span>}</Link></DropdownMenuItem>)}</DropdownMenuContent></DropdownMenu>;
}
export default function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  useEffect(() => { setOpen(false); }, [location]);
  return <header className="ph-header">
    <div className="ph-utility"><div className="container"><span>Helping employers hire with confidence since {COMPANY.established}.</span><div><a href={`tel:${COMPANY.phoneRaw}`}>{COMPANY.phone}</a></div></div></div>
    <div className="container ph-nav-shell"><Brand /><nav className="ph-desktop-nav" aria-label="Primary">{NAV_PRIMARY.map(item => <DesktopItem key={item.href} item={item}/>)}</nav><div className="ph-nav-actions"><ClientLogin className="ph-button ph-nav-login"/><Link href="/get-a-quote" className="ph-button ph-button-red ph-nav-quote">Get a quote</Link><Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="ph-menu-toggle" aria-label="Open menu"><Menu size={24}/></button></SheetTrigger><SheetContent className="ph-mobile-sheet" side="right"><SheetHeader><SheetTitle>PreciseHire</SheetTitle></SheetHeader><nav aria-label="Mobile" className="ph-mobile-nav">{NAV_PRIMARY.map(item => <div key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>{item.children?.map(child => <Link className="ph-mobile-child" key={child.href} href={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div>)}<ClientLogin className="ph-mobile-login"/><Link href="/get-a-quote" className="ph-button ph-button-red" onClick={()=>setOpen(false)}>Get a quote</Link><a href={`tel:${COMPANY.phoneRaw}`}>{COMPANY.phone}</a></nav></SheetContent></Sheet></div></div>
  </header>;
}
