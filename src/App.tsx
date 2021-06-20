import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppProvider from './hooks';
import Routes from './router';
import { AuthRoutes } from './router/auth.routes';
import { PrivateRoutes } from './router/private.routes';
import { color } from './theme/colors';


if(__DEV__) {
  import('../reactotron-config')
}


const App: React.FC = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 1000);
  // }, []);

  return(
     <NavigationContainer >
        <StatusBar barStyle='light-content' backgroundColor={color.background} />
        <AppProvider>
          <View style={{flex:1,backgroundColor:color.background}}>
            <Routes/>
          </View>
        </AppProvider>
     </NavigationContainer>
     );
}



export default App;