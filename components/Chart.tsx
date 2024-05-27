import {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from 'react-redux';
import MQTT from 'sp-react-native-mqtt';

const Chart = () => {
  const series = useSelector(state => state.series.series);
  const value_series = useSelector(state => state.series.value_series);
  const [dataSerie, setDataSerie] = useState(series);
  const [labels, setLabels] = useState(['5s','4s','3s', '2s', '1s', 'now']);

  useEffect(() => {
    console.log('>>:', dataSerie);
  }, [dataSerie]);

  return (
    <View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: '#FFFFFF50',
          zIndex: 99,
          width: '20%',
          marginLeft: '40%',
          marginTop: 20,
          alignItems: 'center',
          borderRadius: 5,
          padding: 2,
        }}>
        <Text
          style={{
            color: '#FFFFFF',
          }}>
          Realtime
        </Text>
      </View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: series,
            },
            {
              data: [90],
              withDots: false,
            },
            {
              data: [0],
              withDots: false,
            },
          ],
        }}
        width={
          Dimensions.get('window').width -
          (Dimensions.get('window').width * 1) / 100
        }
        height={200}
        chartConfig={{
          backgroundGradientFrom: 'rgba(250, 13, 13, 0.938)',
          backgroundGradientTo: 'rgba(193, 211, 35, 0)',
          color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
          propsForDots: {
            r: '4',
            stroke: '#FFFFFF',
          },
        }}
        bezier
        style={{
          margin: 10,
          borderRadius: 15,
        }}
      />
    </View>
  );
};

export default Chart;
