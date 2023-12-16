import Navbar from "./Navbar"

const DefaultLayout = ({ Component }) => {
    return (
        <>
            <div className="grid grid-cols-10">
                <div className="col-span-2">
                    <Navbar />
                </div>
                <div className="col-span-8 px-4 py-6 bg-gray-200">
                    <Component />
                </div>
            </div>
        </>
    )
}

export default DefaultLayout