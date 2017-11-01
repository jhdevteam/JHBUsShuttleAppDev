/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { Vibration, AppRegistry,StyleSheet,Text,TouchableOpacity,AsyncStorage, View, Image, Modal, TouchableHighlight, ScrollView, FlatList} from 'react-native';
//import {Container} from 'native-base';
//import HideableView from 'react-native-hideable-view';
import {Fonts} from 'react-native-vector-icons';
import { Tabs, Tab, Icon , SocialIcon, Header, Avatar} from 'react-native-elements';
import ExpandableList from 'react-native-expandable-section-flatlist';
import { WeatherWidget } from 'react-native-weather';
import MapView from 'react-native-maps';
import ModalDropdown from 'react-native-modal-dropdown';
import renderIf from './renderIf';
import renderIfElse from './renderIfElse';
import MockData from './mockData';
import DictStyle from './DicStyle';
import MapComponent from "./MapComponent";
import RtData from "../API/RouteData";
import Crashes from "mobile-center-crashes";

const styles = StyleSheet.create({
  ShuttleDetailWrapper: {
    backgroundColor: '#fff', 
    zIndex:190, 
    borderWidth: 1,
    borderColor: '#000',
  },
  ShuttleDetailHeaderText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20, 
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    borderWidth:2,
    borderColor:'#566AB5',
    flex: 1,
    height: 540,
  },
  container: {
    flex: 1,
    position:'relative',
  },
  modalContainer:{
    flex:1, 
    flexDirection: 'column', 
    marginTop: 80, 
    backgroundColor:'rgb(198,201,204)'
  },
  modalCLoseIcon:{
    fontSize: 30, 
    fontWeight: 'bold', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalHeader: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomWidth:1, 
    borderBottomColor:'#00f',
  },
  ModalDroDownContainer: {
    height: 70,
    width: '92%',
    left:'4%',
    top: 10,
    backgroundColor:'#fff',
    justifyContent: 'center', 
    paddingLeft: 10,
    borderBottomWidth:1, 
    borderBottomColor:'#eee',
    opacity: 10,
  },
  ModalDropDownText: {
    marginBottom:5,
    marginLeft: 120,
    fontSize:15, 
    fontWeight: 'normal', 
    color: '#333',
  },
  ModalDropDownTextOption: {
    marginBottom:5,
    marginLeft: 10,
    fontSize:15, 
    fontWeight: 'normal', 
    color: '#666',
  },
  ModalDropDownLabel: {
    position:'absolute',
    fontSize:12, 
    fontWeight: 'bold', 
    color: '#333',
  },

});

class Home extends React.Component{

  constructor(props) {
            super(props);
                this.state = {
                avtarSource: '_click',
                "myKey":'',
               
                
            };
        }
         
    
  
  
componentDidMount()
{    
    var rx = this;
    this.props.getPresentPosition();
    
     AsyncStorage.getItem("myKey").then((value) => {
            //this.setState({"myKey": value});  
            if(value && value !=null) 
              {


                var value = JSON.parse(value);
                this.props.getRouteResult(value.START_POINT,value.END_POINT);
                //var pickIndex = getIndex(value.START_POINT)
                this.props.getLocationIndex(value.START_POINT);
                this.props.getDropPicLocation({
                  key:"pickUp",
                  value:this.props.GetLocIndex
                }); 
                this.props.getLocationIndex(value.END_POINT);
                this.props.getDropPicLocation({
                  key:"dropOff",
                  value:this.props.GetLocIndex
                }); 
              }        
        }).done();
		setTimeout(function(){
      rx.props.getRouteDetails();      
    }, 1000);
}

componentDidUpdate(prevProps, prevState) {
  if(this.props.pickDropData.pickUp && this.props.pickDropData.dropOff)
  {
    if ((prevProps.pickDropData.pickUp !== this.props.pickDropData.pickUp)||(prevProps.pickDropData.dropOff !== this.props.pickDropData.dropOff)) {    
            this.props.getRouteResult(this.props.pickDropData.pickUp,this.props.pickDropData.dropOff);       
  }  
  }
}
    
  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

    render() {
      const region = {
        longitude:-71.05977,
        latitude:42.35843,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
      }  
      return (
        // <Container>
        <View style={{flex:1, flexDirection:'column'}}>
          <View style={{height: 78}}>
            <Header
                statusBarProps={{ barStyle: 'light-content' }}
                leftComponent={<JHLogoComponent />}
                rightComponent={<HeaderCustomComponent />}
                outerContainerStyles={{ backgroundColor: '#566AB5', height: 78}}
            />
          </View>
          <View>
            <WeatherComponent />
          </View>
         
                {
                  this.props.LocatioDetails && 
                  <MapComponent region={region} 
                  pickDropDeatils={this.props.LocatioDetails} 
                  getDropPicLocation={this.props.getDropPicLocation} 
                  pickDropData={this.props.pickDropData} 
                  toggleShowRouteTime={this.props.toggleShowRouteTime} 
                  ShowHide={this.props.ShowHide}
                  getRouteResult={this.props.getRouteResult}
                  RouteResult={this.props.RouteResult}
                  toggleShowRouteDeatils={this.props.toggleShowRouteDeatils}
                  showHideRt={this.props.showHideRt}  
                  getPickDropTimeDetails={this.props.getPickDropTimeDetails}
                  PickDropTime={this.props.PickDropTime} 
                  avtarSource = {this.props.TogglePickDrop} 
                  reversePickDrop= {this.props.reversePickDrop}      
                 />
                }
          {/* <View style={styles.ModalDroDownContainer}>
            <ModalDropDownComponents />
          </View> */}
    </View>
      // </Container>
      );
    }
  }

  class WeatherComponent extends React.Component{
    render(){
      return(
        <View style={{height: 48, width: '100%',backgroundColor: '#F2F1CE'}}>
          <WeatherWidget
            api={"1b9324ec586de455cc0fd7dbfe6c82e0"}
            lat={"42.3601"}
            lng={"71.0589"}
            />
        </View>   
      );
    }
  }

  class MapComponent1 extends React.Component{
    render(){
      const initialRegion = {
        latitude: 42.35843,
        longitude: -71.05977,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }     
      return(
        <MapView style={styles.map}
          provider = {MapView.POOVIDER_GOOGLE}
          initialRegion={{
            latitude: 42.35843,
            longitude: -71.05977,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          location = 'Boston'
          onMapReady = {console.log('Map Loaded')}
        >
        </MapView>
      );
    }
  }

  class Loader extends React.Component{
    render(){
      return(
        <View style={{opacity: 1, backgroundColor: 'black',...StyleSheet.absoluteFillObject,alignItems:'center', marginVertical:'50%'}}>
          <Image source={require('../Assets/Images/jhlogo_1.png')} style={{ top: 0, }}/>
          <Icon
                name='spinner-3'
                type='evilicon'
                color='#f00'
                underlayColor='#f00'
                iconStyle={{fontSize:100}}
          />
        </View>
      );
    }
  }

  class ModalDropDownComponents extends React.Component{
    
    constructor(props){
      super(props);
      this.state = {
        dropOption : 0,
        avtarSource: '_click',
        pickupLoc: '',
        dropOffLoc: '',
      };
    }


    setOptionVisible(that) {
      this.setState({avtarSource : that});
    }    

    render(){
      
      return(
        <View style={{flexDirection:'column'}}>
          <View style={{position:'absolute', left: 1, zIndex:190, backgroundColor:'#fff'}}>
            {renderIfElse(this.state.avtarSource == '_click', 
              <Avatar
                  width={44}
                  height={44}
                  source={require("../Assets/Images/arrows_click.jpg")}
                  avatarStyle={{height:44, width: 44}}
                  onPress={() => this.setOptionVisible('_reverse')}
                  activeOpacity={1}
              />, 
            )}
            {renderIf(this.state.avtarSource == '_reverse', 
              <Avatar
                  width={44}
                  height={44}
                  source={require("../Assets/Images/arrows_reverse.jpg")}
                  avatarStyle={{height:44, width: 44}}
                  onPress={() => this.setOptionVisible('_click')}
                  activeOpacity={1}
              />
            )}
          </View>

          
          <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#111'}}>
            <View style={{left: 50, position: 'absolute', zIndex:200}}>
              <Text style={styles.ModalDropDownLabel}>Pickup:</Text>
            </View>
            <View>
            {renderIfElse(this.state.avtarSource == '_reverse', 
              <PickupDropDown />,  
              <DropOffDropDown/>
            )}
            </View>
          </View>



          <View>
            <View style={{left: 50, position: 'absolute', zIndex:200}}>
              <Text style={styles.ModalDropDownLabel}>Drop-Off:</Text>
            </View>
          {renderIfElse(this.state.avtarSource == '_click', 
            <PickupDropDown />,  
            <DropOffDropDown />
          )}
          </View>
        </View>
      );
    }
  }

  class PickupDropDown extends Component{
    render(){
      return(
        <View style={{flexDirection:'row',}} >
            <View >
                <ModalDropdown 
                  textStyle={styles.ModalDropDownText}
                  dropdownTextStyle={styles.ModalDropDownTextOption}
                  defaultValue="Select location.."
                  options={['option 1', 'option 2']} 
                />
            </View>
            <View style={{left: 300, position: 'absolute'}}>
              <Icon
                      name='location'
                      type='evilicon'
                      color='#f00'
                      underlayColor='#f00'
              />
            </View>
        </View>
      );
    }
  }

  class DropOffDropDown extends Component{
    render(){
      return(
        <View style={{flexDirection:'row',}}>
            <View>
                <ModalDropdown 
                  textStyle={styles.ModalDropDownText}
                  dropdownTextStyle={styles.ModalDropDownTextOption}
                  defaultValue="Select location.."
                  options={['option 1', 'option 2']} 
                />
            </View>
            <View  style={{left: 300, position: 'absolute'}}>
                <Icon
                    name='location'
                    type='evilicon'
                    color='#00f'
                    underlayColor='#00f'
                />
            </View>
        </View>
      );
    }
  }

  class JHLogoComponent extends React.Component {
    render() {
      return (
        <View>
          <Image source={require('../Assets/Images/jhlogo_1.png')} style={{ width: 128, height: 41.9, top: 5}}/>
        </View>
      )
    }
  }

  class HeaderCustomComponent extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'Time Table',
            modalVisible: false,
        };
      }
  
    setModalVisible(visible, selIcon) {
      this.setState({modalVisible: visible, selectedTab: selIcon});
    }

    render() {
      const { selectedTab } = this.state;
     // Vibration.vibrate();
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
              <View>
                  <Icon
                        name='clock'
                        type='evilicon'
                        color='#fff'
                        underlayColor='#f00'
                        onPress={() => this.setModalVisible(true, 'Time Table')} 
                      />
              </View>
              <View>
                  <Icon
                        name='question'
                        type='evilicon'
                        color='#fff'
                        underlayColor='#f00'
                        onPress={() => this.setModalVisible(true, 'Information')} 
                      />
              </View>
              {/*
              <View>
                  <Icon
                    name='bell'
                    type='evilicon'
                    color='#fff'
                    underlayColor='#f00'
                    onPress={() => alert('You will get intimated soon.') } 
                  />
              </View>
              */}
          </View>

          {/* Modal Window for Time Table and Information ~ Start */}
              <Modal
                  presentationStyle='overFullScreen'
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {alert("Modal has been closed.")}}
                 // onShow={() => {alert('Everything showed.')}}
              >
                <View style={styles.modalContainer}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{borderBottomWidth:1, borderBottomColor:'#00f'}}>
                        <TouchableHighlight onPress={() => {
                            this.setModalVisible(!this.state.modalVisible, !this.state.selectedTab)
                          }}>
                          <Text style={styles.modalCLoseIcon}>&#x2039;</Text>
                        </TouchableHighlight>
                      </View>
                      <View style={styles.modalHeader}>
                        <Text style={{fontSize: 21, fontWeight: 'normal', textAlign:'center'}}>{this.state.selectedTab}</Text>
                      </View>
                    </View>
                    <View style={{flex:1, backgroundColor:'#fff'}}>
                      {renderIf(this.state.selectedTab == 'Time Table', 
                            <TimeTable />
                       )}
                          
                      {renderIf(this.state.selectedTab == 'Information',
                            <Information />
                      )}
  
                    </View>
                </View>
            </Modal>
            {/* Modal Window for Time Table and Information ~ End */}

        </View>
      );
    }
  }
  
  class TimeTable extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          visible: true,
      };
      this.toggle = this.toggle.bind(this);
    }
  
    toggle() {
      this.setState({
          visible: !this.state.visible
      });
    }
  
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
                  {rowItem.time1} 
                </Text>
              </View>
              <View
                style={{ alignItems: 'center', margin: 5, padding: 5,
                  borderWidth: 0.5, borderColor: DictStyle.colorSet.lineColor }}
              >
                <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
                  {rowItem.time2} 
                </Text>
              </View>
          </View>
        </TouchableOpacity>
      );
    
      _renderSection = (section, sectionId)  => {
        return (
          <View
            style={{ flex:1, marginVertical: 5, marginHorizontal: 5, height: 30, flexDirection: 'row',
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
    

    render(){
      return (
        <ScrollView>
          {/* <HideableView visible={this.state.visible} style={{position:'absolute', top:0, zIndex:30, width: '100%'}}> */}
            <ExpandableList
              dataSource={MockData.workbenchData}
              headerKey="title"
              memberKey="member"
              renderRow={this._renderRow}
              renderSectionHeaderX={this._renderSection}
            />
         {/*  </HideableView> */}
        </ScrollView>
      );
    }
  }

  class Information extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    
    render() {
      const infoDB = [
        {key: "All schedules are subject to road, traffic and weather conditions and may be changed as use and needs warrant."}, 
        {key: "PM Commuter passengers who want to be dropped at Aquarium T Sta. may request the State St driver do so, but the N Station buses cannot stop there."},
        {key: "7:40 PM & 8:10 PM passengers should advise driver of their destination upon boarding the vehicle at 601."},
        {key: " During inclement weather, passengers may wait inside lobbies of 601 Congress or 380 Stuart St, but will need to watch for bus arrival outside & board before scheduled departure time. "},
        {key: "The 5:05 Shuttle from 601 Congress to the Back Bay will drop off at the corner of Berleley and Stuart Streets. Outside of Grill 23 "}, 
        {key: "For Wheelchair accessible transportation between Back Bay & 601 Congress, please contact Stephanie Nickerson at 617-663-4016 (x734016)"}
    ]
      return (
        <View style={styles.ShuttleDetailWrapper}>
                <FlatList 
                  data={infoDB}
                  renderItem={({item}) => <Text style={styles.ShuttleDetailHeaderText} >>> {item.key}</Text>}
                />
        </View>
      );
    }
  }

export default Home;
