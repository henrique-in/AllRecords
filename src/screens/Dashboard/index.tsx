import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList,  View } from 'react-native';
import { Button, Header, Icon, } from 'react-native-elements';
import { useAuth } from '~/hooks/auth';
import { color } from '~/theme/colors';



import Card from './components/card'

import  * as request from '~/models/requests'
import ModalCreate from './components/create-project';
import { ActivityIndicator } from 'react-native-paper';

var jwtDecode = require('jwt-decode')



export const Dashboard: React.FC = () => {

  const {signOut, user} = useAuth()

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  const [dados, setDados] = useState()

  
 console.log(user.email)

  const openModal = () =>{
    setVisible(!visible)
  }

  const Load = async() => {
    setLoading(true)
    try {
      const result = await request.getProject()

      setData(result.data)
    } catch (error) {
      
    }
    setLoading(false)
  }

  useEffect(() => {
   Load()
  }, [])

  return( 
  <View style={{flex:1 , backgroundColor: color.secondaryDark}}>
    <Header
    containerStyle={{backgroundColor:color.secondaryDark}}
    leftComponent={{text:"Projetos", style:{color:color.white,fontSize:18,fontWeight:'bold'}}}
    rightComponent={<Icon name="logout" size={30} color={color.redLight} onPress={signOut} />}
    />
    
    { loading && <ActivityIndicator color={color.white} size="large"/>}
   
    <FlatList
    data={data}
    keyExtractor={item => item._id}
    renderItem={({item})=> <Card load={()=>Load()} data={item} />}
    />

   <Icon 
    name='add'
    color={color.primary} 
    size={25} raised  
    containerStyle={{position:'absolute', right: 5, bottom:10}}
    onPress={()=> setVisible(true)}
    />
     <ModalCreate  isVisible={visible !== false} onClose={openModal} load={()=> Load()}  />
  </View>
  )
}

