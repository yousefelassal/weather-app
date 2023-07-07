import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const COLORS = ['#0088FE', '#dff0ff'];

export default class Example extends PureComponent {
  render() {
    const data = [
        { name: 'Group A', value: this.props.value },
        { name: 'Group B', value: 100-this.props.value },
    ];
    return (
      <PieChart width={100} height={100} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={40}
          cy={50}
          innerRadius={30}
          outerRadius={40}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}