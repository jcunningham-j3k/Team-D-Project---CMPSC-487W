import { Modal, View, Button, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export const SurveyModal = ({ visible, onClose, children }) => {

    return (
        <Modal
            animationType = 'slide'
            transparent = {true}
            visible = {visible}
            onRequestClose = {onClose}
        >
            <TouchableWithoutFeedback onPress = {onClose}>
                <View style = {styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style = {styles.modalView}>
                            {children}
                            <Button title = 'Close' onPress={onClose}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 30,
      backgroundColor: '#b4b4b4',
      borderRadius: 10,
      padding: 35,
      alignItems: 'center',
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });
  
  export default SurveyModal;