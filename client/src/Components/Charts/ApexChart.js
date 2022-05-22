import ReactApexChart from 'react-apexcharts';
import React from 'react';
export default class ApexChart extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [
				{
					name: props.name,
					data: props.y,
				},
			],

			options: {
				chart: {
					id: props.id,
					group: 'social',
					type: 'line',
					zoom: {
						enabled: false,
					},
				},
				dataLabels: {
					enabled: false,
				},
				stroke: {
					curve: 'straight',
				},
				title: {
					text: props.title,
					align: 'left',
				},
				grid: {
					row: {
						colors: ['#f3f3f3', 'transparent'],
						opacity: 0.5,
					},
				},
				xaxis: {
					categories: props.x,
				},
			},
		};
	}

	render() {
		return (
			<ReactApexChart
				options={this.state.options}
				series={this.state.series}
				type="line"
				height={450}
				width="90%"
			/>
		);
	}
}
