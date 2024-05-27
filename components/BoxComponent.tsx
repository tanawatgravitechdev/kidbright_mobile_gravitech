import {faCloudSun, faSun} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {ProgressChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import MQTT from 'sp-react-native-mqtt';

const BoxComponent = props => {
  const [dataValue, setDataValue] = useState([0]);
  const temperature = useSelector(state => state.series.temp);
  const light = useSelector(state => state.series.light);

  useEffect(() => {
    /*
    MQTT.createClient({
      uri: 'ws://broker.emqx.io:1883',
    }).then(function (client) {
      const keyTemp = '/gravitech_test_' + props.keyTopic;
      client.on('connect', function () {
        console.log('connect', keyTemp);
        client.subscribe(keyTemp, 0);
      });

      client.on('message', function (msg) {
        console.log('data:>', msg['data']);
        setDataValue([parseFloat(msg['data'])]);
      });

      client.connect();
    });
    */
  }, []);

  useEffect(() => {
    console.log('34:', dataValue);
  }, [dataValue]);
  return (
    <>
      <LinearGradient
        colors={props.colors}
        style={{
          width: '45%',
          height: 150,
          marginLeft: '3%',
          backgroundColor: '#fffafaff',
          borderRadius: 15,
        }}>
        <Text
          style={{
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
            textAlign: 'center',
            margin: 0,
            shadowColor: '#272424',
            shadowOpacity: 0.8,
            shadowOffset: {
              width: 10,
              height: 10,
            },
            elevation: 3,
          }}>
          {props.title}&nbsp;
        </Text>
        <Text
          style={{
            position: 'absolute',
            left: '45%',
            top: 23,
            fontWeight: 'bold',
          }}>
          {props.title == 'Temperature Sensor'
            ? parseInt(temperature)
            : parseInt(light)}
        </Text>
        <FontAwesomeIcon
          icon={props.icon}
          style={{
            position: 'absolute',
            bottom: 52,
            left: 76,
          }}
          color="rgba(241, 37, 10, 1)"
        />
        <ProgressChart
          data={{
            labels: ['a'],
            data: [
              props.title == 'Temperature Sensor'
                ? temperature / 100
                : light / 100,
            ],
          }}
          width={Dimensions.get('window').width}
          height={220}
          strokeWidth={16}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            backgroundColor: '#251d1d',
            color: (opacity = 1) => `rgba(124, 95, 15, 0.678)`,
          }}
          style={{
            left: -60,
            bottom: 20,
          }}
        />
        <Text>a</Text>
      </LinearGradient>
    </>
  );
};

export default BoxComponent;
