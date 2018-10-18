import React from 'react';
import { View, WebView, Text, Image, StyleSheet } from 'react-native';
import { Gyroscope } from "react-native-sensors";

const Dimensions = require("Dimensions");
const PixelRatio = require("PixelRatio");
const window = Dimensions.get("window");

const deviceWidth = window.width;
const deviceHeight = window.height;

const imageWidth = 8 * deviceWidth;
const imageHeight = deviceHeight;

const middleOfTheScreenX = (imageWidth - deviceWidth) / 2;



export default class App extends React.Component {
  constructor(props){
    super(props);

    new Gyroscope({
      updateInterval: 50
    })
      .then(observable => {
        observable.subscribe(({ y }) => {
          this.setState(state => ({
            y: y + state.y
          }));
        });
      })
      .catch(error => {
        console.log("The sensor is not available!");
      });

      this.state = {
        image: 'img/panorama.jpeg',
        y: 0
      };
  }
  render() {
    return (
    
      // <WebView
      // source={{uri: 'https://google.pl'}}
      // style={{ marginTop: 20 }}
      // />
      <View style={styles.container}>
      <Image
        translateX={positionOnScreenX + movementX}
        style={styles.image}
        source={{ uri: this.state.image }}
      />
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    height: imageHeight,
    width: imageWidth
  }
});
