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
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const Main = () => {
  const [clientRef, setClientRef] = useState(null);
  const [data, setData] = useState([0, 0, 0, 0, 0, 0]);

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
      <Image
        source={require('./../assets/images/banner.png')}
        style={{
          width: 300,
          height: 100,
          margin: 'auto',
          marginTop: 20,
          marginBottom: 20,
        }}
      />

      <LineChart
        data={{
          labels: ['a', 'b', 'c', 'd', 'e', 'f'],
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={
          Dimensions.get('window').width -
          (Dimensions.get('window').width * 1) / 100
        }
        height={220}
        yAxisInterval={10}
        chartConfig={{
          backgroundColor: '#054541',
          backgroundGradientFrom: '#ec0854',
          backgroundGradientTo: '#e0e410',
          color: (opacity = 1) => `rgba(255,255,255,${opacity})`,
        }}
        bezier
        style={{
          margin: 10,
          borderRadius: 15,
        }}
      />

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
