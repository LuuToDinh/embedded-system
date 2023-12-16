import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    return (
        <Bar data={props.data} />
    )
}

export default BarChart