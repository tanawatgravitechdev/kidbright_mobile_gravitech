import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import SwitchBar from '../components/SwitchBar';
import {useEffect, useState} from 'react';
import MQTT from 'sp-react-native-mqtt';
import Display from '../components/Display';

const Main = () => {
  const [clientRef, setClientRef] = useState(null);
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
      <Text>a</Text>
      
      <Text>a</Text>
      <View>
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
        <Pressable>{({pressed}) => <SwitchBar pressed={pressed} />}</Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Main;
