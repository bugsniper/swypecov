import React, {useEffect, useState} from 'react';
import {
  StyleSheet, View, Image
} from 'react-native';
import {colors} from '../../styles'
import {Misc} from '../../utils/misc'
import {Container} from 'native-base';
import AddressAutoComplete from "../../components/AddressAutoComplete";
import LottieView from "lottie-react-native";

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

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalProgress(totalProgress => {
        if (totalProgress < 50) {
          return totalProgress + 0.3;
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
    if (totalProgress > 50) setTimeout(() => props.navigation.push('FinalScreen'), 2000)
  }, [totalProgress]);


  return (
    <Container style={styles.container}>
        <AddressAutoComplete locationTxt={locationTxt} isValid/>
        <View style={styles.body}>
          <LottieView
            source={require('../../../assets/animations/ripple.json')}
            colorFilters={[
              {keypath: "button", color: "#F00000"},
              {keypath: "Sending Loader", color: "#F00000"}
            ]}
            autoPlay
            loop
          >

          </LottieView>
          <View style={styles.imageContainer}>
            <Image source={thirdImages[parseInt(totalProgress % 13)]}
                   style={styles.image}/>
          </View>
        </View>
    </Container>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: colors.primary
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
  },
  imageContainer: {
    padding: 5,
    width: 70,
    height: 70,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 35,
    overflow: "hidden",
    alignSelf: 'center'
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center'
  }
});
