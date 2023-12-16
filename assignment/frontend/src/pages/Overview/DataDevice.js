const DataDevice = ({ title, value, icon }) => {
    return (
        <div className="bg-white rounded-md shadow-lg">
            <div className="flex justify-between items-center p-4">
                <div>
                    <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded">{title}</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2">
                        <span className="bg-green-300 text-green-800 font-bold px-2.5 py-0.5 rounded">{value}</span>
                    </div>
                    <div className="text-3xl">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DataDevice