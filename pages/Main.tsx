import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import SwitchBar from '../components/SwitchBar';
import {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
import {LineChart} from 'react-native-chart-kit';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBars,
  faCloudSun,
  faExpand,
  faHammer,
  faMicrochip,
  faTemperature0,
} from '@fortawesome/free-solid-svg-icons';
import Chart from '../components/Chart';
import BoxComponent from '../components/BoxComponent';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../components/HeaderComponent';
import {useSelector} from 'react-redux';

const Main = () => {
  const [data, setData] = useState([0, 0, 0, 0, 0, 0]);
  const broker = useSelector(state => state.config.broker);
  useEffect(() => {
    MQTT.createClient({
      uri: 'ws://broker.emqx.io:1883',
    })
      .then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg);
        });

        client.on('connect', function () {
          console.log('connected');
          //client.subscribe('@msg/TestTopic', 0);
          client.subscribe('/gravitech_test', 0);

          //
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  });
  return (
    <SafeAreaView>
      <HeaderComponent />
      <Text>{broker}</Text>
      <View
        style={{
          width: '100%',
          height: 50,
          marginBottom: 10,
        }}>
        <LinearGradient
          colors={['rgba(177, 175, 56, 1)', 'rgba(185, 196, 31, 1)']}
          style={{
            width: '90%',
            height: 40,
            margin: 'auto',
            padding: '2%',
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#FFFFFF',
            }}>
            Kidbright Board
          </Text>
        </LinearGradient>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <BoxComponent
          title={'Light Sensor'}
          icon={faCloudSun}
          keyTopic={'test_a'}
          colors={['rgba(247, 243, 243, 1)', 'rgba(224, 215, 215, 1)']}
        />
        <BoxComponent
          title={'Temperature Sensor'}
          icon={faTemperature0}
          keyTopic={'temp'}
          colors={['rgba(247, 243, 243, 1)', 'rgba(224, 215, 215, 1)']}
        />
      </View>
      <Chart />

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            MQTT.createClient({
              uri: 'ws://broker.emqx.io:1883',
            })
              .then(function (client) {
                client.on('connect', function () {
                  console.log('connected');
                  client.publish(
                    '/gravitech_test',
                    "{'switch_1':'1'}",
                    0,
                    false,
                  );
                  client.disconnect();
                  //
                });

                client.connect();
              })
              .catch(function (err) {
                console.log(err);
              });
          }}>
          {({pressed}) => <SwitchBar pressed={pressed} />}
        </Pressable>
        <Pressable
          onPress={() => {
            setData([
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
              Math.random() * 100,
            ]);
          }}
          style={{
            position: 'absolute',
            right: 0,
          }}>
          {({pressed}) => <SwitchBar pressed={pressed} />}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Main;
