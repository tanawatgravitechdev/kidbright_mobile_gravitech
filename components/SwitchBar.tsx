import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-svg';

const SwitchBar = ({pressed}) => {
  const style = StyleSheet.create({
    container: {
      backgroundColor: '#c5c0c0',
      width: 50,
      height: 50,
      borderRadius: 10,
      margin: 10,
      zIndex: 99,
      position: 'relative',
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: '#252424',
      borderRadius: 10,
      margin: 5,
      shadowColor: '#000000',
      shadowOpacity: 1,
      shadowRadius: 1,
      shadowOffset: {
        width: 5,
        height: 20,
      },
      elevation: 5,
    },
    button: {
      width: '50%',
      height: '50%',
      position: 'absolute',
      backgroundColor: '#000000',
      marginLeft: '25%',
      marginTop: '25%',
      borderRadius: 90,
      shadowColor: '#97b1a5',
      shadowOffset: {
        width: 10,
        height: 20,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 4,
    },
  });
  return (
      <View style={style.container}>
        <View style={[style.dot]}></View>
        <View
          style={[
            style.dot,
            {
              position: 'absolute',
              right: 0,
            },
          ]}></View>
        <View
          style={[
            style.dot,
            {
              position: 'absolute',
              right: 0,
              bottom: 0,
            },
          ]}></View>
        <View
          style={[
            style.dot,
            {
              position: 'absolute',
              bottom: 0,
            },
          ]}></View>
        <View
          style={[
            {transform: pressed ? 'scale(.9)' : 'scale(1)', zIndex: 199},
            style.button,
          ]}></View>
      </View>
  );
};

export default SwitchBar;
