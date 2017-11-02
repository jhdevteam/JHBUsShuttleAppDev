/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * Copyright cuiyueshuai
 * @author cuiyueshuai<850705402@qq.com>
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
//import NavigationBar from 'react-native-navbar';
//import HideableView from 'react-native-hideable-view';
import { Dimensions } from 'react-native';
import ExpandableList from 'react-native-expandable-section-flatlist';
import MockData from './mockData';
import DictStyle from './DicStyle';
import Crashes from "mobile-center-crashes";
import {  Icon } from 'react-native-elements';

//class Example extends React.PureComponent {
export const RtData=({RouteResult})=>
{
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //       visible: false
  //   };
  //   this.toggle = this.toggle.bind(this);

    this.styles = {
      container: {
        flex: 1,
       },

        iconLeft: {
        marginLeft: 10,
        marginTop:5,
  },
     };
  //   this.rightButtonConfig = {
  //     title: 'Time Table',
  //     handler: () => this.toggle(),
  //   };
  //   this.titleConfig = {
  //     title: 'Bus shuttle',
  //   };
  // }

  /* function toggle() {
    this.setState({
        visible: !this.state.visible
    });
  } */

    _renderRow = (rowItem, rowId, sectionId) => (
      <TouchableOpacity key={rowId} onPress={() => {}}>
        <View
          style={{ marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
            borderBottomColor: DictStyle.colorSet.lineColor }}
        >
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
            borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
            {rowItem.title}
          </Text>
        </View>
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
            borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
            {rowItem.title2}
          </Text>
        </View>
        </View>
      </TouchableOpacity>
    );
  
    _renderSection = (section, sectionId)  => {
      return (
        <View
          style={{ marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
            borderBottomColor: DictStyle.colorSet.lineColor }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
              {section}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: DictStyle.fontSet.xSize, color: DictStyle.colorSet.weakFontColor }}>
              {'Show'}
            </Text>
          </View>
        </View>
      );
    };

    
      return (
        <View style={this.styles.container}>
        {/* <NavigationBar
          title={this.titleConfig}
          rightButton={this.rightButtonConfig}
        /> */}
        {/* <HideableView visible={this.state.visible}> */}
        
        <ExpandableList
          dataSource={RouteResult}
          headerKey="ROUTE_TITLE"
          memberKey="ROUTE_SERVICE"
          renderRow={this._renderRow}
          renderSectionHeaderX={this._renderSection}
        />
       {/*  </HideableView> */}
      </View>
      );
    }
  






export default RtData;

