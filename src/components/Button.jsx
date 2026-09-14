const Button = ({ children, type = "button", onClick, variant = "primary" }) => {
    const baseStyle = "font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all w-full";
    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        danger: "bg-red-500 hover:bg-red-600 text-white"
    };

    return (
        <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]}`}>
            {children}
        </button>
    );
};

export default Button;