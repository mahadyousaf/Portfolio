import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [foodItems, setFoodItems] = React.useState([
    { id: '1', name: 'Pizza', image: 'https://images5.alphacoders.com/381/381504.jpg', price: '$10' },
    { id: '2', name: 'Burger', image: 'https://tse4.mm.bing.net/th?id=OIP.N70bjR8c9KMV25Ypd9T_CQHaE8&pid=Api&P=0&h=220', price: '$8' },
    { id: '3', name: 'Pasta', image: 'https://tse2.mm.bing.net/th?id=OIP.jgVvC5M8r9zUdR-TGk6wwAHaLH&pid=Api&P=0&h=220', price: '$12' },
    { id: '4', name: 'Sushi', image: 'https://tse4.mm.bing.net/th?id=OIP.kUtTzpGTMZQxCEyv2brQ4wHaEK&pid=Api&P=0&h=220', price: '$15' },
  ]);

  const renderFoodItem = ({ item }) => (
    <View style={styles.foodItem}>
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for food..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={foodItems}
        renderItem={renderFoodItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.foodList}
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
  foodList: {
    paddingBottom: 20,
  },
  foodItem: {
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
  foodImage: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  foodDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodPrice: {
    fontSize: 16,
    color: '#888',
  },
  orderButton: {
    marginTop: 10,
    backgroundColor: '#6200ea',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;