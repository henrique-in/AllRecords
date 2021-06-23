import {StyleSheet} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { color } from '~/theme/colors'

export const styles = StyleSheet.create({
    container:{
        borderWidth: 3,
        borderRadius: 10,
        borderColor: color.primary,
        borderBottomWidth: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 2
    },
    text:{
        color:color.white,
        fontSize:16,
        fontWeight:'bold'
     },
})