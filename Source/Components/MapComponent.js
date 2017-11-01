import React,{Component} from "react";
import PicDrop from "./FindPicDropLoc";
import ShowRoute from "./ShowRouteDetails";
import RoureDetailsfroRtId from "./RoureDetailsfroRtId";
import Crashes from "mobile-center-crashes";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
//import {view} from "native-base";
import MapView from "react-native-maps";
import RtData from "../API/RouteData";
export const MapComponent=({region,pickDropDeatils,getDropPicLocation,pickDropData,toggleShowRouteTime,ShowHide,getRouteResult,RouteResult,toggleShowRouteDeatils,showHideRt,getPickDropTimeDetails,PickDropTime,avtarSource,reversePickDrop})=>
{
      /* if(pickDropData.pickUp && pickDropData.dropOff)
       {
          getRouteResult(pickDropData.pickUp,pickDropData.dropOff);
          var xxx = this.props.RouteResult;
       }  */ 
    var pickUpDetails 
    if(pickDropData.pickUp)
      {  
          pickUpDetails = RtData.LocationDetails.filter(function(rt)
          {
              return (rt.TITLE===pickDropData.pickUp)
          }
        );
      }
    var dropUpDetails 
    if(pickDropData.dropOff)
      {       
          dropUpDetails = RtData.LocationDetails.filter(function(rt)
          {
              return (rt.TITLE===pickDropData.dropOff)
          }
        );
      }
    var val = pickDropData;
     return (
       <View style={styles.container}> 

         <MapView style={styles.map}
          provider = {MapView.POOVIDER_GOOGLE}
          initialRegion={region}
          location = 'Boston'
           
          onMapReady = {console.log('Map Loaded')}
        >
        <MapView.Marker coordinate={region} pinColor="red" />
        { pickDropData.pickUp &&
					<MapView.Marker
						coordinate={{latitude:pickUpDetails[0].LAT, longitude:pickUpDetails[0].LONG}}
						pinColor="green"
					/>	
				}
				{ pickDropData.dropOff &&
					<MapView.Marker
						coordinate={{latitude:dropUpDetails[0].LAT, longitude:dropUpDetails[0].LONG}}
						pinColor="blue"
					/>	
				}
        </MapView>            
         {/* <MapView provider ={MapView.PROVIDER_GOOGLE}
         style={styles.map}
         region = {region}>
        <MapView.Marker coordinate={region} pinColor="red" />
        { pickDropData.pickUp &&
					<MapView.Marker
						coordinate={{latitude:pickUpDetails[0].LAT, longitude:pickUpDetails[0].LONG}}
						pinColor="green"
					/>	
				}
				{ pickDropData.dropOff &&
					<MapView.Marker
						coordinate={{latitude:dropUpDetails[0].LAT, longitude:dropUpDetails[0].LONG}}
						pinColor="blue"
					/>	
				}
        </MapView>   */}
        <View>
            <PicDrop picDropDetails={pickDropDeatils} 
            getDropPicLocation={getDropPicLocation} 
            avtarSource = {avtarSource}
            reversePickDrop= {reversePickDrop}
            pickDropData = {pickDropData}
            RouteResult={RouteResult} 
            />
        </View>
            <View>
            {RouteResult.ROUTE_TITLE &&
            <ShowRoute pickDropData={pickDropData} 
            toggleShowRouteTime={toggleShowRouteTime} 
            ShowHide={ShowHide} 
            RouteResult={RouteResult} 
            toggleShowRouteDeatils={toggleShowRouteDeatils}
            showHideRt ={showHideRt}
            getPickDropTimeDetails={getPickDropTimeDetails}
            PickDropTime={PickDropTime}
            
            />} 
            </View>             
            {/* <RoureDetailsfroRtId RouteResult={RouteResult}/>} */}
      </View>
     );
}



const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  map: { 
    ...StyleSheet.absoluteFillObject
  },
  
});
export default MapComponent;