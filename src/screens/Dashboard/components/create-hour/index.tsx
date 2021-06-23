import React, { useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity, View , Text} from 'react-native';
import { Button } from 'react-native-elements';
import { Modal, ModalProps,InputForm } from '~/components'
import { useAuth } from '~/hooks/auth';
import  * as request from '~/models/requests'
import { color } from '~/theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';



import { styles } from './styles';
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize';

interface ModalHoursProps extends ModalProps{
    item?:any
    load?:any
}




const ModalHours: React.FC<ModalHoursProps> = ({isVisible, onClose, item, load}) => {


    const {user} = useAuth()
    const [hour, setHour] = useState('')
    const [loading, setLoading] = useState(false)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      setShow(false)
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  


    // const handleCreate = async() =>{
    //     try {
    //     const result = await request.addHour({name: name})
    //         onClose()
    //         load()
    //         setName('')
    //     } catch (error) {
    //      Alert.alert("", "Ocorreu um erro , tente novamente")
    //     }
        
    // }


const addHours = async() =>{
    setLoading(true)
    try {
        const result = await request.addHour({
            hours: parseInt(hour),
            day:moment(date).format('YYYY-MM-DD') ,
            project:item._id,
            user: user._id
            })

        onClose()
        load()  
        setHour('')
    } catch (error) {
        Alert.alert('',"Ocorreu um erro, tente novamente")
    }
    setLoading(false)
}

        
    

  return(
      <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Adicione hora ao projeto"
     
      >
      <View style={{flex:1,marginTop:25, justifyContent:'center',alignItems:'center'}}>
        <InputForm
        placeholder="Digite o valor"
        label="Horas"
        keyboardType="number-pad"
        labelStyle={{color:color.white}}
        value={hour}
        onChangeText={text => setHour(text)}
        />


       <TouchableOpacity style={{width:'95%', padding:10}} onPress={showMode}>
         <Text style={{fontSize:18, color:color.white,fontWeight:'bold'}}>Data</Text>
         <Text style={{fontSize:18, color:color.white}}>{moment(date).format('YYYY-MM-DD')}</Text>
        </TouchableOpacity>
        {
         show &&   
            <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode='date'
          display={Platform.OS === 'ios' ? "inline" : "default"}
          onChange={onChange}
          style={{width:RFValue(250),marginBottom:Platform.OS == 'ios' ? -50  : 0 }}
          themeVariant="dark"
          textColor={color.white}
          locale="Pt-Br"
          minimumDate={new Date()}
        />}

        <Button
         title="Adicionar hora"
         titleStyle={{color:color.secondaryDark, fontWeight:'bold'}}
         buttonStyle={{backgroundColor:color.white}}
         containerStyle={{width:"95%"}}
         onPress={addHours}
         disabled={hour  ? false : true}
         loading={loading}
         loadingProps={{color:color.background}}
         

        />

      </View> 

      </Modal>
  );
}

export default ModalHours;