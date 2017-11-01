/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Crashes from "mobile-center-crashes";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import JHShuttleMap from "./Source/MapHome";
export default class JHShuttleServiceApp extends Component {
  render() { 
    //Crashes.generateTestCrash();
     return (
       
         <JHShuttleMap {...this.props}/>       
      );
  }
}

AppRegistry.registerComponent('JHShuttleServiceApp', () => JHShuttleServiceApp);
