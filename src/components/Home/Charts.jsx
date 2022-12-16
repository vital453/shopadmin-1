import React from 'react';
import {  Inject,  AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationChartComponent, AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip } from '@syncfusion/ej2-react-charts';


const Chart = ({ id, data, legendVisiblity }) => {

    return (
        <AccumulationChartComponent
        id={id}
        legendSettings={{ visible: legendVisiblity, background: 'white' }}
        height={"430px"}
        width={"330px"}
        background={'#fff'}
        tooltip={{ enable: true }}
      >
        <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
        <AccumulationSeriesCollectionDirective>
          <AccumulationSeriesDirective
            name="Sale"
            dataSource={data}
            xName="x"
            yName="y"
            innerRadius="40%"
            startAngle={0}
            endAngle={360}
            radius="70%"
            explode
            explodeOffset="10%"
            explodeIndex={2}
            dataLabel={{
              visible: true,
              name: 'text',
              position: 'Inside',
              font: {
                fontWeight: '600',
                color: '#fff',
              },
            }}
          />
        </AccumulationSeriesCollectionDirective>
      </AccumulationChartComponent>
    );
}

export default Chart;