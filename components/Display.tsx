import {View} from 'react-native';

const LED = () => {
  return (
    <View
      style={{
        backgroundColor: '#494545',
        width: 15,
        height: 15,
        borderRadius: 90,
        margin: 2,
      }}></View>
  );
};
const Display = () => {
  const listTemp = new Array(16).fill(0);
  const element = listTemp.map((item, index) => <LED />);
  return (
    <View style={{
        backgroundColor: '#000000',
        width: 'auto',
        padding: 10,
        alignItems: 'center'
    }}>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
      <View style={{flexDirection: 'row'}}>{element}</View>
    </View>
  );
};

export default Display;
