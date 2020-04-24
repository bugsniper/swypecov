import React from 'react';
import {StyleSheet} from 'react-native';

import { colors } from '../../styles';
import {Body, Container, Content, Header, Right, Title} from "native-base";

export default function PagesScreen(props) {
  return (
    <Container>
      <Header style={{backgroundColor: colors.white}}>
        <Body>
          <Title style={{color: colors.primary, fontWeight: 'bold'}}>Contacts</Title>
        </Body>
        <Right />
      </Header>
      <Content>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10,
  },
});
