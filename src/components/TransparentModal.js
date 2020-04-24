import React from 'react';
import {Dimensions, StyleSheet, Modal, View, TouchableOpacity} from 'react-native';
import {Text} from "native-base";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import colors from "../styles/colors";
const styles = StyleSheet.create({
  modalContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0.8)',
  }
});
const TransparentModal = ({modalVisible, onCloseModal, children}) => {
  return (
    <Modal
      animationType={null} transparent={true}
      visible={modalVisible}
      onRequestClose={() => { console.log("Modal has been closed.") }}
    >
      <View style={{bottom: 20, zIndex: 10000, width: Dimensions.get('window').width, position: 'absolute', flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => onCloseModal()}>
          <AntDesignIcon name="checkcircleo" size={35} color={colors.white}/>
        </TouchableOpacity>
      </View>
      <View style={[styles.modalContainer, {height: modalVisible? Dimensions.get('window').height: 0 , paddingHorizontal: 30}]}>
        <View style={{backgroundColor: 'white', flex: 1, height: 'auto', position: 'relative'}}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default TransparentModal;
