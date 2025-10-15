import { ReactNode } from "react";

 
interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' ,
  children
}: SectionHeaderProps) => {
  return (
    <div className={`section-header section-header--${align} ${className}`}>
     {title && ( <h2 className="section-header__title">{title}</h2>)}
      {subtitle && (
        <p className="section-header__subtitle">{subtitle}</p>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;