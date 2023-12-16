import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { AiOutlineAreaChart } from 'react-icons/ai';
import { BsBarChartFill } from 'react-icons/bs';

const Chart = (props) => {
    return (
        <>
            <div>
                {
                    props.typeChart ? <BarChart data={props.dataChart} /> : <LineChart data={props.dataChart} />
                }
                <div className="text-center mt-2">
                    <button onClick={props.handleChangeTypeChart} className="inline-block rounded bg-gray-800 px-2 py-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]">
                        {
                            props.typeChart ? <AiOutlineAreaChart className="text-base" /> : <BsBarChartFill className="text-base" />
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Chart