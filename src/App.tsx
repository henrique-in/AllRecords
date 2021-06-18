import React from 'react';
import { View } from 'react-native';
import Sign from './screens/Sign';


if(__DEV__) {
  import('../reactotron-config')
}


const App: React.FC = () => {
  return <Sign/>;
}

export default App;