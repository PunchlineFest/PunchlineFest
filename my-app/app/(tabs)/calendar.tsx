import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, Image, ScrollView} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Collapsible} from "@/components/Collapsible";
import {formatDate} from "@/utils/formatted";
import StatusBadge from "@/components/StatusBadge";
import FilterPills from "@/components/FilterPills";
import {PageHeader} from "@/components/PageHeader";
import axios from "axios";

const filterLabels = ["Concerts", "Ateliers", "Conférences", "Stands", "Restaurants"]

const image = require('../../assets/images/nfs-project-background.png');

export default function CalendarScreen() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null);

  const handlePressFilter = (filter: string) => {
    setSelectedFilter(filter);
    console.log(`Filter selected: ${filter}`);
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://192.168.224.56:8000/api/events/grouped-by-date');
      setEvents(response.data);
    } catch (error) {
      console.error('Une erreur est survenue', error);
    }
  };
  React.useEffect(() => {
    fetchEvents();
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* HEADER RECHERCHE */}
        <PageHeader/>
        {/* FILTRE */}
        <FilterPills filters={filterLabels} onPressFilter={handlePressFilter}/>
        <ScrollView>
          {/* Collapsibles */}
          {
            Object.entries(events).map(([key, values]) => (
              <View key={key} style={styles.collapsibles}>
                <Collapsible title={formatDate(key)}>
                  {
                    values.map((element: any, index: number) => (
                      <View key={index} style={styles.collapsibleContent}>
                        <View>
                          <Text style={styles.collapsibleTitle}>{element.name}</Text>
                          <Text style={styles.collapsibleTag}>{element.name}</Text>
                          <StatusBadge date={key} />
                        </View>
                        <Image source={require('../../assets/images/avatar.png')}/>
                      </View>
                    ))
                  }
                </Collapsible>
              </View>
            ))
          }
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20
  },
  collapsibles: {
    marginBottom: 14,
  },
  collapsibleContent: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    marginBottom: 44
  },
  collapsibleTitle: {
    fontSize: 20
  },
  collapsibleTag: {
    fontSize: 12,
    marginVertical: 10
  }
});
