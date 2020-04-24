import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet, View, TouchableOpacity, Alert, Animated, Easing
} from 'react-native';
import {colors} from '../../styles'
import {Body, Container, Content, Header, Right, Text, Title} from 'native-base';
import SwipeButton from 'rn-swipe-button';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import {Misc} from '../../utils/misc'
import HomeSelectButton from "../../components/HomeSelectButton";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import AddressManualComplete from "../../components/AddressManualComplete";
import TransparentModal from "../../components/TransparentModal";
import HomeItemsList from "../../components/HomeItemsList";
import AddressAutoCompleteModal from "../../components/AddressAutoCompleteModal";
import {notEmpty} from "../../utils/helper";

const SwipeIcon = () => (
  <FontAwesomeIcon style={{fontWeight: 'bold'}} name="angle-double-right" color={colors.textInputColor} size={30} />
);

export default function HomeScreen(props) {
  const [isManual, setIsManual] = useState(false);
  const [isHomeModal, setIsHomeModal] = useState(false);
  const [isAutoModalVisible, setIsAutoModalVisible] = useState(false);
  const [selectedHomeTypeList, setSelectedHomeTypeList] = useState([]);
  const [selectedHomeType, setSelectedHomeType] = useState(0);
  const [zillowAddress, setzillowAddress] = useState(null);
  const [addressTxt, setAddressTxt] = useState('');
  const [squareTxt, setSquareTxt] = useState('');
  const [estimateTxt, setExtimateTxt] = useState('');
  const [yearBuiltTxt, setYearBuilt] = useState('');
  const [zillowData, setzillowData] = useState(props.zillowData);
  const [zillowDataLoading, setzillowDataLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        easing: Easing.back(),
        duration: 10000,
      }
    ).start();
  }, [])

  const selectHomeTypeFromModal = (data) => {
    let temp = selectedHomeTypeList;
    if (temp.indexOf(data) === -1) temp.push(data);
    else temp.splice(temp.indexOf(data), 1);
    setSelectedHomeTypeList(temp);
    setSelectedHomeType(temp.length);
  };

  const setAddressText =(key, value) => {
    switch (key) {
      case 'address':
        setAddressTxt(value);
        break;
      case 'square':
        setSquareTxt(value);
        break;
      case 'estimate':
        setExtimateTxt(value);
        break;
      default:
        setYearBuilt(value);
        break;
    }
  };

  const getPriceData = (zillowDataLocal) => {
    const currentYear = new Date().getFullYear();
    let electric_year, plumbing_year, roof_year;
    let city = Misc.addressData["locality"],
      state = Misc.addressData["administrative_area_level_1"],
      postal_code = Misc.addressData["postal_code"],
      street = Misc.addressData["address"],
      year_built = isManual? yearBuiltTxt: zillowDataLocal["built_year"],
      sqft = isManual? squareTxt.replace(",", ""): zillowDataLocal["square"].replace(",", ""),
      ac_year = (electric_year = plumbing_year = roof_year = currentYear),
      construction_type = 1,
      roof_type = 1,
      foundation_type = 1,
      dwell_coverage = 25000,
      building_type = 1,
      roof_status = "peaked",
      is_basement = 1,
      is_demo = true;

    const demoRequestParams = {
      city,
      state,
      postal_code,
      street,
      year_built,
      sqft,
      ac_year,
      electric_year,
      plumbing_year,
      roof_year,
      construction_type,
      roof_type,
      dwell_coverage,
      building_type,
      roof_status,
      is_basement,
      foundation_type,
      is_demo
    };
    props.getNeptuneData(demoRequestParams, Misc.fullAddress);
    props.getPlymouthDataHome(demoRequestParams, Misc.fullAddress);
    props.getPlymouthDataCondo(demoRequestParams, Misc.fullAddress);
    props.getUniversalDataHome(demoRequestParams, Misc.fullAddress);
    props.getUniversalDataCondo(demoRequestParams, Misc.fullAddress);
    props.getStillwaterDataHome(demoRequestParams, Misc.fullAddress);
    props.getStillwaterDataCondo(demoRequestParams, Misc.fullAddress);
  };

  const swipeNext = async () => {
    if (isManual) {
      Misc.setAddressData(addressTxt);
      if (squareTxt && estimateTxt && yearBuiltTxt) {
        props.setZillowManual({
          square: squareTxt,
          estimate: estimateTxt,
          built_year: yearBuiltTxt,
        }, Misc.fullAddress);
        getPriceData({
          square: squareTxt,
          estimate: estimateTxt,
          built_year: yearBuiltTxt,
        });
        props.navigation.push('ProgressScreen', {location: addressTxt});
      } else {
        Alert.alert(
          'Form Error!',
          "Some field is missing.",
          [{text: 'OK'}],
          {cancelable: false},
        );
      }
    } else {
      getPriceData(zillowData);
      props.navigation.push('ProgressScreen', {location: addressTxt});
    }
  };

  const selectedLocation = async (data, details) => {
    setAddressTxt(data.description);
    setIsAutoModalVisible(false);
    const zillowAddress = notEmpty(details)
      ? Misc.getAutoZillowAddress(details['address_components'], details['formatted_address'])
      : null;
    setzillowAddress(zillowAddress);
    setzillowDataLoading(true);
    const response = await props.getZillow(zillowAddress, Misc.fullAddress);
    setzillowDataLoading(false);
    if (response.result !== 'error') {
      setzillowData(response.data);
    } else {
      Alert.alert('Error!', response.message,
        [
          {
            text: 'OK',
            onPress: () => {
              setIsManual(true);
            }
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <Container>
      <Header style={{backgroundColor: colors.white}}>
        <Body>
          <Title style={{color: colors.primary, fontWeight: 'bold'}}>SwypeCov</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.container}>
        <View style={{marginVertical: 50}}>
          <Text style={{textAlign: 'center', fontSize: 57, fontWeight: 'bold', color: colors.darkerGray}}>Just Swype</Text>
          <Text style={{textAlign: 'center', fontSize: 20, color: colors.gray}}>You'll see quotes instantly.</Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity onPress={() => setIsHomeModal(true)}>
            <HomeSelectButton selectedHomeType={selectedHomeType}/>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {!isManual &&
            <TouchableOpacity onPress={() => setIsAutoModalVisible(true)}>
              <AddressAutoComplete
                locationTxt={addressTxt}
                loading={zillowDataLoading}
                isValid={!!notEmpty(zillowAddress)} />
            </TouchableOpacity>
          }
          {isManual && <AddressManualComplete
            locationTxt={addressTxt}
            isValid={!!notEmpty(zillowAddress)}
            onSetAddressText={(key, value) => setAddressText(key, value)}
          />}
          <TouchableOpacity style={{marginBottom: 20}} onPress={() => setIsManual(!isManual)}>
            <Text style={{textDecorationLine: 'underline'}}>{isManual ? 'Enter Automatically' : 'Enter Manually'}</Text>
          </TouchableOpacity>
          {addressTxt !== '' && <SwipeButton
            containerStyles={{borderWidth: 2, padding: 0, height: 60}}
            titleStyles={{fontSize: 20, color: colors.black}}
            iconSize={60}
            height={60}
            thumbIconBackgroundColor={colors.primary}
            thumbIconBorderColor={colors.primary}
            railBackgroundColor={colors.white}
            railFillBackgroundColor={colors.primary}
            railBorderColor={colors.primary}
            railFillBorderColor={colors.primary}
            shouldResetAfterSuccess
            title="Swipe to Quote"
            thumbIconComponent={() => (<Animated.View><SwipeIcon/></Animated.View>)}
            onSwipeSuccess={() => swipeNext()}
          />}
        </View>
      </Content>
      <TransparentModal modalVisible={isHomeModal} onCloseModal={() => setIsHomeModal(false)}>
        <HomeItemsList
          selectedHomeTypeList={selectedHomeTypeList}
          selectedHomeType={selectedHomeType}
          onSelectHomeType={(data) => selectHomeTypeFromModal(data)}
        />
      </TransparentModal>
      <AddressAutoCompleteModal
        modalVisible={isAutoModalVisible}
        onCloseModal={() => setIsAutoModalVisible(false)}
        selectLocation={(data, details) => selectedLocation(data, details)}
        locationTxt={addressTxt}
      />
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
  },
  content: {
    width: '100%',
    marginTop: 20,
    marginBottom: 30
  }
});
