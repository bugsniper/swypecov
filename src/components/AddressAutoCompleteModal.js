import React from 'react';
import {
  Text,
  TouchableOpacity, View, Modal, Dimensions
} from 'react-native';
import {Container, Content} from 'native-base';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import colors from "../styles/colors";
export default function AddressAutoCompleteModal({ modalVisible, onCloseModal, selectLocation, locationTxt }) {
  return (
    <Modal
      animationType={null} transparent={false}
      visible={modalVisible}
      onRequestClose={() => { console.log("Modal has been closed.") }}
    >
      <Container>
      <View style={{bottom: 20, zIndex: 10000, width: Dimensions.get('window').width, position: 'absolute', flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => onCloseModal()}>
              <AntDesignIcon name="closecircleo" size={35} color={colors.black}/>
            </TouchableOpacity>
          </View>
        <Content>
          
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2}
            autoFocus={true}
            returnKeyType={'search'}
            listViewDisplayed='auto'
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              selectLocation(data, details);
            }}
            getDefaultValue={() => locationTxt.toString()}
            query={{
              key: 'AIzaSyAdiJ2Yt1Onq0eGV5cgLlGMARvR1VN8zTU',
              language: 'en', // language of the results
              types: 'address' // default: 'geocode'
            }}
            styles={{
              textInputContainer: {
                width: '100%'
              },
              description: {
                fontWeight: 'bold'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              }
            }}
            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              types: 'food'
            }}
            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            debounce={200}
          />
        </Content>
      </Container>
      
    </Modal>

  );
}
