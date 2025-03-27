import { StyleSheet, Text, View, Image } from 'react-native';
import { useState } from 'react';

import FormField from '../Components/FormField';
import SurveyModal from '../Components/SurveyModal';
import SurveyButton from '../Components/SurveyButton';

function Survey() {

    const [idNumber, setIdNumber] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [travelMethod, setTravelMethod] = useState("")
    const [project, setProject] = useState("")

    const [modalVisible, setModalVisible] = useState(false)

    function buttonPress() {
        setModalVisible(true)
    }

    function modalClose() {
        setModalVisible(false);
      }

    return (
        <View style = {styles.container}>
            <View style={styles.rootContainer}>
                <FormField 
                    label = 'PSU ID Number' 
                    //secureTextEntry = {false}
                    autoCapitalize = {'none'}
                    onChangeText = {setIdNumber}
                    isInvalid = {false}
                    />
                <FormField 
                    label = 'Name' 
                    autoCapitalize = {'none'}
                    onChangeText = {setName}
                    isInvalid = {false}
                    />
                <FormField 
                    label = 'Email' 
                    autoCapitalize = {'none'}
                    onChangeText = {setEmail}
                    isInvalid = {false}
                    />
                <FormField 
                    label = 'What is your role at Penn State?' 
                    autoCapitalize = {'none'}
                    onChangeText = {setRole}
                    isInvalid = {false}
                    />
                <FormField 
                    label = 'How did you get to the LaunchBox' 
                    autoCapitalize = {'none'}
                    onChangeText = {setTravelMethod}
                    isInvalid = {false}
                    />
                <FormField 
                    label = 'Is there a specific project you are working on?' 
                    autoCapitalize = {'none'}
                    onChangeText = {setProject}
                    isInvalid = {false}
                    />
            </View>
            <SurveyButton title="Submit" onPress={buttonPress}/>
            <SurveyModal visible={modalVisible} onClose = {modalClose}>
                <Text>Thank you for your feedback!</Text>
            </SurveyModal>
            <Text>{idNumber}</Text>
            <Text>{name}</Text>
            <Text>{email}</Text>
            <Text>{role}</Text>
            <Text>{travelMethod}</Text>
            <Text>{project}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rootContainer: {
        margin: 10,
        backgroundColor: '#f1943c',
        padding: 20,
        borderRadius: 8,
        elevation: 4,
    },

})
  
  export default Survey