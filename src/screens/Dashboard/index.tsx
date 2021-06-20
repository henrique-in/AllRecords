import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '~/hooks/auth';
import { color } from '~/theme/colors';


import  * as request from '~/models/requests'

export const Dashboard: React.FC = () => {

  const {signOut} = useAuth()

  useEffect(() => {
   
  }, [])

  return( 
  <View style={{flex:1 , backgroundColor: color.secondaryDark, justifyContent:'center',alignItems:'center'}}>
      <Button title="logout" onPress={signOut} />
  </View>
  )
}

