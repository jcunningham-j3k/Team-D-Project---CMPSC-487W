import { View, Text, TextInput, StyleSheet} from 'react-native';

function FormField(props) {
    return <View style={styles.formFieldContainer}>
        <Text style = {[styles.label, props.isInvalid && styles.errorLabel]}>{props.label}</Text>
        <TextInput 
            style = {[styles.input, props.isInvalid && styles.errorInput]} 
            //secureTextEntry = {props.secureTextEntry}
            keyboardType = {props.keyboardType}
            onChangeText={props.onChangeText}
            autoCapitalize={props.autoCapitalize}
            />
    </View>
}

export default FormField;

const styles = StyleSheet.create({
    formFieldContainer: {
        marginVertical: 4,
    },
    label: {
        fontSize: 16,
        color: 'black',
    },
    errorLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: 'red',
    },
    input: {
        backgroundColor: 'white',
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        fontSize: 14,
    },
    errorInput: {
        backgroundColor: 'black',
        padding: 8,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        fontSize: 18,
        color: 'red',
    },   

})