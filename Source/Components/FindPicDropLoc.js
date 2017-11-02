import React,{Component} from "react";

import {
  StyleSheet,
  Text,
  Dimensions
  ,Picker
  ,View
  
} from "react-native";
//import {View,InputGroup,Input,ListItem} from "native-base";
import ModalDropdown from 'react-native-modal-dropdown';
import { Tabs, Tab, Icon , SocialIcon, Header, Avatar} from 'react-native-elements';
import renderIfElse from './renderIfElse';
import renderIf from './renderIf';
import Crashes from "mobile-center-crashes";
export const PicDropLoc=({picDropDetails,getDropPicLocation,avtarSource,reversePickDrop,pickDropData,RouteResult})=>
{
  
  var hh =[];
        let picDropItems = picDropDetails.map((item) => {
          hh.push(item.TITLE)
        //return <Picker.Item key={item.RouteId.toString()} label={item.TITLE} />
        }); 

  function getIndex(value) {
    for(var i = 0; i < hh.length; i++) {
        if(hh[i] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

if(RouteResult)
  {
    var defaultPicIndex =getIndex(RouteResult.START_POINT);
    var defaultPicValue =RouteResult.START_POINT;  

    var defaultDropIndex =getIndex(RouteResult.END_POINT);
    var defaultDropValue = RouteResult.END_POINT;
  }
  

  
  function togglePickDrop(val){  
        if(pickDropData.pickUp && pickDropData.dropOff)
        {
          
          let  dropOf = pickDropData.dropOff;
          var pickIdx=getIndex(pickDropData.dropOff)
          _dropdown_Pickup_select(pickIdx);
          var dropIdx=getIndex(pickDropData.pickUp)
          _dropdown_Drop_select(dropIdx);
          
          bindPicDrop("pickUp",pickIdx)
          bindPicDrop("dropOff",dropIdx)
          reversePickDrop(val)
        }
  }

  function _dropdown_Pickup_select(idx) {
    this._dropdown_Pickup && this._dropdown_Pickup.select(idx);
  }

  function _dropdown_Drop_select(idx) {
    this._dropdown_Drop && this._dropdown_Drop.select(idx);
  }

  function bindPicDrop(key, val){  
	 getDropPicLocation({
			key,
			value:val
		}); 	
  }
  
  return(
     <View style={styles.ModalDroDownContainer}>
        <View style={{flexDirection:'column'}}>
          <View style={{position:'absolute', left: 1, zIndex:190, backgroundColor:'#fff'}}>
              {(avtarSource == '_click')&&  
              <Avatar
                  width={44}
                  height={44}
                  source={require("../Assets/Images/arrows_click.jpg")}
                  avatarStyle={{height:44, width: 44}}
                  onPress={() => togglePickDrop('_reverse')}
                  
                  activeOpacity={1}
              />
              } 
            {(avtarSource == '_reverse') &&
              <Avatar
                  width={44}
                  height={44}
                  source={require("../Assets/Images/arrows_reverse.jpg")}
                  avatarStyle={{height:44, width: 44}}
                  onPress={() => togglePickDrop('_click')}
                  activeOpacity={1}
              />
            }
          </View>
           <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#111'}}>
            <View style={{left: 50, position: 'absolute', zIndex:200}}>
              <Text style={styles.ModalDropDownLabel}>Pickup:</Text>
            </View>
           
            {/* {renderIfElse(this.state.avtarSource == '_reverse',  */}
                    <View style={{flexDirection:'row',}} >
                        <View >
                            {/* <ModalDropdown 
                              textStyle={styles.ModalDropDownText}
                              dropdownTextStyle={styles.ModalDropDownTextOption}
                              defaultValue="Select location.."
                              options={['option 1', 'option 2']} 
                            /> */}
                            <ModalDropdown ref={el => this._dropdown_Pickup = el}  
                              dropdownTextStyle={styles.ModalDropDownTextOption} 
                              textStyle={styles.ModalDropDownText} 
                              options={hh} 
                              defaultIndex={defaultPicIndex}
                              defaultValue={defaultPicValue}
                              onSelect={bindPicDrop.bind(this, "pickUp")}
                              >
                            </ModalDropdown>  
                        </View>
                        <View style={{left: 300, position: 'absolute'}}>
                           {(avtarSource == '_click')&&
                           <Icon
                                  name='location'
                                  type='evilicon'
                                  color='#f00'
                                  underlayColor='#f00'
                          />  
                           }
                           {(avtarSource == '_reverse') &&
                             <Icon
                                name='location'
                                type='evilicon'
                                color='#00f'
                                underlayColor='#00f'
                            /> 
                            }
                        </View>
                    </View>
                     </View>
          
            <View>
            <View style={{left: 50, position: 'absolute', zIndex:200}}>
              <Text style={styles.ModalDropDownLabel}>Drop-Off:</Text>
            </View>
                     <View style={{flexDirection:'row',}}>
                        <View>

                            {/* <ModalDropdown 
                              textStyle={styles.ModalDropDownText}
                              dropdownTextStyle={styles.ModalDropDownTextOption}
                              defaultValue="Select location.."
                              options={['option 1', 'option 2']} 
                            /> */}
                            <ModalDropdown ref={eld => this._dropdown_Drop = eld}
                            textStyle={styles.ModalDropDownText} 
                            dropdownTextStyle={styles.ModalDropDownTextOption}  
                            options={hh} 
                            defaultIndex={defaultDropIndex}
                            defaultValue={defaultDropValue}
                            onSelect={bindPicDrop.bind(this, "dropOff")}             
                            />
                        </View>
                        <View  style={{left: 300, position: 'absolute'}}>
                             {(avtarSource == '_click') &&
                             <Icon
                                name='location'
                                type='evilicon'
                                color='#00f'
                                underlayColor='#00f'
                            /> 
                            }
                            {(avtarSource == '_reverse')&&
                           <Icon
                                  name='location'
                                  type='evilicon'
                                  color='#f00'
                                  underlayColor='#f00'
                          />  
                           }
                        </View>
                      </View>
                      </View>


                    
            {/* )} */}
           
          {/* <View>
            <View style={{left: 50, position: 'absolute', zIndex:200}}>
              <Text style={styles.ModalDropDownLabel}>Drop-Off:</Text>
            </View>
          {renderIfElse(this.state.avtarSource == '_click', 
            <PickupDropDown />,  
            <DropOffDropDown />
          )}
          </View>  */}
          {/* <View style={styles.PicDrop}> 
          <View style={styles.firstInput}>
           <ModalDropdown options={hh}                                             
               onSelect={bindPicDrop.bind(hh[this], "pickUp")}             
                >
          </ModalDropdown>          
          </View>
          <View style={styles.secondInput}>
          <ModalDropdown  options={hh}                               
               onSelect={bindPicDrop.bind(hh[this], "dropOff")}             
          >
      </ModalDropdown>
          </View>                        
      </View> */}
        </View>
        </View>
      );
        


   /* return (    
      <View style={styles.PicDrop}> 
          <View style={styles.firstInput}>
           <ModalDropdown options={hh}                                             
               onSelect={bindPicDrop.bind(hh[this], "pickUp")}             
                >
              </ModalDropdown>          
          </View>
          <View style={styles.secondInput}>
          <ModalDropdown  options={hh}                               
               onSelect={bindPicDrop.bind(hh[this], "dropOff")}             
          >
      </ModalDropdown>
          </View>                        
      </View>
    ); */
}

var width=Dimensions.get("window").width - 20;
const styles = StyleSheet.create({
  PicDrop: {
    top: -200,
    width: width,
    backgroundColor:'#5bc0de', 
    height: 90,
  }, 
  firstInput:{
      marginLeft:15,
      marginRight:10,
      marginTop:5,
      marginBottom:0,
      height:30,
      backgroundColor:"#fff",
      opacity:0.9,
      borderRadius:0
  },
    secondInput:{
      marginLeft:15,
      marginRight:10,
      marginTop:15,
      height:30,
      marginBottom:0,
      backgroundColor:"#fff",
      opacity:0.9,
      borderRadius:0
  },
  ModalDroDownContainer: {
    height: 70,
    width: width,
    //left:'4%',
    top: -170,
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
export default PicDropLoc;