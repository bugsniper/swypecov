import React, {useEffect, useState} from 'react';
import {View, Animated, StyleSheet} from 'react-native';


const CustomProgressBar = ({style, row, height, borderColor, borderWidth, borderRadius, barColor, fillColor, progress, duration}) => {
  let animation = new Animated.Value(progress);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: progress,
      duration: duration
    }).start();
  }, [progress]);

  const widthInterpolated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  return (
    <View style={[{ flexDirection: "row", height }, row ? { flex: 1 } : undefined , {...style}]}>
      <View style={{ flex: 1, borderColor, borderWidth, borderRadius }} >
        <View
          style={[ StyleSheet.absoluteFill, { backgroundColor: fillColor } ]}
        />
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: widthInterpolated,
            backgroundColor: barColor
          }}
        />
      </View>
    </View>
  );
};

CustomProgressBar.defaultProps = {
  height: 10,
  borderColor: "#000",
  borderWidth: 1,
  borderRadius: 0,
  barColor: "#000",
  fillColor: "#fff",
  duration: 10000
};

export default CustomProgressBar;
