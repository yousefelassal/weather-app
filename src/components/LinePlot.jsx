import { LineChart, Line } from 'recharts';

const LinePlot = ({data}) => {
    return (
    <LineChart width={250} height={250} data={data}>
        <Line type="monotone" dataKey="temp_c" stroke="#25629D" />
    </LineChart>
    );
}

export default LinePlot;