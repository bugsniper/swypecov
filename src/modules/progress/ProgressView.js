import React, {useEffect, useState} from 'react';
import {
  StyleSheet, View, Image
} from 'react-native';
import {colors} from '../../styles'
import {Misc} from '../../utils/misc'
import { Container, Content, Text, List, ListItem, Thumbnail, Left, Body, Right, Button } from 'native-base';
import AddressAutoComplete from "../../components/AddressAutoComplete";
import ProgressBar from 'react-native-progress/Bar';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import {useSelector} from "react-redux";
import mainCore from "../../core/main";
import CustomProgressBar from "../../components/ProgressBar";

const condoIcon = require('../../../assets/images/icons/condo-icon.png');
const firstImages = [
  require('../../../assets/images/google-map-api.png'),
  require('../../../assets/images/aws.png'),
  require('../../../assets/images/zillow.png'),
];
const secondImages = [
  require('../../../assets/images/companies/nationwide-logo.png'),
  require('../../../assets/images/companies/progressive-logo.png'),
  require('../../../assets/images/companies/metlife.jpg'),
  require('../../../assets/images/companies/travelers-logo.png'),
  require('../../../assets/images/companies/plymouthrock-1.jpeg'),
  require('../../../assets/images/companies/state-auto.png'),
  require('../../../assets/images/companies/universal.png'),
  require('../../../assets/images/companies/stillwater.png'),
  require('../../../assets/images/companies/neptune-logo.png'),
];

const thirdImages = [
  require('../../../assets/images/google-map-api.png'),
  require('../../../assets/images/aws.png'),
  require('../../../assets/images/zillow.png'),
  require('../../../assets/images/companies/nationwide-logo.png'),
  require('../../../assets/images/companies/progressive-logo.png'),
  require('../../../assets/images/companies/metlife.jpg'),
  require('../../../assets/images/companies/travelers-logo.png'),
  require('../../../assets/images/companies/plymouthrock-1.jpeg'),
  require('../../../assets/images/companies/state-auto.png'),
  require('../../../assets/images/companies/universal.png'),
  require('../../../assets/images/companies/stillwater.png'),
  require('../../../assets/images/companies/neptune-logo.png'),
];
export default function ProgressScreen(props) {
  const locationTxt = Misc.fullAddress;
  const [totalProgress, setTotalProgress] = useState(0);
  const [topProgress, settopProgress] = useState(0);
  const [firstProgress, setfirstProgress] = useState(0);
  const [secondProgress, setsecondProgress] = useState(0);
  const [thirdProgress, setthirdProgress] = useState(0);

  const zillowData = useSelector(state => mainCore.selectors.zillowData(state));

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProgress(totalProgress => {
        if (totalProgress < 23) {
          return totalProgress + 0.2;
        }
        return totalProgress
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);
  // useEffect(() => {
  //   setTimeout(() => progressHandler(), 1000);
  // }, []);
  useEffect(() => {
    if (totalProgress < 3) {
      setfirstProgress(totalProgress);
    } else if (totalProgress >= 3 && totalProgress < 12) {
      setsecondProgress(totalProgress - 3);
    } else {
      setthirdProgress(totalProgress - 12);
    }
    if (totalProgress > 23) setTimeout(() => props.navigation.push('FinalScreen'), 2000)
  }, [totalProgress]);

  useEffect(() => {
  }, [firstProgress, secondProgress, thirdProgress]);

  return (
    <Container>
      <Content style={styles.container}>
        <AddressAutoComplete locationTxt={locationTxt} isValid/>
        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 10}}>
          <Text>{parseInt(totalProgress/23 * 100)}% completed!</Text>
          <ProgressBar borderRadius={0} useNativeDriver={true} style={{marginTop: 20, width: '80%'}} progress={totalProgress/23}  width={300} color={colors.black}/>
        </View>
        <List style={{marginTop: 30}}>
          <ListItem thumbnail>
            <Left>
              <Image square source={firstImages[parseInt(firstProgress)]} style={{resizeMode: 'contain', width:50, aspectRatio: 1}}/>
            </Left>
            <Body>
            <Text style={{fontSize: 10, fontStyle: 'italic'}}>sq ft: {zillowData['square']}sqft</Text>
            <Text style={{fontSize: 10, fontStyle: 'italic'}}>year: {zillowData['built_year']}</Text>
            <Text style={{fontSize: 10, fontStyle: 'italic'}}>est value: ${zillowData['estimate']}</Text>
            <View>
              <Text style={{fontSize: 10, color: colors.gray}}>{parseInt(parseInt(firstProgress)/2 * 100)}% connecting...</Text>
              {/*<CustomProgressBar style={{marginTop: 5, width: '80%'}} row progress={firstProgress/2} duration={10000}/>*/}
              <ProgressBar borderRadius={0} useNativeDriver={true} style={{marginTop: 5, width: '80%'}} progress={firstProgress/2} width={300} color={colors.black}/>
            </View>
            </Body>
            <Right>
              {firstProgress/2 >= 1 && <AntDesignIcon name="checkcircle" size={20} color={colors.green} style={{position: 'absolute', right: 5}}/>}
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Image square source={secondImages[parseInt(secondProgress)]} style={{resizeMode: 'contain', width:50, aspectRatio: 1}}/>
            </Left>
            <Body>
            <View>
              <Text style={{fontSize: 10, color: colors.gray}}>{parseInt(parseInt(secondProgress)/8 * 100)}% connecting...</Text>
              <ProgressBar borderRadius={0} useNativeDriver={true} style={{marginTop: 20, width: '80%'}} progress={secondProgress/8}  width={300} color={colors.black}/>
              {/*<CustomProgressBar style={{marginTop: 5, width: '80%'}} row progress={secondProgress/8} duration={10000}/>*/}
            </View>
            </Body>
            <Right>
              {secondProgress/8 >= 1 && <AntDesignIcon name="checkcircle" size={20} color={colors.green} style={{position: 'absolute', right: 5}}/>}
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Image source={thirdImages[parseInt(thirdProgress)]} style={{resizeMode: 'contain', width:50, aspectRatio: 1}} />
            </Left>
            <Body>
            <View>
              <Text style={{fontSize: 10, color: colors.gray}}>{parseInt(parseInt(thirdProgress)/11 * 100)}% connecting...</Text>
              <ProgressBar borderRadius={0} useNativeDriver={true} style={{marginTop: 20, width: '80%'}} progress={thirdProgress/11}  width={300} color={colors.black}/>
            </View>
            </Body>
            <Right>
              {thirdProgress/11 >= 1 && <AntDesignIcon name="checkcircle" size={20} color={colors.green} style={{position: 'absolute', right: 5}}/>}
            </Right>
          </ListItem>
        </List>
      </Content>
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20
  },
  content: {
    width: '100%',
    marginTop: 40
  }
});
