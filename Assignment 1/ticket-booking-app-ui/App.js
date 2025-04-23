import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [events, setEvents] = React.useState([
    { id: '1', name: 'Concert', image: 'https://tse3.mm.bing.net/th?id=OIP.JzDiT3o5XTjjZFa_7_9A3QHaEb&pid=Api&P=0&h=220', date: '2023-10-15', price: '$50' },
    { id: '2', name: 'Movie', image: 'https://tse2.mm.bing.net/th?id=OIP.2_wH2qmbdU02QwQufqklsAHaNK&pid=Api&P=0&h=220', date: '2023-10-20', price: '$15' },
    { id: '3', name: 'Theater', image: 'https://tse2.mm.bing.net/th?id=OIP.O364WR0Oq1fb1ybxom_mhgHaE8&pid=Api&P=0&h=220', date: '2023-10-25', price: '$30' },
    { id: '4', name: 'Sports Event', image: 'https://tse4.mm.bing.net/th?id=OIP.c7iyN8HozoUmgHnYCyqwrgHaE8&pid=Api&P=0&h=220', date: '2023-10-30', price: '$40' },
  ]);

  const renderEventItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventDetails}>
        <Text style={styles.eventName}>{item.name}</Text>
        <Text style={styles.eventDate}>{item.date}</Text>
        <Text style={styles.eventPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={events}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.eventList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  eventList: {
    paddingBottom: 20,
  },
  eventItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  eventDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  eventPrice: {
    fontSize: 16,
    color: '#333',
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#6200ea',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;