import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text } from 'react-native';

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
    flex:1,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default () => (
   <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 43.260639,
         longitude: 5.381889,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     <Marker coordinate={{latitude: 43.258028, longitude: 5.381417}} title={'Scène principale'} />
     <Marker coordinate={{latitude: 43.259528, longitude: 5.380278}} title={'Atelier graffiti'} />
     <Marker coordinate={{latitude: 43.261111, longitude: 5.381999}} title={'Buvette du lac'} />
     </MapView>
   </View>
);