import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList
} from 'react-native';
import {Container, Header, Title, Content, ListItem, Text, Icon, Body, Right, Left} from 'native-base';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import MarqueeText from 'react-native-marquee';
import {colors} from '../../styles'
import {useSelector} from "react-redux";
import mainCore from "../../core/main";
import {Misc} from "../../utils/misc";

export default function HistoryView(props) {
  const historyData = useSelector(state => mainCore.selectors.historyData(state));
  const historyStatus = useSelector(state => mainCore.selectors.historyStatus(state));
  useEffect(() => {
  }, [historyStatus]);

  const historyItemPressHandler = (item) => {
    Misc.setAddressData(item.address);
    props.setTotalDate(item['total_data'], item.address);
    props.setZillowManual(item['zillowData'], item.address);
    props.navigation.push('FinalScreen')
  };

  return (
    <Container>
      <Content>
        <FlatList
          data={Object.keys(historyData)}
          renderItem={({item}) => (
            <ListItem icon onPress={()=> historyItemPressHandler(historyData[item])}>
              <Body>
              <MarqueeText
                style={{ fontSize: 17 }}
                duration={3000}
                marqueeOnStart
                loop
                marqueeDelay={1000}
                marqueeResetDelay={1000}
              >
                {historyData[item]['address']}
              </MarqueeText>
              </Body>
              <Right>
                <Text style={{color: colors.primary, fontWeight: 'bold', paddingLeft: 10}}>
                  ${historyData[item]['zillowData']['estimate']}
                </Text>
              </Right>
              <Right>
                <View
                  style={{
                    backgroundColor: colors.greenLight,
                    width: 20,
                    height: 20,
                    position: 'absolute',
                    borderRadius: 10,
                    top: 5,
                    right: 10
                  }}/>
                <AntDesignIcon name="mail" size={25}/>
              </Right>
            </ListItem>
          )}
          ListEmptyComponent={<Text>No data</Text>}
          keyExtractor={item => item}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
