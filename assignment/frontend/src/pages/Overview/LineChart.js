import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
    return (
        <Line data={props.data} />
    );
};

export default LineChart;
