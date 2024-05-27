import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {
  const [dataStorage, setDataStorage] = useState([0, 0, 0, 0, 0, 0]);
  const dispatch = useDispatch();
  const [broker, setBroker] = useState('');
  const [port, setPort] = useState('');
  const series = useSelector(state => state.series.series);

  const imageFirebase = [
    'https://firebasestorage.googleapis.com/v0/b/gravitech-car.appspot.com/o/img1.jpg?alt=media&token=',
    'https://firebasestorage.googleapis.com/v0/b/gravitech-car.appspot.com/o/img2.jpg?alt=media&token=',
    'https://firebasestorage.googleapis.com/v0/b/gravitech-car.appspot.com/o/img3.jpg?alt=media&token=',
    'https://firebasestorage.googleapis.com/v0/b/gravitech-car.appspot.com/o/img4.jpg?alt=media&token=',
  ]

  async function loaddata() {
    const tempBroker = await AsyncStorage.getItem('@gravitech:broker');
    const tempPort = await AsyncStorage.getItem('@gravitech:port');
    setBroker(tempBroker);
    setPort(tempPort);
  }

  useEffect(() => {
    console.log('__init__');
    connectMQTT();
  }, [broker, port]);

  useEffect(() => {
    console.log('>>', dataStorage);
  }, [dataStorage]);

  var mqttClient = null;

  async function connectMQTT() {
    MQTT.createClient({
      uri: broker + ':' + port,
    })
      .then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          if (msg['topic'] == '/gravitech_report') {
            const tempList = dataStorage;
            if (tempList.length >= 3) {
              tempList.shift();
            }
            tempList.push(parseFloat(msg['data']));
            dispatch({type: 'set_data_series', payload: tempList});
            dispatch({
              type: 'set_value_series',
              payload: parseFloat(msg['data']),
            });
            setDataStorage(tempList);
          } else if (msg['topic'] == '/gravitech_temp') {
            dispatch({
              type: 'set_temp',
              payload: parseFloat(msg['data']),
            });
          } else if (msg['topic'] == '/gravitech_light') {
            dispatch({
              type: 'set_light',
              payload: parseFloat(msg['data']),
            });
          }
        });

        client.on('connect', function () {
          mqttClient = client;
          console.log('connected',mqttClient.publish);
          //client.subscribe('@msg/TestTopic', 0);
          client.subscribe('/gravitech_report', 0);
          client.subscribe('/gravitech_temp', 0);
          client.subscribe('/gravitech_light', 0);
          //
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <SafeAreaView>
      <HeaderComponent />
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
            console.log('->1');
            mqttClient.publish('/gravitech_action', '1', 0, false);
          }}>
          {({pressed}) => <SwitchBar pressed={pressed} />}
        </Pressable>
        <Pressable
          onPress={() => {
            console.log('->2');
            mqttClient.publish('/gravitech_action', '2', 0, false);
          }}
          style={{
            position: 'absolute',
            right: 0,
          }}>
          {({pressed}) => <SwitchBar pressed={pressed} />}
        </Pressable>
      </View>
      <View style={{
        width: '100%',
        backgroundColor: '#928585',
        height: 100,
        marginTop: 10
      }}>
        <TouchableOpacity onPress={()=>{
          Linking.openURL('https://www.gravitechthai.com/')
        }}>

        
        <Image source={{uri: imageFirebase[Math.floor(Math.random()*4)]+(Math.floor(Math.random()*4))}} style={{ width: '100%', height: 70}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Main;
