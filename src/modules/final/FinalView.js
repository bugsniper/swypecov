import React, {useEffect, useState} from 'react';
import {
  StyleSheet, View, Image, Dimensions, TouchableOpacity, Animated
} from 'react-native';
import SegmentedControl from '@react-native-community/segmented-control';
import {colors} from '../../styles'
import {Body, Container, Content, Header, Right, Text, Title, Left, Card, CardItem} from 'native-base';
import MapView, {Marker} from 'react-native-maps';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import {Misc} from "../../utils/misc";
import {useSelector} from "react-redux";
import mainCore from "../../core/main";
import {getPricingForDemo} from "../../utils/helper";
import SwipePulseButton from "../../components/SwipeButton";
import * as Animatable from "react-native-animatable";

const SendIcon = () => <FontAwesomeIcon name="mail-bulk" color={colors.primary} size={40}/>;

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
      if (prices['lowest_price']) setlowestPrice(parseInt(prices['lowest_price'] / 12));
      if (prices['medium_price']) setmediumPrice(parseInt(prices['medium_price'] / 12));
      if (prices['highest_price']) sethighestPrice(parseInt(prices['highest_price'] / 12));
    } else {
      if (prices['lowest_price']) setlowestPrice(parseInt(prices['lowest_price']));
      if (prices['medium_price']) setmediumPrice(parseInt(prices['medium_price']));
      if (prices['highest_price']) sethighestPrice(parseInt(prices['highest_price']));
    }
  }, [totalData, type, dateType]);
  useEffect(() => {
  }, [zillowData]);

  useEffect(() => {
    const prices = getPricingForDemo(type, totalData);
    if (dateType === 1) {
      if (prices['lowest_price']) setlowestPrice(parseInt(prices['lowest_price'] / 12));
      if (prices['medium_price']) setmediumPrice(parseInt(prices['medium_price'] / 12));
      if (prices['highest_price']) sethighestPrice(parseInt(prices['highest_price'] / 12));
    } else {
      if (prices['lowest_price']) setlowestPrice(parseInt(prices['lowest_price']));
      if (prices['medium_price']) setmediumPrice(parseInt(prices['medium_price']));
      if (prices['highest_price']) sethighestPrice(parseInt(prices['highest_price']));
    }
  }, [storeStatus]);

  const swipeNext = () => {
    props.navigation.navigate('Home', {data: 'test'});
  };

  return (
    <Container>
      <Content style={styles.container}>
        <View style={styles.progressContainer}>
          <MapView
            style={styles.mapBackgound}
            mapType="standard"
            initialCamera={{
              center: {
                latitude: 37.78825,
                longitude: -122.4324,
              },
              pitch: 5,
              heading: 5,
              altitude: 1200,
              zoom: 18
            }}
            zoomEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            pitchEnabled={false}
            pitchEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
            />
          </MapView>
          <View style={{width: '100%', marginTop: 20, flexDirection: 'row'}}>
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
          <Animatable.View
            animation="zoomInDown"
            duration={1500}
            useNativeDriver
            style={{flex: 1}}
          >
          <View style={{width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'center', flex: 1}}>
            <Card style={{
              width: '28%',
              alignSelf: 'center',
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 20
            }}>
              <CardItem cardBody style={{
                alignSelf: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                backgroundColor: colors.cardBackgroundColor,
                position: 'relative',
                justifyContent: 'center', alignItems: 'center'
              }}>
                <Image source={require('../../../assets/images/lighted-beige-house-1396132.jpg')}
                       style={styles.image}/>
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <Text
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: colors.cardBackgroundColor,
                      lineHeight: 45,
                      textAlign: 'center'
                    }}
                  >Basic</Text>
                </View>
              </CardItem>
              <CardItem
                cardBody
                style={{marginVertical: 10, justifyContent: 'center', backgroundColor: colors.cardBackgroundColor, borderRadius: 20}}>
                <Body>
                <Text style={[styles.progressTextLabel]}>${lowestPrice}/{(dateType === 1) ? 'mo' : 'yr'}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody style={{
                flexDirection: 'row',
                backgroundColor: colors.cardBackgroundColor, borderRadius: 20,
                paddingBottom: 10,
                paddingHorizontal: 5
              }}>
                <Image source={require('../../../assets/images/icons/fire.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/water.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/wind.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
              </CardItem>
            </Card>
            <Card style={{
              width: '35%',
              alignSelf: 'center',
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 20
            }}>
              <CardItem cardBody style={{
                alignSelf: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                backgroundColor: colors.cardBackgroundColor,
                position: 'relative',
                justifyContent: 'center', alignItems: 'center'
              }}>
                <Image
                  source={require('../../../assets/images/brown-and-gray-painted-house-in-front-of-road-1396122.jpg')}
                  style={[styles.image, {height: 95}]}/>
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <Text
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      backgroundColor: colors.cardBackgroundColor,
                      lineHeight: 55,
                      textAlign: 'center'
                    }}
                  >Choice</Text>
                </View>
              </CardItem>
              <CardItem
                cardBody
                style={{marginVertical: 10, justifyContent: 'center', backgroundColor: colors.cardBackgroundColor, borderRadius: 20,}}>
                <Body>
                <Text style={styles.progressTextLabel}>${mediumPrice}/{(dateType === 1) ? 'mo' : 'yr'}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody style={{
                flexDirection: 'row',
                backgroundColor: colors.cardBackgroundColor, borderRadius: 20,
                paddingBottom: 10,
                paddingHorizontal: 5
              }}>
                <Image source={require('../../../assets/images/icons/fire.png')}
                       style={[styles.imageIcon, {width: 19, height: 19}]}/>
                <Image source={require('../../../assets/images/icons/water.png')}
                       style={[styles.imageIcon, {width: 19, height: 19}]}/>
                <Image source={require('../../../assets/images/icons/wind.png')}
                       style={[styles.imageIcon, {width: 19, height: 19}]}/>
                <Image source={require('../../../assets/images/icons/water.png')}
                       style={[styles.imageIcon, {width: 19, height: 19}]}/>
                <Image source={require('../../../assets/images/icons/wind.png')}
                       style={[styles.imageIcon, {width: 19, height: 19}]}/>
              </CardItem>
            </Card>
            <Card style={{
              width: '28%',
              alignSelf: 'center',
              backgroundColor: colors.cardBackgroundColor,
              borderRadius: 20
            }}>
              <CardItem cardBody style={{
                alignSelf: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                backgroundColor: colors.cardBackgroundColor,
                position: 'relative',
                justifyContent: 'center', alignItems: 'center'
              }}>
                <Image source={require('../../../assets/images/home-real-estate-106399.jpg')}
                       style={styles.image}/>
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row'
                }}>
                  <Text
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: colors.cardBackgroundColor,
                      lineHeight: 45,
                      textAlign: 'center'
                    }}
                  >Elite</Text>
                </View>
              </CardItem>
              <CardItem
                cardBody
                style={{marginVertical: 10, justifyContent: 'center', backgroundColor: colors.cardBackgroundColor, borderRadius: 20}}>
                <Body>
                <Text style={styles.progressTextLabel}>${highestPrice}/{(dateType === 1) ? 'mo' : 'yr'}</Text>
                </Body>
              </CardItem>
              <CardItem cardBody style={{
                flexDirection: 'row',
                backgroundColor: colors.cardBackgroundColor, borderRadius: 20,
                paddingBottom: 10,
                paddingHorizontal: 5
              }}>
                <Image source={require('../../../assets/images/icons/fire.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/water.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/wind.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/water.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/wind.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
                <Image source={require('../../../assets/images/icons/moreicon.png')}
                       style={[styles.imageIcon, {width: 16, height: 16}]}/>
              </CardItem>
            </Card>
          </View>
          </Animatable.View>
        </View>
        <Animatable.View
          animation="zoomInUp"
          duration={1500}
          useNativeDriver
          style={{flex: 1}}
        >
          <View style={{paddingHorizontal: 20}}>
            {locationTxt !== '' && <SwipePulseButton title="Next" swipeNext={() => swipeNext()}/>}
          </View>
          <View style={styles.sendContainer}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Card style={{flex: 1, alignSelf: 'center'}}>
                <CardItem style={{justifyContent: 'center', backgroundColor: colors.cardBackgroundColor}}>
                  <Body>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: 35, height: 35, backgroundColor: colors.white}}>
                      <Image source={require('../../../assets/images/flood.png')}
                             style={styles.imageIcon}/>
                    </View>
                    <View style={{paddingLeft: 10, flex: 1}}>
                      <Text style={[styles.progressTextLabel, {fontSize: 10}]}>flood zone {totalData['flood']['zone']}</Text>
                      <Text style={[styles.progressTextLabel, {fontSize: 10}]}>flood Cost ${totalData['flood']['premium']}</Text>
                    </View>
                  </View>
                  </Body>
                </CardItem>
              </Card>
              <Card style={{flex: 1, alignSelf: 'center'}}>
                <CardItem style={{justifyContent: 'center', backgroundColor: colors.cardBackgroundColor}}>
                  <Body>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{width: 35, height: 35, backgroundColor: colors.white}}>
                      <Image source={require('../../../assets/images/houseinfo.png')}
                             style={styles.imageIcon}/>
                    </View>
                    <View style={{paddingLeft: 10, flex: 1}}>
                      <Text style={[styles.progressTextLabel, {fontSize: 10}]}>{zillowData['square']} Square Feet</Text>
                      <Text style={[styles.progressTextLabel, {fontSize: 10}]}>{zillowData['built_year']} Year Built</Text>
                    </View>
                  </View>
                  </Body>
                </CardItem>
              </Card>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
              <TouchableOpacity style={styles.sendButton}>
                <SendIcon/>
                <Text style={{color: colors.black}}>Email Quote</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>

      </Content>
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: '100%',
    marginTop: 40
  },
  progressContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    height: Dimensions.get('window').width / 2 + 105,
    marginBottom: 30,
  },
  mapBackgound: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: Dimensions.get('window').width / 2 + 105,
    position: 'absolute',
  },
  imageBackgound: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: Dimensions.get('window').width / 2,
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
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontStyle: 'italic'
  },
  sendContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendTextLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5
  },
  sendButton: {
    borderRadius: 7,
    backgroundColor: colors.cardBackgroundColor,
    height: 100,
    width: '50%',
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.primary
  },
  imageIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  image: {
    height: 80, width: null, flex: 1,
    resizeMode: 'cover',
    borderRadius: 20,
    alignSelf: 'center',
  }
});
