import {StyleSheet} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { color } from '~/theme/colors'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.background, 
        alignItems:'center'
    },
    content:{
        width:"100%",
        height:RFValue(250),
        alignItems:'center',
        justifyContent:'center'
    },
    title:{

        color:color.secondaryLight,
        fontSize:28,
        fontWeight:'bold'
        
    }
})