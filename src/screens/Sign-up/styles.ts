import {StyleSheet} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { color } from '~/theme/colors'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.background, 
        paddingTop:40,
        alignItems:'center',
        
    },
    content:{
        width:"100%",
        height:RFValue(200),
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    },
    title:{

        color:color.secondaryLight,
        fontSize:28,
        fontWeight:'bold'
        
    }
})