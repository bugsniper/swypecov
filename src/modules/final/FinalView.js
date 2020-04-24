import React, {useEffect, useState} from 'react';
import {
  StyleSheet, View, Image, Dimensions, TouchableOpacity, Animated
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import {colors} from '../../styles'
import {Body, Container, Content, Header, Right, Text, Title, Left} from 'native-base';
import SwipeButton from 'rn-swipe-button';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import AddressAutoComplete from "../../components/AddressAutoComplete";
import {Misc} from "../../utils/misc";
import {useSelector} from "react-redux";
import mainCore from "../../core/main";
import {getPricingForDemo, notEmpty} from "../../utils/helper";

const SwipeIcon = () => (
  <FontAwesomeIcon style={{fontWeight: 'bold'}} name="angle-double-right" color={colors.textInputColor} size={30} />
);
const SendIcon = () => <FontAwesomeIcon name="send-o" color={colors.textInputColor} size={50} />;

export default function FinalView(props) {

  const locationTxt = Misc.fullAddress;
  const [type, setType] = useState(0);
  const [dateType, setDateType] = useState(0);
  const [lowestPrice, setlowestPrice] = useState(0);
  const [mediumPrice, setmediumPrice] = useState(0);
  const [highestPrice, sethighestPrice] = useState(0);

  const totalData = useSelector(state => mainCore.selectors.totalData(state));
  const zillowData = useSelector(state => mainCore.selectors.zillowData(state));
  const storeStatus = useSelector(state => mainCore.selectors._status(state));

  useEffect(() => {
    const prices = getPricingForDemo(type, totalData);
    if (dateType === 1) {
      if (prices['lowest_price']) setlowestPrice(parseInt(prices['lowest_price'] * 100 / 12) / 100);
      if (prices['medium_price']) setmediumPrice(parseInt(prices['medium_price'] * 100 / 12) / 100);
      if (prices['highest_price']) sethighestPrice(parseInt(prices['highest_price'] * 100 / 12) / 100);
    } else {
      if (prices['lowest_price']) setlowestPrice(prices['lowest_price']);
      if (prices['medium_price']) setmediumPrice(prices['medium_price']);
      if (prices['highest_price']) sethighestPrice(prices['highest_price']);
    }
  }, [totalData, type, dateType]);
  useEffect(() => {
  }, [zillowData]);

  useEffect(() => {
    const prices = getPricingForDemo(type, totalData);
    if (dateType === 1) {
      if (prices['lowest_price']) setlowestPrice(parseInt(prices['lowest_price'] * 100 / 12) / 100);
      if (prices['medium_price']) setmediumPrice(parseInt(prices['medium_price'] * 100 / 12) / 100);
      if (prices['highest_price']) sethighestPrice(parseInt(prices['highest_price'] * 100 / 12) / 100);
    } else {
      if (prices['lowest_price']) setlowestPrice(prices['lowest_price']);
      if (prices['medium_price']) setmediumPrice(prices['medium_price']);
      if (prices['highest_price']) sethighestPrice(prices['highest_price']);
    }
  }, [storeStatus]);

  const swipeNext = () => {
    props.navigation.navigate('Home', {data: 'test'});
  };

  return (
    <Container>
      <Header style={{backgroundColor: colors.white}}>
        <Left>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <IoniconsIcon name="ios-arrow-back" color={colors.primary} size={35} />
          </TouchableOpacity>
        </Left>
        <Body>
        <Title style={{color: colors.primary, fontWeight: 'bold'}}>SwypeCov</Title>
        </Body>
        <Right />
      </Header>
      <Content style={styles.container}>
        <View style={styles.content}>
          <AddressAutoComplete locationTxt={locationTxt} isValid/>
        </View>

        <View style={{width: '100%',marginTop: 20, flexDirection: 'row'}}>
          <View style={{width: '50%', paddingHorizontal: 10}}>
            <SegmentedControl
              values={['HOME', 'CONDO']}
              selectedIndex={type}
              onChange={(event) => {
                setType(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          </View>
          <View style={{width: '50%', paddingHorizontal: 10}}>
            <SegmentedControl
              values={['YR.', 'MO.']}
              selectedIndex={dateType}
              onChange={(event) => {
                setDateType(event.nativeEvent.selectedSegmentIndex);
              }}
            />
          </View>
        </View>

        <View style={styles.progressContainer}>
          <Image source={require('../../../assets/images/cost-progress.png')} style={styles.imageBackgound} />
          <View style={{flexDirection: 'column', width: '100%', justifyContent: 'center', marginTop: 25}}>
            <Text style={styles.bestValue}>${mediumPrice}/yr</Text>
            <Text style={styles.progressTextLabel}>Best Value</Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.progressTextLabel}>${lowestPrice}</Text>
              <Text style={styles.progressTextLabel}>(Low)</Text>
            </View>
            {type === 0 && <Image source={require('../../../assets/images/home.png')} style={styles.imageHome} />}
            {type === 1 && <Image source={require('../../../assets/images/condo.png')} style={styles.imageHome} />}
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={styles.progressTextLabel}>${highestPrice}</Text>
              <Text style={styles.progressTextLabel}>(High)</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          {locationTxt !== '' && <SwipeButton
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
            title="Continue"
            thumbIconComponent={() => (<Animated.View><SwipeIcon/></Animated.View>)}
            onSwipeSuccess={() => swipeNext()}
          />}
        </View>

        <View style={styles.sendContainer}>
          <View style={{flexDirection: 'column', alignItems: 'center', width: '50%'}}>
            <Text style={styles.sendTextLabel}>{zillowData['square']} Square Feet</Text>
            <Text style={styles.sendTextLabel}>{zillowData['built_year']} Year Built</Text>
            {notEmpty(totalData['flood']) &&
              <Text style={styles.sendTextLabel}>Flood zone {totalData['flood']['zone']}</Text>
            }
            {notEmpty(totalData['flood']) &&
              <Text style={styles.sendTextLabel}>Flood Cost ${totalData['flood']['premium']}</Text>
            }
          </View>
          <View style={{flexDirection: 'column', alignItems: 'center', width: '50%'}}>
            <TouchableOpacity style={styles.sendButton}>
              <SendIcon/>
              <Text style={{color: colors.textInputColor}}>Email Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    marginTop: 40
  },
  progressContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    width: 300,
    alignSelf: 'center',
    height: Dimensions.get('window').width/2 + 15,
    marginBottom: 30,
  },
  imageBackgound: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "center",
    width: '100%',
    height: Dimensions.get('window').width/2,
    position: 'absolute',
  },
  imageHome: {
    resizeMode: "contain",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginTop: -40
  },
  bestValue: {
    textAlign: 'center',
    color: colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  progressTextLabel: {
    textAlign: 'center', fontWeight: 'bold'
  },
  sendContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sendTextLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5
  },
  sendButton: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    height: 100,
    width: '100%',
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  }
});
