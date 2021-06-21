import React from 'react';
import { Text, View } from 'react-native';

import {List, Switch} from 'react-native-paper'
import { Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

import { color } from '~/theme/colors';

import { styles } from './styles';

import  * as request from '~/models/requests'


export interface CardProps{
    name: string
    _id: string
    active: boolean
}

interface Props {
    data: CardProps 
    load: any
}

const Card: React.FC<Props> = ({data,load}) => {

  const handleActive = async() => {
      try {
          const result = await request.activeProject(data._id,{...data,active:!data.active})
          load()
      } catch (error) {
          
      }
  }

  const handleDelete = async() => {
    try {
        const result = await request.deleteProject(data._id)
        load()
    } catch (error) {
        
    }
}


  return (
      <View style={styles.container}>
          <List.Accordion 
          title={data.name} 
          titleStyle={{color:data.active ? color.green : color.white, fontSize:19, fontWeight:'bold'}}
          style={{backgroundColor:color.primary}}>
        
             <View style={{height:RFValue(240), backgroundColor:color.primary, padding:5}}>

                <View 
                style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:'100%'}}>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                    <Text style={{color:color.white, fontSize:16, fontWeight:'bold'}}>
                        Projeto {data.active ? "Ativo": "Inativo"}
                        </Text>
                    <Switch  value={data.active}  color={color.skyBlue} onValueChange={handleActive} />  
                    </View> 

                    <Icon name="delete" size={20} reverse color={color.redLight} onPress={handleDelete}/>

                 </View> 
                             
            


            </View>

          </List.Accordion>
      </View>
  );
}

export default Card;