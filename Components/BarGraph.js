import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { G, Rect, Defs, LinearGradient, Stop } from 'react-native-svg';

const screenWidth = 150;

function BarGraph({title, data}) {
  const barWidth = screenWidth / data.length - 10;
  const labelOffset = barWidth / 2;

  const maxValue = Math.max(...data.map(item => item.value));
  const scale = 170 / maxValue;
  const animatedHeights = useRef(data.map(() => new Animated.Value(0))).current;

  const [selectedValue, setSelectedValue] = useState(null);
  const [currentValue, setCurrentValue] = useState(-1);

  useEffect(() => {
    const animations = animatedHeights.map((animatedHeight, index) => (
      Animated.timing(animatedHeight, {
        toValue: data[index].value * scale,
        duration: 1000,
        easing: Easing.elastic(1),
        useNativeDriver: false,
      })
    ));

    Animated.stagger(100, animations).start();
  }, [animatedHeights, scale]);

  const AnimatedRect = Animated.createAnimatedComponent(Rect);

  const handleBarPress = (value) => {
    console.log(value)
    if (currentValue === value) {
      console.log('enter')
      setCurrentValue(-1)
      setSelectedValue('');
    }
    else {
      setCurrentValue(value)
      setSelectedValue(value);
    }
  };

  return (
    <View style={styles.card}>
      <Text style = {styles.title}>{title}</Text>
      <View style={styles.container}>
        <Svg height="220" width={screenWidth}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="100%">
              <Stop offset="0" stopColor="#6a11cb" />
              <Stop offset="1" stopColor="#2575fc" />
            </LinearGradient>
          </Defs>
          <G>
            {data.map((item, index) => (
              <AnimatedRect
                key={item.label}
                x={index * (barWidth + 12)}
                y={animatedHeights[index].interpolate({
                  inputRange: [0, item.value * scale],
                  outputRange: [200, 200 - item.value * scale],
                })}
                width={barWidth}
                height={animatedHeights[index]}
                fill="url(#grad)"
                rx="4"
                opacity={selectedValue === item.value ? 1 : 0.7}
                onPress={() => handleBarPress(item.value)}
              />
            ))}
          </G>
        </Svg>
        {selectedValue && (
        <View style={styles.valueDisplay}>
            <Text style={styles.valueText}>Hours: {selectedValue}</Text>
        </View>
        )}
        <View style={styles.labels}>
          {data.map((item, index) => (
            <Text
              key={item.label}
              style={[
                styles.label,
                {
                  width: barWidth,
                  left: index * (barWidth + 12) + labelOffset - barWidth / 2,
                },
              ]}
            >
              {item.label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    elevation: 6,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    padding: 20,
    margin:5
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 5,
    position: 'absolute',
    width: screenWidth,
    top: 210,
  },
  label: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Arial, sans-serif',
    position: 'absolute',
  },
  valueDisplay: {
    position: 'absolute',
    top: -10,
    left: 0,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  title: {
    fontSize: 16,
    fontWeight:'bold',
    textAlign:'center'
  }
});

export default BarGraph;