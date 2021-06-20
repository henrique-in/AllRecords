import React from 'react';
import { View } from 'react-native';
import { AuthRoutes } from './router/auth.routes';
import { PrivateRoutes } from './router/private.routes';


if(__DEV__) {
  import('../reactotron-config')
}


const App: React.FC = () => {
  return <AuthRoutes/>;
}

export default App;