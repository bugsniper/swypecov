import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import colors from "../styles/colors";
const styles = StyleSheet.create({
  textStyle: {
    height: 40, borderWidth: 3, borderColor: colors.primary, padding: 5, marginTop: 20, fontSize: 15, fontWeight: 'bold'
  },
});
const AddressManualComplete = ({locationTxt, isValid, onSetAddressText}) => {
  const [addressTxt, setAddressTxt] = useState(locationTxt);
  const [squareTxt, setSquareTxt] = useState('');
  const [estimateTxt, setExtimateTxt] = useState('');
  const [yearBuiltTxt, setYearBuilt] = useState('');

  return (
    <View>
      <TextInput
        style={styles.textStyle}
        placeholder="Ex: 419 Virginia Ave, Phoenixville"
        multiline={false}
        value={addressTxt}
        onChangeText={text => {setAddressTxt(text); onSetAddressText('address', text)}}
      />
      <TextInput
        style={styles.textStyle}
        placeholder="Square"
        multiline={false}
        value={squareTxt}
        onChangeText={text => {setSquareTxt(text); onSetAddressText('square', text)}}
      />
      <TextInput
        style={styles.textStyle}
        placeholder="Estimate"
        multiline={false}
        value={estimateTxt}
        onChangeText={text => {setExtimateTxt(text); onSetAddressText('estimate', text)}}
      />
      <TextInput
        style={styles.textStyle}
        placeholder="Year Built"
        multiline={false}
        value={yearBuiltTxt}
        onChangeText={text => {setYearBuilt(text); onSetAddressText('yearbuilt', text)}}
      />
    </View>
  );
};

export default AddressManualComplete;
