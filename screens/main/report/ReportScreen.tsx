import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import InputField from '../../../components/input_fields/InputField';
import LocalStorage from '../../../local_storage/LocalStorage';
import { signOut } from '../../../redux/actions/tokenActions';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import { sendReport } from '../../../api/guide/guideRequests';

const radioButtonsData: RadioButtonProps[] = [
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Spam',
        value: 'Spam'
    },
    {
        id: '2',
        label: 'Harassment',
        value: 'Harassment'
    },
    {
        id: '3',
        label: 'Adult Content',
        value: 'Adult Content'
    },
    {
        id: '4',
        label: 'Child Pornography',
        value: 'Child Pornography'
    },
    {
        id: '5',
        label: 'Drug Advocacy',
        value: 'Drug Advocacy'
    },
    {
        id: '6',
        label: 'Selling Weapons',
        value: 'Selling Weapons'
    },
    {
        id: '7',
        label: 'Violence',
        value: 'Violence'
    },
    {
        id: '8',
        label: 'Encouraging Bullying',
        value: 'Encouraging Bullying'
    },
    {
        id: '9',
        label: 'Encouraging Suicied',
        value: 'Encouraging Suicied'
    },
    {
        id: '10',
        label: 'Animal Abuse',
        value: 'Animal Abuse'
    },
    {
        id: '11',
        label: 'Misleading Information',
        value: 'Misleading Information'
    },
    {
        id: '12',
        label: 'Fraud',
        value: 'Fraud'
    },
    {
        id: '13',
        label: 'Extremism',
        value: 'Extremism'
    },
    {
        id: '14',
        label: 'Hate Speech',
        value: 'Hate Speech'
    },
    {
        id: '15',
        label: 'Other:',
        value: 'Other:'
    },
]


const ReportScreen = (props) => {
    const insets = useSafeAreaInsets();

    const [reason, setReason] = useState('');
    const onBackButtonPress = () => {
        props.navigation.goBack();
    }

    const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData)

    const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
        setRadioButtons(radioButtonsArray);
    }

    const onPressSaveButton = () => {
        const guideId = props.route.params.guideId;
        const selectedRadioButton = radioButtons.filter((radioButton: RadioButtonProps) => radioButton.selected)
        if (selectedRadioButton.length != 0){
            if (selectedRadioButton[0].value == 'Other:') {
                sendReport(props.userToken, guideId, reason)
                .then(status => {
                    if (status == 200) {
                        props.navigation.goBack();
                        alert('Thank you for your report!');
                    }
                })
                .catch(error => console.error(error));
            }
            else {
                sendReport(props.userToken, guideId, selectedRadioButton[0].value)
                .then(status => {
                    if (status == 200) {
                        props.navigation.goBack();
                        alert('Thank you for your report!');
                    }
                })
                .catch(error => console.error(error));
            }
                   
        }
       
        
    }

    return (
        <View style={{
            paddingTop: insets.top,
            flex: 1,
            backgroundColor: 'white'
        }}
        >
            <View style={styles.header}>
                <View style={styles.headerLeftItem}>
                    <Button title={'Back'} onPress={() => onBackButtonPress()} />
                </View>
                <View style={styles.headerCenterItem}>
                    <Text style={styles.headerTitle}>Report</Text>
                </View>
                <View style={styles.headerRightItem}>
                    <Button title={'Send'} onPress={() => onPressSaveButton()} />
                </View>
            </View>
            <View style={styles.body}>
                <Text>Report reason</Text>
                <View style={styles.radioButtonGroup}>
                    <RadioGroup
                        radioButtons={radioButtons}
                        onPress={onPressRadioButton}
                    />
                </View>
                <InputField placeholder={"Other reason"} multiline={true} numberOfLines={10} onChangeText={(text) => { setReason(text) }} />
            </View>

        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        userToken: state.tokenReducer.userToken
    }
};
export default connect(mapStateToProps)(ReportScreen);

const styles = StyleSheet.create({
    header: {
        flex: 1,

        borderBottomColor: "#A8B0BA",
        borderBottomWidth: 0.5,
        flexDirection: 'row',
        

    },
    headerLeftItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10

    },
    headerCenterItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerRightItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600'
    },
    body: {
        paddingTop: 20,
        flex: 19,
        paddingHorizontal: 15,
        justifyContent: 'flex-start',
    },
    radioButtonGroup: {
        alignItems: 'flex-start'
    }
})