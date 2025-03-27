import { StyleSheet, Text, View } from "react-native";
import Speedometer from "react-native-speedometer-chart";

// Function to dynamically return the color based on the value
const getInternalColor = (value, max) => {
  const percentage = (value / max) * 100;
  
  if (percentage <= 33) {
    return "#39e649"; // Green for values 0-33%
  } else if (percentage <= 66) {
    return "#ff9900"; // Orange for values 34-66%
  } else {
    return "#ff0000"; // Red for values >67%
  }
};


function MySpeedometer({value, max}) {

    const internalColor = getInternalColor(value, max); 

    return (
      <View style={styles.app}>
        <Text style={styles.title}>Crowd Meter</Text>
        <Speedometer
        value={value}
        totalValue={max}
        size={250}
        outerColor="#8B8D8E"
        internalColor={internalColor}
        showText
        text={value}
        textStyle={{
          color: "black",
          fontSize: 30,
        }}
        showLabels
        labelStyle={{ color: "blue" }}
        //showPercent
        //percentStyle={{ color: "red" }}
        />
      </View>
    );

}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    maxWidth: 500,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center"
  },
  text: {
    lineHeight: 24,
    fontSize: 28,
    textAlign: "center"
  }
});

export default MySpeedometer;