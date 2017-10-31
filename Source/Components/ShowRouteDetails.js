import React,{Component} from "react";

import {
  StyleSheet,
  Text,
  Dimensions
  ,Button,
  TouchableOpacity,
  TouchableHighlight,
  View, 
  //List,
  ListView,
  AsyncStorage,
} from "react-native";

//import { View, List, } from "native-base";
import DictStyle from './DicStyle';
//import Icon from "react-native-vector-icons/Evillcons";
export const ShowRoute=({pickDropData,toggleShowRouteTime,ShowHide,RouteResult,toggleShowRouteDeatils,showHideRt,getPickDropTimeDetails,PickDropTime})=>
{
  function ShowRoute() {
   var val =   "show"; 
   toggleShowRouteTime({
			val
		});
 }

 function HideRoute() {
   var val =   "Hide"; 
   toggleShowRouteTime({
			val
    });
    var valRT =   "NotView";
   toggleShowRouteDeatils({
			valRT
		});
 }

 
  function ShowRouteDetails(rt) {
   var valRT =   "view"; 
   toggleShowRouteDeatils({
			valRT
    });
    getPickDropTimeDetails(rt); 
 }

 function HideRouteDetails() {
   var valRT =   "NotView"; 
   toggleShowRouteDeatils({
			valRT
		});
 }


 function SetFavouriteRoute() {
   
   AsyncStorage.setItem("myKey", JSON.stringify(RouteResult));
       
        
 }
  

 const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(RouteResult.ROUTE_SERVICE),
    };
  /* var hh =[];
        let picDropItems = picDropDetails.map((item) => {
          hh.push(item.TITLE)
            //return <Picker.Item key={item.RouteId.toString()} label={item.TITLE} />
        }); */
                
   return (
         <View> 
      <View style={styles.RtDetails}> 
            {/* <Button
            onPress={()=>ShowRoute()}
            title={              
              RouteResult.ROUTE_TITLE
              }            
            accessibilityLabel="Learn more about this purple button"
         />  */}
         <TouchableHighlight onPress={()=>SetFavouriteRoute()} >
          <Text>Set Favourite</Text>
        </TouchableHighlight>
          <TouchableHighlight onPress={()=>ShowRoute()} onLongPress={()=>HideRoute()}>
          <Text>{              
                RouteResult.ROUTE_TITLE
              }    
          </Text>
        </TouchableHighlight>                          
      </View>    
     {         
    (ShowHide.val=="show") &&
      <View style={styles.RtTime}>            
          <View style={styles.searchResultsWrapper} >
				{/* <List 
					dataArray={RouteResult.ROUTE_SERVICE} */}
          <ListView
        dataSource={this.state.dataSource}
					renderRow={(item)=>
						<TouchableOpacity key={item} >
        <View
          style={{ marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'row',
            justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
            borderBottomColor: DictStyle.colorSet.lineColor }}
        >
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
           borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text onPress={()=>ShowRouteDetails(item.time1)} style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
            {item.time1.Pick}
          </Text>
        </View>
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
             borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text onPress={()=>ShowRouteDetails(item.time2)} style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor }}>
            {item.time2.Pick}
          </Text>
        </View>
        </View>
      </TouchableOpacity>
					}      
				/>
			</View>
      </View> }


    {         
    (showHideRt.valRT=="view") &&
      <View style={styles.RtTime}>            
          <View style={styles.searchResultsWrapper} >
			
			<TouchableOpacity>
        <View
          style={{ marginVertical: 10, marginHorizontal: 15, height: 30, flexDirection: 'column',
            justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 0.5,
            borderBottomColor: DictStyle.colorSet.lineColor }}
        >
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
           borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text  style={{ fontSize: DictStyle.fontSet.bSize, color: DictStyle.colorSet.normalFontColor,fontWeight:'bold' }}>
            { RouteResult.ROUTE_TITLE }
          </Text>
        </View>
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
             borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor,fontWeight:'bold' }}>
            Pick Up Time: { PickDropTime.Pick }
          </Text>
        </View>
        <View
          style={{ alignItems: 'center', margin: 5, padding: 5,
             borderColor: DictStyle.colorSet.lineColor }}
        >
          <Text style={{ fontSize: DictStyle.fontSet.mSize, color: DictStyle.colorSet.normalFontColor,fontWeight:'bold' }}>
            Estimated Drop Time: { PickDropTime.Drop }
          </Text>
        </View>
        </View>
      </TouchableOpacity>
					
			</View>
      </View> }


      </View> 
    );
}


var width = Dimensions.get("window").width; //full width
const styles = {
  RtDetails:{
        width:width-25,
        marginLeft:15,
        marginRight:10,
        backgroundColor:"#fff",
        top: 150 ,
        height:25,
        opacity:0.9,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:7
  },

    searchResultsWrapper:{
        //top: -200,
        //top:160,
        marginLeft:15,
        marginRight:10,
        position:"absolute",
        width:width-25,
        height:250,
        top: -50 ,
        backgroundColor:"#fff",
        opacity:0.9,
        borderRadius:7
    },
    primaryText:{
        fontWeight: "bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle: "italic",
        color:"#7D7D7D",
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    leftIcon:{
        fontSize:20,
        color:"#7D7D7D",
    },
    distance:{
        fontSize:12,
    }
};


export default ShowRoute;