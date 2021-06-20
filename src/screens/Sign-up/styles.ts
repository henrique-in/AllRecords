import {Platform, StyleSheet} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { color } from '~/theme/colors'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: color.background, 
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:Platform.OS === 'android' ? 120 : 20

        
    },
    content:{
        width:"100%",
        height:RFValue(120),
        alignItems:'center',
        justifyContent:'center',
        paddingBottom:20
    },
    title:{

        color:color.secondaryLight,
        fontSize:28,
        fontWeight:'bold'
        
    }
})