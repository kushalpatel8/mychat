const MainLayout = ({ children }) => {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#121214] text-[#E5E7EB]">
            {children}
        </div>
    );
};

export default MainLayout;
