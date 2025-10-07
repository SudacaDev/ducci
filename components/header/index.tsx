'use client';

import { NAV } from "@/constants/nav";
import { MENU } from "@/types/nav.type";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();
    
    // Debug: Ver qué valor tiene pathname
    console.log('Pathname actual:', pathname);

 
    const isActive = (url: string) => {
    
        if (url === '/' || url === MENU.HOME) {
            return pathname === '/' || pathname === MENU.HOME;
        }
       
        return pathname === url || pathname.startsWith(url + '/');
    };

    return (
        <header className="header bg-primary-color-light">
            <div className="flex justify-center items-center m-auto navBar container px-4 nav-wrapper">
                <div className="item">
                    <Link href={MENU.HOME} aria-label="Ir a inicio">
                        logo
                    </Link>
                </div>
                
                <nav aria-label="Navegación principal">
                    <ul className="flex gap-12">
                        {NAV.map((item) => {
                            const active = isActive(item.url);
                            
                            return (
                                <li key={item.id}>
                                    <Link 
                                        href={item.url}
                                        aria-current={active ? 'page' : undefined}
                                        className={active ? 'active item' : 'item'}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;