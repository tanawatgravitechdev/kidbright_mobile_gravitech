import {Pressable, SafeAreaView, Text, View} from 'react-native';
import SwitchBar from '../components/SwitchBar';

const Main = () => {
  return (
    <SafeAreaView>
      <Text>a</Text>

      <View>
        <Pressable>{({pressed}) => <SwitchBar pressed={pressed} />}</Pressable>
        <Pressable>{({pressed}) => <SwitchBar pressed={pressed} />}</Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Main;
