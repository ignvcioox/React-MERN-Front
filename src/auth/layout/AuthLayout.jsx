export const AuthLayout = ({ children, title = '' }) => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full m-2 p-3.5 md:w-3/4 lg:w-1/4">
                <div className="mb-4">
                    <h1 className="text-center font-medium text-2xl text-gray-800 mb-4">{title}</h1>
                    {children}
                </div>
            </div>
        </div>
    )
}
