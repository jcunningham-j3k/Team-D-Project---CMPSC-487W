import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { getDoc, updateDoc, getFirestore, doc } from 'firebase/firestore';
import firebase from '../firebaseConfig';

import FormField from '../Components/FormField';
import SurveyModal from '../Components/SurveyModal';
import SurveyButton from '../Components/SurveyButton';

function Survey() {
    const db = getFirestore();

    const [idNumber, setIdNumber] = useState("");
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [travelMethod, setTravelMethod] = useState("")
    const [project, setProject] = useState("")
    const [feedback, setFeedback] = useState("")

    const [submit, setSubmit] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)

    const [roleOption, setRoleOption] = useState(null);
    const [travelOption, setTravelOption] = useState(null);
    const [projectOption, setProjectOption] = useState(null);

    const [isRoleClicked, setIsRoleClicked] = useState(false);
    const [isTravelClicked, setIsTravelClicked] = useState(false);
    const [isProjectClicked, setIsProjectClicked] = useState(false);

    const roleOptions = [
        { id: '1', label: 'Student' },
        { id: '2', label: 'Faculty' },
        { id: '3', label: 'Other' },
        ];
    const travelOptions = [
        { id: '1', label: 'Walked' },
        { id: '2', label: 'Drove' },
        { id: '3', label: 'Bus' },
        { id: '4', label: 'Uber' },
        { id: '5', label: 'Other' },
        ]; 
    const projectOptions = [
        { id: '1', label: 'Capstone' },
        { id: '2', label: 'Another Class' },
        { id: '3', label: 'Personal' },
        { id: '4', label: 'Other' },
        ];
    
    const handleRoleOption = (option) => {
        setRole(option.label)
        setRoleOption(option);
        setIsRoleClicked(false)
    };
    const handleTravelOption = (option) => {
        setTravelMethod(option.label)
        setTravelOption(option);
        setIsTravelClicked(false)
    };
    const handleProjectOption = (option) => {
        setProject(option.label)
        setProjectOption(option);
        setIsProjectClicked(false)
    };

    const handleRoleFocus = () => {
        setIsRoleClicked(true);
    };
    const handleTravelFocus = () => {
        setIsTravelClicked(true);
    };
    const handleProjectFocus = () => {
        setIsProjectClicked(true);
    };


    function buttonPress() {
        setSubmit(true)
        setModalVisible(true)
    }

    function modalClose() {
        setSubmit(false)
        setModalVisible(false);
    }

    useEffect(() => {
        if (submit) {
            const fetchAndUpdateSurvey = async () => {
                if (!idNumber) {
                    console.error("ID Number is required to fetch the user data.");
                    setFeedback("ID number is required")
                    return;
                }

                try {
                    const userDocRef = doc(db, 'Users', idNumber);
                    const userSnapshot = await getDoc(userDocRef);

                    if (userSnapshot.exists()) {
                        console.log('User found, updating data:', { name, email, role, travelMethod, project });
                        await updateDoc(userDocRef, {
                            Name: name,
                            Email: email,
                            Role: role,
                            TravelMethod: travelMethod,
                            Project: project,
                        });

                        setFeedback("         Survey submitted.\nThank you for your feedback!")
                    } else {
                        setFeedback("No user found with this ID.  Have you checked in?")
                    }
                } catch (error) {
                    console.error('Error fetching or updating document: ', error);
                }
            };

            fetchAndUpdateSurvey();
        }
    }, [submit]);



    return (
        <View style = {styles.container}>
            <Image source={require('../assets/LaunchBox_Logo.jpg')} style = {styles.image}></Image>
            <View style={styles.rootContainer}>
            <Text style={{fontSize: 18,fontWeight: 'bold', marginBottom: 5}}>Survey</Text>
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
                
                <Text style = {styles.label}>What is your role?</Text>
                <Pressable onPress={handleRoleFocus} style={styles.textBoxWrapper}>
                    <Text style={styles.textBox}> {role} </Text>
                </Pressable>
                {isRoleClicked && (<>
                    <FlatList
                        data={roleOptions}
                        style={{maxHeight: 100, marginBottom: 0}}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable style={[styles.optionButton,roleOption?.id === item.id && styles.roleOption,]} onPress={() => handleRoleOption(item)}>
                            <Text style={[styles.optionText,roleOption?.id === item.id]}>
                                {item.label}
                            </Text>
                            </Pressable>
                        )}/></>
                    )}

                <Text style = {styles.label}>How did you get here?</Text>
                <Pressable onPress={handleTravelFocus} style={styles.textBoxWrapper}>
                    <Text style={styles.textBox}> {travelMethod} </Text>
                </Pressable>
                {isTravelClicked && (<>
                    <FlatList
                        data={travelOptions}
                        style={{maxHeight: 100, marginBottom: 0}}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable style={[styles.optionButton,travelOption?.id === item.id && styles.travelOption,]} onPress={() => handleTravelOption(item)}>
                            <Text style={[styles.optionText,travelOption?.id === item.id]}>
                                {item.label}
                            </Text>
                            </Pressable>
                        )}/></>
                    )}
                
                <View style={{ flexShrink: 1 }}>
                <Text style = {styles.label}>What project are you working on?</Text>
                <Pressable onPress={handleProjectFocus} style={styles.textBoxWrapper}>
                    <Text style={styles.textBox}> {project} </Text>
                </Pressable>
                {isProjectClicked && (<>
                    <FlatList
                        data={projectOptions}
                        style={{maxHeight: 100, marginBottom: 0}}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Pressable style={[styles.optionButton,projectOption?.id === item.id && styles.projectOption,]} onPress={() => handleProjectOption(item)}>
                            <Text style={[styles.optionText,projectOption?.id === item.id]}>
                                {item.label}
                            </Text>
                            </Pressable>
                        )}/></>
                    )}
                </View>
                <SurveyButton title="Submit" onPress={buttonPress}/>
                <SurveyModal visible={modalVisible} onClose = {modalClose}>
                    <Text>{feedback}</Text>
                </SurveyModal>
            </View>
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
        flex: 1,
        padding: 20,
        borderRadius: 8,
        elevation: 4,
        width: '90%'
    },
    question: {
        fontSize: 14,
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    optionText: {
        fontSize: 14,
    },
    selectedOptionText: {
        marginTop: 20,
        fontSize: 14,
        color: '#333',
    },
    textBox: {
        backgroundColor: 'white',
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        fontSize: 14,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
    },
    image: {
        width: '91%',
        height: 90,
        marginLeft: 10,
        marginTop: '50'
      },

})
  
  export default Survey