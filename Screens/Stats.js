import { StyleSheet, Text, View, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import MyPieChart from '../Components/PieChart';
import SurveyButton from '../Components/SurveyButton';

function StatsScreen() {
  const db = getFirestore();

  const [roleCounts, setRoleCounts] = useState({});
  const [projectCounts, setProjectCounts] = useState({});
  const [travelCounts, setTravelCounts] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false)

  const roleOptions = ['Student', 'Faculty', 'Other'];
  const projectOptions = ['Capstone', 'Another Class', 'Personal', 'Other'];
  const travelOptions = ['Walked', 'Drove', 'Bus', 'Uber', 'Other'];

  const colors = ['green', 'blue', 'red', 'orange', '#970997'];

  async function countDocumentsWithValue(fieldName, value) {
    try {
      const q = query(collection(db, 'Users'), where(fieldName, '==', value));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting documents: ', error);
      return 0;
    }
  }

  function buttonPress() {
    setRefresh(true)
  }

  useEffect(() => {
    setRefresh(false)
    const fetchCounts = async () => {
      try {
        // Fetch role counts concurrently
        const roleCountPromises = roleOptions.map(role =>
          countDocumentsWithValue('Role', role).then(count => ({ role, count }))
        );

        // Fetch project counts concurrently
        const projectCountPromises = projectOptions.map(project =>
          countDocumentsWithValue('Project', project).then(count => ({ project, count }))
        );

        // Fetch travel counts concurrently
        const travelCountPromises = travelOptions.map(travel =>
          countDocumentsWithValue('TravelMethod', travel).then(count => ({ travel, count }))
        );

        // Wait for all the promises to resolve
        const roleCountsResult = await Promise.all(roleCountPromises);
        const projectCountsResult = await Promise.all(projectCountPromises);
        const travelCountsResult = await Promise.all(travelCountPromises);

        // Update state with the fetched counts
        const roleCountsTemp = {};
        roleCountsResult.forEach(({ role, count }) => {
          roleCountsTemp[role] = count;
        });

        const projectCountsTemp = {};
        projectCountsResult.forEach(({ project, count }) => {
          projectCountsTemp[project] = count;
        });

        const travelCountsTemp = {};
        travelCountsResult.forEach(({ travel, count }) => {
          travelCountsTemp[travel] = count;
        });

        // Set the state with the new counts
        setRoleCounts(roleCountsTemp);
        setProjectCounts(projectCountsTemp);
        setTravelCounts(travelCountsTemp);

        // Set dataLoaded to true after all data has been fetched
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, [refresh]);

  // Safeguard for empty roleCountArray and ensure it is always an array of numbers
  const roleCountArray = dataLoaded? roleOptions.map(role => roleCounts[role] || 0) : [];
  const travelCountArray = dataLoaded? travelOptions.map(travel => travelCounts[travel] || 0) : [];
  const projectCountArray = dataLoaded ? projectOptions.map(project => projectCounts[project] || 0) : [];

  const renderColoredSquare = (color) => {
    return (
      <View style={[styles.colorSquare, { backgroundColor: color }]} />
    );
  };

  return (
    <View style={styles.rootContainer}>
      <Image source={require('../assets/LaunchBox_Logo.jpg')} style={styles.image} />
      <View style={styles.statView}>
        <View style = {styles.role}>
          <View style = {styles.roleText}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Role</Text>
            <View style = {{flexDirection: 'row'}}>
            {renderColoredSquare(colors[0])}
            <Text style = {{fontSize: 18}}>Student: {roleCounts['Student'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[1])}
              <Text style = {{fontSize: 18}}>Faculty: {roleCounts['Faculty'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[2])}
              <Text style = {{fontSize: 18}}>Other: {roleCounts['Other'] || 0}</Text>
            </View>
          </View>
          <View style = {styles.roleChart}>
            {dataLoaded && <MyPieChart data={roleCountArray}/>}
          </View>
        </View>
        <View style = {styles.travel}>
          <View style = {styles.travelChart}>
            {dataLoaded && <MyPieChart data={travelCountArray} />}
          </View>
          <View style = {styles.travelText}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Travel Method</Text>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[0])}
              <Text style = {{fontSize: 18}}>Walked: {travelCounts['Walked'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[1])}   
              <Text style = {{fontSize: 18}}>Drove: {travelCounts['Drove'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[2])}  
            <Text style = {{fontSize: 18}}>Bus: {travelCounts['Bus'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[3])}
              <Text style = {{fontSize: 18}}>Uber: {travelCounts['Uber'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[4])}
              <Text style = {{fontSize: 18}}>Other: {travelCounts['Other'] || 0}</Text>
            </View>
          </View>
        </View>
        <View style = {styles.role}>
          <View style = {styles.roleText}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Project</Text>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[0])}
              <Text style = {{fontSize: 18}}>Capstone: {projectCounts['Capstone'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[1])}
              <Text style = {{fontSize: 18}}>Class: {projectCounts['Another Class'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[2])}
              <Text style = {{fontSize: 18}}>Personal: {projectCounts['Personal'] || 0}</Text>
            </View>
            <View style = {{flexDirection: 'row'}}>
              {renderColoredSquare(colors[3])}
              <Text style = {{fontSize: 18}}>Other: {projectCounts['Other'] || 0}</Text>
            </View>
          </View>
          <View style = {styles.roleChart}>
            {dataLoaded && <MyPieChart data={projectCountArray} />}
          </View>
        </View>
        <SurveyButton title="Refresh" onPress={buttonPress}/>
      </View>
    </View>
  );
}

export default StatsScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  statView: {
    marginLeft: '5%',
    marginTop: '6%',
  },
  image: {
    width: '91%',
    height: 90,
    marginLeft: 22.5,
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 50
  },
  /*
  stats: {
    color: 'black',
    fontSize: 32,
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  */
  role: {
    flexDirection:'row',
    height: '25%',
    alignItems: 'center'
  },
  roleText: {
    width:'50%',
  },
  roleChart: {
    height: '50%',
  },
  travel: {
    flexDirection:'row',
    height: '25%',
    //marginTop: '8%',
    marginBottom: '6%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  travelText: {
    width:'50%',
    marginLeft: '15%',
    marginBottom: '10%',
    justifyContent: 'center',
    marginTop:'17%'
  },
  travelChart: {
    height: '50%'
  },
  colorSquare: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

});
