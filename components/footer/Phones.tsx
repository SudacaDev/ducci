const Phones = () => {
    return (
        <div className="footer_social-content flex flex-col items-center md:items-start text-center md:text-left w-full">
            <p className="font-bold text-[1.125rem] text-[#f9e19b] mb-4">Teléfono</p>
            <div className="flex flex-col gap-5 w-full">
                <a href="tel:+543471385043" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-white hover:opacity-80 transition-opacity">
                    <span className="opacity-80 text-[0.95rem]">Ducci Gelateria CdG</span>
                    <strong className="text-[#f9e19b] font-semibold tracking-wide">3471 385043</strong>
                </a>
                <a href="tel:+543471319743" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-white hover:opacity-80 transition-opacity">
                    <span className="opacity-80 text-[0.95rem]">Ducci Gelateria Las Rosas</span>
                    <strong className="text-[#f9e19b] font-semibold tracking-wide">3471 319743</strong>
                </a>
                <a href="tel:+543476545573" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-white hover:opacity-80 transition-opacity">
                    <span className="opacity-80 text-[0.95rem]">Ducci Gelateria Totoras</span>
                    <strong className="text-[#f9e19b] font-semibold tracking-wide">3476 545573</strong>
                </a>
            </div>
        </div>
    );
};

export default Phones;
