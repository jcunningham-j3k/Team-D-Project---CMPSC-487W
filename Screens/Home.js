import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';

import MySpeedometer from '../Components/Speedometer';
import BarGraph from '../Components/BarGraph';
import SurveyButton from '../Components/SurveyButton';

function Home(props) {

  value=12;
  max=30;

  const totalHours = [
    { label: 'M', value: 1500 },
    { label: 'T', value: 1000 },
    { label: 'W', value: 1710 },
    { label: 'R', value: 3000 },
    { label: 'F', value: 2000 },
  ];

  const avgTime = [
    { label: 'M', value: 15 },
    { label: 'T', value: 10 },
    { label: 'W', value: 3 },
    { label: 'R', value: 30 },
    { label: 'F', value: 20 },
  ];

  function goToSurvey() {
    props.navigation.navigate("Survey", {})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/LaunchBox_Logo.jpg')} style = {styles.settingsImage}></Image>
      </View>
      <View>
        <View style={styles.speedometer}>
          <MySpeedometer value={value} max={max}/>
        </View>
        <View style={styles.barGraph}>
          <BarGraph title = {'Total Hours'} data = {totalHours}></BarGraph>
          <BarGraph title = {'Avg Time Spent'} data = {avgTime}></BarGraph>
        </View>
      </View>
      <SurveyButton title='Survey' onPress = {goToSurvey}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  header: {
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 50
  },
  settingsImage: {
    width: '91%',
    height: 90,
    marginLeft: 10
  },
  content: {
    alignSelf:'center',
    fontSize: 20,
    marginTop: 30
  },
  speedometer: {
    alignSelf:'center',
    //transform: [{ scale: 0.8 }],
    marginTop: '25',
    marginBottom: '10'
  },
  barGraph: {
    flexDirection: 'row',
    padding:10,
    
  }

});

export default Home
