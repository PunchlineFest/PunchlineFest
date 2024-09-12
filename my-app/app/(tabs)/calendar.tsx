import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, Image, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import {Collapsible} from "@/components/Collapsible";
import {formatDate} from "@/utils/formatted";
import StatusBadge from "@/components/StatusBadge";
import FilterPills from "@/components/FilterPills";
import {PageHeader} from "@/components/PageHeader";
import axios from "axios";
import {API_BASE} from "@/config/env";
import {useFonts} from "expo-font";
import {router} from "expo-router";

const filterLabels = ["Concert", "Atelier", "Conférence", "Stand", "Restaurant"]

const image = require('../../assets/images/nfs-project-background.png');

export default function CalendarScreen() {
  const [events, setEvents] = React.useState<any[]>([]);
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [submittedSearchTerm, setSubmittedSearchTerm] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const handlePressFilter = (filter: string) => {
    // Si le filtre est déjà dans selectedFilters, on le retire (désélection)
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      // Sinon, on l'ajoute (sélection)
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleSearchSubmit = () => {
    setSubmittedSearchTerm(searchTerm); // Met à jour le terme de recherche soumis
  };

  const fetchEvents = async (filters: string[], search: string) => {
    const queryParams = [
      ...filters.map(filter => `types[]=${filter.toLowerCase()}`),
      search ? `search=${search.toLowerCase()}` : '',
    ].filter(Boolean).join('&');

    try {
      console.log(`${API_BASE}/events/grouped-by-date?${queryParams}`)
      const response = await axios.get(`${API_BASE}/events/grouped-by-date?${queryParams}`);
      if (response.data) {
        setEvents(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Une erreur est survenue', error);
    }
  };

  React.useEffect(() => {
    fetchEvents(selectedFilters, submittedSearchTerm);
  }, [selectedFilters, submittedSearchTerm])

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* HEADER RECHERCHE */}
        <PageHeader
          value={searchTerm}
          onChangeText={setSearchTerm}
          handleSearchSubmit={handleSearchSubmit}
        />
        {/* FILTRE */}
        <FilterPills filters={filterLabels} onPressFilter={handlePressFilter} selectedFilters={selectedFilters}/>
        <ScrollView>
          {/* Collapsibles */}
          { !isLoading ?
              Object.entries(events).map(([key, values]) => (
                <View key={key} style={styles.collapsibles}>
                  <Collapsible title={formatDate(key)}>
                    {
                      values.map((element: any, index: number) => (
                        <View key={index} style={styles.collapsibleContent}>
                          <View>
                            <TouchableOpacity
                              key={element.id}
                              style={{flexDirection: "row", alignItems:"center"}}
                              onPress={() => router.push(`/calendar/${element.id}`)} // Redirige vers la page de détail de l'activité
                              
                            >
                              <Text style={styles.collapsibleTitle}>{element.name}</Text>
                              <Ionicons name="search" size={16} style={{marginLeft:5}} />
                            </TouchableOpacity>
                            <Text style={styles.collapsibleTag}>{element.type}</Text>
                            <StatusBadge date={key} />
                          </View>
                          <Image source={require('../../assets/images/avatar.png')}/>
                        </View>
                      ))
                    }
                  </Collapsible>
                </View>
              )) : <ActivityIndicator size="large" color="#0000ff" />
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
    fontSize: 20,
    fontFamily: 'BebasNeue'
  },
  collapsibleTag: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginVertical: 10
  },
  activityName: {

  }
});
