import {
  faBars,
  faExpand,
  faHammer,
  faInfo,
  faInfoCircle,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useNavigation} from '@react-navigation/native';
import {Image, Pressable, View} from 'react-native';

const HeaderComponent = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        marginBottom: 20,
        shadowColor: '#afa2a2',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
          width: 10,
          height: 50,
        },
        elevation: 10,
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Pressable
          onPress={() => {
            navigation.navigate('Setting');
          }}
          style={{
            width: 10,
            height: 10,
            padding: 20,
          }}>
          <FontAwesomeIcon icon={faBars} />
        </Pressable>
        <Pressable
          style={{
            width: 10,
            height: 10,
            padding: 10,
            right: 20,
            top: 10,
            position: 'absolute',
          }}>
          <FontAwesomeIcon icon={faInfoCircle} color='#534d4d'/>
        </Pressable>
      </View>
      <FontAwesomeIcon
        icon={faHammer}
        size={70}
        color={'#DDDDDD40'}
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
        }}
      />
      <FontAwesomeIcon
        icon={faMicrochip}
        size={90}
        color={'#DDDDDD30'}
        style={{
          position: 'absolute',
          right: -20,
          bottom: -10,
          transform: [{rotate: '45deg'}],
        }}
      />
      <Image
        source={require('./../assets/images/banner.png')}
        style={{
          width: 160,
          height: 40,
          margin: 'auto',
          marginTop: 0,
          marginBottom: 20,
        }}
      />
    </View>
  );
};

export default HeaderComponent;
