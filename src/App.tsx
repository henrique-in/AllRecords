import React from 'react';
import { View } from 'react-native';
import { AuthRoutes } from './router/auth.routes';
import {SignIn} from './screens/Sign-in';


if(__DEV__) {
  import('../reactotron-config')
}


const App: React.FC = () => {
  return <AuthRoutes/>;
}

export default App;