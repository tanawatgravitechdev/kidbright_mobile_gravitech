import {faClose, faRepeat, faSave} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  const navigation = useNavigation();
  const [broker, setBroker] = useState('');
  const [port, setPort] = useState('');
  const [client, setClient] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const dispatch = useDispatch();

  const style = StyleSheet.create({
    textInput: {
      width: '80%',
      backgroundColor: '#FFFFFF50',
      borderColor: '#FFFFFF',
      borderWidth: 2,
      borderRadius: 15,
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 0,
      paddingBottom: 0,
    },
    label: {
      justifyContent: 'center',
      width: '20%',
    },
  });

  async function loaddata() {
    const tempBroker = await AsyncStorage.getItem('@gravitech:broker');
    const tempPort = await AsyncStorage.getItem('@gravitech:port');
    setBroker(tempBroker);
    setPort(tempPort);
  }
  useEffect(() => {
    loaddata();
  }, []);

  const saveData = async () => {
    await AsyncStorage.setItem('@gravitech:broker', broker);
    await AsyncStorage.setItem('@gravitech:port', port);
    dispatch({type: 'set_broker', payload: broker});
    dispatch({type: 'set_port', payload: parseInt(port)});
    ToastAndroid.showWithGravity('successful', 1, ToastAndroid.BOTTOM);
  };
  return (
    <SafeAreaView>
      <View
        style={{
          width: '100%',
          height: 60,
          backgroundColor: '#FFFFFF',
          shadowColor: '#aaa4a4',
          shadowOpacity: 0.8,
          shadowRadius: 10,
          shadowOffset: {
            width: 10,
            height: 30,
          },
          elevation: 10,
          zIndex: 10,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            width: 60,
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
          }}
          onPress={() => {
            navigation.goBack();
          }}>
          <FontAwesomeIcon icon={faClose} />
        </TouchableOpacity>
      </View>
      <View>
        <View
          style={{
            width: '70%',
            position: 'relative',
            margin: 'auto',
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: '#FFFFFF50',
            borderRadius: 20,
          }}>
          <View
            style={{
              height: 100,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Setting
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              marginBottom: 10,
            }}>
            <View style={style.label}>
              <Text style={{fontSize: 11, fontWeight: 'bold'}}>
                MQTT Broker
              </Text>
            </View>
            <View style={style.textInput}>
              <TextInput
                editable
                placeholder="broker.emqx.io"
                value={broker}
                onChangeText={text => setBroker(text)}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              marginBottom: 10,
            }}>
            <View style={style.label}>
              <Text style={{fontSize: 11, fontWeight: 'bold'}}>MQTT Port</Text>
            </View>
            <View style={style.textInput}>
              <TextInput
                editable
                placeholder="1883"
                onChangeText={text => setPort(text)}
                value={port}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              marginBottom: 10,
            }}>
            <View style={style.label}>
              <Text style={{fontSize: 11, fontWeight: 'bold'}}>
                MQTT Client
              </Text>
            </View>
            <View style={style.textInput}>
              <TextInput editable placeholder="none" />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              marginBottom: 10,
            }}>
            <View style={style.label}>
              <Text style={{fontSize: 11, fontWeight: 'bold'}}>MQTT User</Text>
            </View>
            <View style={style.textInput}>
              <TextInput editable placeholder="none" />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              margin: 'auto',
              marginBottom: 10,
            }}>
            <View style={style.label}>
              <Text style={{fontSize: 11, fontWeight: 'bold'}}>MQTT Pass</Text>
            </View>
            <View style={style.textInput}>
              <TextInput editable placeholder="none" />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                saveData();
              }}>
              <LinearGradient
                colors={['#8cc014', '#df9a1a']}
                style={{
                  height: 40,
                  borderRadius: 15,
                  width: '95%',
                  margin: 'auto',
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesomeIcon
                  icon={faSave}
                  style={{color: '#FFFFFF', marginRight: 5}}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    alignItems: 'center',
                    fontWeight: 'bold',
                  }}>
                  Save
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <FontAwesomeIcon
                icon={faRepeat}
                size={10}
                color="#776565"
                style={{
                  marginRight: 5,
                }}
              />
              <Text
                style={{
                  color: '#776565',
                  fontSize: 10,
                  marginRight: 10,
                }}>
                Reset
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
