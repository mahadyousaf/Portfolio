import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const API_KEY = '9bd988ba2fed64caa59ffb82d550fdd5'; // Replace with a valid API Key
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_companies=2`;

export default function App(): JSX.Element {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeats, setShowSeats] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      if (!API_KEY) {
        throw new Error('API Key is missing.');
      }
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error('No movies found.');
      }
      setMovies(data.results);
      await AsyncStorage.setItem('movies', JSON.stringify(data.results));
    } catch (error) {
      console.error('Error fetching movies:', error);
      Alert.alert('Error', 'Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`);
      const data = await response.json();
      if (data.results.length > 0) {
        const trailer = data.results.find((vid) => vid.type === 'Trailer');
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } else {
        Alert.alert('No trailer found');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seatNumber)
        ? prevSeats.filter((seat) => seat !== seatNumber)
        : [...prevSeats, seatNumber]
    );
  };

  const handleMoviePress = (movieId) => {
    setCurrentMovieId(movieId);
    setShowSeats(true);
  };

  const confirmSeats = () => {
    setShowSeats(false);
    if (currentMovieId) {
      fetchTrailer(currentMovieId);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🎬 Movie Booking</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => handleMoviePress(item.id)}>
              {item.poster_path ? (
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                  style={styles.image}
                />
              ) : (
                <View style={styles.noImageContainer}>
                  <Text style={styles.noImageText}>No Image</Text>
                </View>
              )}
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 5,
  },
});
