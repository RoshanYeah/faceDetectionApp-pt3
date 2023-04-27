import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    Platform,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';

import * as Permissions from "expo-permissions";

import * as FaceDetector from 'expo-face-detector';
import { Camera } from 'expo-camera';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

import Filter1 from './filter1';
import Filter2 from './filter2';
import Filter3 from './filter3';
import Filter4 from './filter4';
import Filter5 from './filter5';
import Filter6 from './filter6';
import Filter7 from './filter7';
import Filter8 from './filter8';
import Filter9 from './filter9';
import Filter10 from './filter10';

var dict = [
    {
        "id":"1",
        "image": require("../assets/glasses2.jpeg")
    },
    {
        "id":"2",
        "image": require("../assets/glasses1.jpeg")
    },
    {
        "id":"3",
        "image": require("../assets/Frapp-02.png")
    },
    {
        "id":"4",
        "image": require("../assets/Frapp-03.png")
    },
    {
        "id":"5",
        "image": require("../assets/Frapp-04.png")
    },
    {
        "id":"6",
        "image": require("../assets/Frapp-05.png")
    },
    {
        "id":"7",
        "image": require("../assets/Frapp-06.png")
    },
    {
        "id":"8",
        "image": require("../assets/Frapp-07.png")
    },
    {
        "id":"9",
        "image": require("../assets/Frapp-08.png")
    },
    {
        "id":"10",
        "image": require("../assets/Frapp-09.png")
    }
]


export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: [],
            currentFilter: "filter_1"
        }
        this.onCameraPermission = this.onCameraPermission.bind(this)
        this.onFacesDetected = this.onFacesDetected.bind(this)
        this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission({ status }) {
        this.setState({ hasCameraPermission: status === 'granted' })
    }

    onFacesDetected({ faces }) {
        this.setState({ faces: faces })
    }

    onFaceDetectionError(error) {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <View style={{flexWrap:"wrap", flexDirection:'row'}}>
                        <Text style={styles.titleText1}>FR</Text>
                        <Text style={styles.titleText2}>App</Text>
                    </View>
                    <View style={{flexWrap:"wrap", flexDirection:'row'}}>
                        <Text style={styles.subheading1}>Try our</Text>
                        <Text style={styles.subheading2}>Cool frames</Text>
                    </View>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode["1"],
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map(face => {
                            if(this.state.currentFilter == "filter_1"){
                                return <Filter1 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_2"){
                                return <Filter2 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_3"){
                                return <Filter3 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_4"){
                                return <Filter4 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_5"){
                                return <Filter5 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_6"){
                                return <Filter6 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_7"){
                                return <Filter7 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_8"){
                                return <Filter8 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_9"){
                                return <Filter9 key={face.faceID} face={face} />
                            } else if(this.state.currentFilter == "filter_10"){
                                return <Filter10 key={face.faceID} face={face} />
                            }
                        })
                    }
                </View>
                <View style={styles.framesContainer} >
                    <ScrollView horizontal style={{flexDirection:"row"}} showsHorizontalScrollIndicator={false} >

                        {dict.map((index)=>{
                            return(
                                <TouchableOpacity style={styles.filterImageContainer} onPress={()=>{
                                    this.setState({currentFilter:`filter_${index.id}` })
                                }} >
                                    <Image source={index.image} style={{height:32, width:80}} />
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    titleText1: {
        fontSize: RFValue(30),
        fontWeight: "bold",
        color: "#efb141",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    titleText2: {
        fontSize: RFValue(30),
        fontWeight: "bold",
        color: "white",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    subheading1: {
        fontSize: RFValue(20),
        color: "#efb141",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    subheading2: {
        fontSize: RFValue(20),
        color: "white",
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -3, height: 3 },
        textShadowRadius: 1
    },
    cameraStyle: {
        flex: 0.65
    },
    framesContainer: {
        flex: 0.2,
        paddingLeft: RFValue(20),
        paddingRight: RFValue(20),
        paddingTop: RFValue(30),
        backgroundColor: "#6278e4"
    },
    filterImageContainer: {
        height: RFPercentage(8),
        width: RFPercentage(15),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e4e7f8",
        borderRadius: 30,
        marginRight: 20
    }
});