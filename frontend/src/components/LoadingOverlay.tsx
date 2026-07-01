const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

            <div className="bg-white rounded-xl shadow-xl p-10 w-[420px] text-center">

                <div className="w-12 h-12 mx-auto border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>

                <h2 className="text-2xl font-semibold mb-3">
                    Importing Products
                </h2>

                <p className="text-gray-600">
                    Please wait while we import the CSV into the database.
                </p>

                <p className="text-gray-600 mt-2">
                    This may take up to <strong>5 minutes</strong>.
                </p>

                <p className="text-sm text-gray-500 mt-4">
                    Please do not refresh or close this page.
                </p>

            </div>

        </div>
    );
};

export default LoadingOverlay;