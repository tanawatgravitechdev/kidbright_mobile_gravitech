import {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import MQTT from 'sp-react-native-mqtt';

const Chart = () => {
  const [dataSerie, setDataSerie] = useState([0, 10, 20, 0]);
  const [labels, setLabels] = useState(['a','a','a','a']);

  useEffect(() => {
    MQTT.createClient({
      uri: 'ws://broker.emqx.io:1883',
    }).then(function (client) {
      client.on('connect', function () {
        client.subscribe('/gravitech_test_serie', 0);
      });

      client.on('message', function (msg) {
        const temp = dataSerie;
        temp.shift();
        temp.push(parseInt(msg['data']));
        setDataSerie([temp[0], temp[1], temp[2], temp[3]]);
        console.log('data:', msg['data'], temp);
      });

      client.connect();
    });
  }, []);

  useEffect(() => {
    console.log('>>:', dataSerie);
  }, [dataSerie]);
  return (
    <View>
      <View style={{
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
        <Text style={{
            color: '#FFFFFF'
        }}>Sensor</Text>
      </View>
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: dataSerie,
            },
            {
              data: [90],
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
