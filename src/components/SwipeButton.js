import React from 'react';
import colors from "../styles/colors";
import * as Animatable from "react-native-animatable";
import SwipeButton from 'rn-swipe-button';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const SwipeIcon = () => (
  <FontAwesomeIcon style={{fontWeight: 'bold'}} name="angle-double-right" color={colors.textInputColor} size={30} />
);
const SwipePulseButton = ({title, swipeNext}) => {
  return (
    <Animatable.View
      animation="shake"
      duration={1000}
      iterationDelay={5000}
      useNativeDriver
      iterationCount="infinite"
    >
      <SwipeButton
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
        title={title}
        thumbIconComponent={() => (
          <Animatable.View
            animation="wobble"
            duration={3000}
            useNativeDriver
            iterationCount="infinite"
          >
            <SwipeIcon/>
          </Animatable.View>)}
        onSwipeSuccess={swipeNext}
      />
    </Animatable.View>
  );
};

export default SwipePulseButton;
