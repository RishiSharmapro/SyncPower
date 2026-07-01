type SearchBarProps = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;

    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;

    uploadCSV: () => void;
};

const SearchBar = ({ search, setSearch, setSelectedFile, uploadCSV }: SearchBarProps) => {
    return (
        <div className="bg-white rounded-lg shadow border p-4 mb-6">

            <div className="flex gap-4">

                <input
                    type="file"
                    accept=".csv"
                    className="border rounded px-4 py-2"
                    onChange={(e) =>
                        setSelectedFile(
                            e.target.files ? e.target.files[0] : null
                        )
                    }
                />

                <button
                    onClick={uploadCSV}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Upload CSV
                </button>

                <input
                    type="text"
                    placeholder="Search Part Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border rounded px-4 py-2"
                />

            </div>

        </div>
    );
};

export default SearchBar;