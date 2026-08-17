const Avatar = ({ src, alt, fallback }) => {
    return (
        <div className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-600 shadow-sm border border-gray-500">
            {src ? (
                <img src={src} alt={alt} className="h-full w-full object-cover" />
            ) : (
                <span className="font-medium text-gray-200 text-sm uppercase">
                    {fallback ? fallback.substring(0, 2) : '?'}
                </span>
            )}
        </div>
    );
};

export default Avatar;
