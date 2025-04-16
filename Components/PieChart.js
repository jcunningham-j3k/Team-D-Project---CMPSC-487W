import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { G, Circle, Text as SvgText, Rect } from 'react-native-svg';

const { width } = Dimensions.get('window');

function MyPieChart({data}) {
  const radius = width / 7.5;
  const strokeWidth = 40;
  const circumference = 2 * Math.PI * radius;

  const colors = ['green', 'blue', 'red', 'orange', '#970997', 'yellow'];

  // If data is empty, return null
  if (data.length === 0) return null;

  // Calculate the total sum of the data
  const total = data.reduce((sum, value) => sum + value, 0);

  // Normalize the data to ensure the total sum adds up to 100
  const normalizedData = data.map(value => (value / total) * 100);

  // Prepare segments with normalized values and colors
  const segments = normalizedData.map((value, index) => ({
    value,
    color: colors[index % colors.length],  // Use modulo to cycle through the colors array
  }));

  return (
    <View style={styles.container}>
      <Svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} viewBox={`0 0 ${radius * 2 + strokeWidth} ${radius * 2 + strokeWidth}`}>
        <G rotation="-90" origin={`${radius + strokeWidth / 2}, ${radius + strokeWidth / 2}`}>
          {segments.map((segment, index) => {
            const offset = segments.slice(0, index).reduce((sum, segment) => sum + segment.value, 0);
            const dashArray = circumference * (segment.value / 100);
            const dashOffset = circumference * (offset / 100);

            return (
              <G key={index}>
                <Circle
                  cx={radius + strokeWidth / 2}
                  cy={radius + strokeWidth / 2}
                  r={radius}
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                  strokeDashoffset={-dashOffset}
                />
              </G>
            );
          })}
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'relative',
  },
});

export default MyPieChart;
