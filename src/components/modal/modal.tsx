import * as React from "react"
import RNModal from "react-native-modal"
import { View, ViewStyle, ScrollView , Text} from "react-native"
import { Icon } from "react-native-elements"

import { color } from "~/theme/colors"

const styles = {
  WRAPPER: {
    minHeight: "50%",
    maxHeight: "92%",
    minWidth: "100%",
    backgroundColor: color.secondaryDark,
    borderRadius: 25,
  } as ViewStyle,
  WRAPPER_FULL: {
    minHeight: "92%",
  } as ViewStyle,
  TITLE_CONTAINER: {
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  CONTENT: {
    padding: 10,
  } as ViewStyle,
  SCROLL: {
    flex: 1,
    paddingBottom: 23,
  } as ViewStyle,
  BTN_CLOSE_CONTAINER: {
    alignItems: "flex-end",
    
  } as ViewStyle,
  BTN_CLOSE_ICON: {
    alignItems: "flex-end",
  } as ViewStyle,

}

export interface ModalProps {
  children?: any
  isVisible: boolean
  onClose?: Function
  closeButtonDisabled?: boolean
  title?: string
  contentStyle?: object
  full?: boolean
  footer?: any
  onlyChildren?: boolean
}

// eslint-disable-next-line react/display-name
export const Modal: React.FunctionComponent<ModalProps> = React.memo(({ children, onlyChildren, isVisible, onClose, closeButtonDisabled, title, contentStyle = {}, full, footer }) => {
  return (
    <RNModal
      isVisible={isVisible}
      hideModalContentWhileAnimating
      useNativeDriver
    >
      <View style={styles.BTN_CLOSE_CONTAINER}>
        <Icon
          reverse
          name="close"
          underlayColor="black"
          onPress={onClose}
          color={color.primary}
          disabled={closeButtonDisabled}
        />
      </View>

      {
        onlyChildren ? children : (
          <View style={{ ...styles.WRAPPER, ...(full && styles.WRAPPER_FULL) }}>
            { title && (
              <View style={styles.TITLE_CONTAINER}>
                <Text style={{fontSize:18, fontWeight:'bold',color:color.white}}>{title}</Text>
              </View>
            )}
            <ScrollView style={styles.SCROLL}>
              <View style={{ ...styles.CONTENT, ...(contentStyle) }}>
                {children}
              </View>
            </ScrollView>
            {footer}
          </View>
        )
      }
    </RNModal>
  )
})
