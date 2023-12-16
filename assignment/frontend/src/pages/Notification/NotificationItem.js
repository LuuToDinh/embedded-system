import { Link } from 'react-router-dom'

const NotificationItem = ({ time, title, content }) => {
    const SpecificTime = () => {
        const specificTime = new Date(time)
        const formattedTime = specificTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        });
        const day = specificTime.getDate();
        const month = specificTime.toLocaleString('en-US', { month: 'long' });
        const year = specificTime.getFullYear();
        return formattedTime + ' ' + day + ' ' + month + ' ' + year
    }
    SpecificTime()
    return (
        <>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{SpecificTime()}</span>
            <div className="bg-green-100 mt-1 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex">
                    <div className="py-1"><svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                    <div>
                        <p className="font-bold">{title}</p>
                        <p className="text-sm">{content}</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default NotificationItem