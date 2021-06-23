import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Modal, ModalProps,InputForm } from '~/components'
import  * as request from '~/models/requests'
import { color } from '~/theme/colors';

import { styles } from './styles';

interface ModalCreateProps extends ModalProps{
    item?:any
    load?:any
}



const ModalCreate: React.FC<ModalCreateProps> = ({isVisible, onClose, item, load}) => {

    const [name, setName] = useState('')

    const handleCreate = async() =>{
        try {
        const result = await request.createProject({name: name})
            onClose()
            load()
            setName('')
        } catch (error) {
         Alert.alert("", "Ocorreu um erro , tente novamente")
        }
        
    }


  return(
      <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Cadastre um projeto"
     
      >
      <View style={{flex:1,marginTop:25, justifyContent:'center',alignItems:'center'}}>
        <InputForm
        placeholder="Nome do projeto"
        label="Projeto"
        labelStyle={{color:color.white}}
        value={name}
        onChangeText={text => setName((text))}
        />

        <Button
         title="CRIAR PROJETO"
         titleStyle={{color:color.secondaryDark, fontWeight:'bold'}}
         buttonStyle={{backgroundColor:color.white}}
         containerStyle={{width:"95%"}}
         onPress={handleCreate}
         disabled={name ? false : true}
        />

      </View> 

      </Modal>
  );
}

export default ModalCreate;