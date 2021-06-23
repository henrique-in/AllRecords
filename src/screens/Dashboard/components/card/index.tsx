import React, { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';

import {List, Switch} from 'react-native-paper'
import { Icon, ListItem } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

import { BarChart, Grid, LineChart, PieChart, StackedBarChart, XAxis } from 'react-native-svg-charts'
import { VictoryBar, VictoryChart, VictoryPie, VictoryTheme } from "victory-native";

import { color } from '~/theme/colors';

import { styles } from './styles';

import  * as request from '~/models/requests'
import { useAuth } from '~/hooks/auth';
import ModalHours from '../create-hour';
import moment from 'moment';


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

    const {user} = useAuth()
    const [hourData, setHourData] = useState()
    const [totalHours, setTotalHours] = useState()

    const [value, setValue] = useState<any[]>([])

    const [projectData, setProjectData] = useState(null)

    const [loading, setLoading] = useState(false)


    const openModal = (item: any) =>{
        setProjectData(item)
      }
   

  const toogleBoolean = async() => {
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

const loadHours = async() =>{
    try {
       
       const response = await request.AllHours()
       const result = await response.data.filter((item : any)=> item.project === `${data._id}`)
       setHourData(result)
       var hours = result.reduce((a: any, b: { hours: any; }) => a + b.hours, 0)
       setTotalHours(hours)
     
      setValue(result.map(({hours, day}) => ({text: moment(day).format('DD/MM') , value: hours}) ))
      
     console.log(value)
    } catch (error) {
        
    }
}

const reloadAll = () =>{
    load()
    loadHours()
}

const removeHour = async() =>{
    try {
        const result = await request.addHour({
            hours: 20,
            day:'54' ,
            project:data._id,
            user: user._id
            })
       
    } catch (error) {
        
    }
}

function order(a: { text: string; },b: { text: string; }) {
    return a.text > b.text
  }


  return (
      <View style={styles.container}>
          <List.Accordion 
          title={data.name} 
          titleStyle={{color:data.active ? color.green : color.white, fontSize:19, fontWeight:'bold'}}
          style={{backgroundColor:color.primary}}
          onPress={loadHours}
          >
        
             <View style={{height:RFValue(300), backgroundColor:color.primary, padding:5}}>

                <View 
                style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:'100%'}}>
                    <View style={{flexDirection:'row', alignItems:'center',}}>
                        <Text style={styles.text}>
                            Projeto {data.active ? "Ativo": "Inativo"}
                            </Text>
                        <Switch style={{marginLeft:10}} value={data.active}  color={color.skyBlue} onValueChange={toogleBoolean} />  
                        </View> 

                        <Icon name="delete" size={20} reverse color={color.redLight} onPress={handleDelete}/>
                </View> 

                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:'100%'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={styles.text}>Total de horas: {totalHours ? totalHours : '0'}</Text>
                            
                        </View>
                        {/* <Icon 
                            name="add"
                            size={25}
                            containerStyle={{backgroundColor:color.white,borderRadius:50, marginLeft:5}}
                            onPress={()=> openModal(data)}
                            /> */}
                         <Icon name="add" size={20} raised color={color.background}  onPress={()=> openModal(data)}/>
                 
                </View> 
        
                {/* <Text style={{fontWeight:'bold',color:color.white,fontSize:18, alignSelf:'center'}}>Horas utilizadas por dia</Text>
                <ScrollView  showsVerticalScrollIndicator={false}>
                    <FlatList
                    data={hourData}
                    keyExtractor={item => item._id}
                    renderItem={({item})=> (
                        <ListItem 
                        bottomDivider
                        containerStyle={{backgroundColor:'transparent'}}
                        >
                            <ListItem.Content>
                                <ListItem.Title style={{color:color.white, fontWeight:'bold'}}>
                                {item.day}
                                </ListItem.Title>
                                <ListItem.Subtitle style={{color:color.white}}>
                                    {item.hours} horas
                                </ListItem.Subtitle>
                            
                            </ListItem.Content>
                            <Icon name="delete" size={19} raised color={color.redLight} onPress={handleDelete}/>
                        </ListItem>
                    )}
                    />    
                </ScrollView> */}
      
        {
            value.length > 1 ?
            <View style={{width:'100%', alignItems:'center'}}>
                <VictoryChart  
                    width={RFValue(350)} height={200} 
                    theme={VictoryTheme.grayscale}
                     >

                    <VictoryBar 
                    style={{ data: { fill:"#FFF" }}}
                    data={value} 
                    x="text" 
                    y="value"
                    />
                </VictoryChart>
            </View> 
            :
            <View style={{height:"40%",width:'100%', alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:color.white, fontSize:18}}>Sem dados para renderizar</Text>
            </View> 
        }
                
           </View>
          
    

          

          </List.Accordion>
          <ModalHours  isVisible={projectData !== null} item={projectData} onClose={()=>openModal(null)} load={()=> reloadAll()}  />
      </View>
  );
}

export default Card;