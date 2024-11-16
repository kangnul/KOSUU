import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { storage } from '../config';
import { ref, getDownloadURL } from 'firebase/storage'; // Import ref and getDownloadURL

const Card = ({ showHeader, category, name, price, rating, description, stock, material, sizeChart, dimension, condition, notes, variant, size, color }) => {
  const navigation = useNavigation();
  
  const handleCardPressed = () => {
    navigation.navigate('CardDetail', { name, category, price, image: CardImage, rating, description, stock, material, sizeChart, dimension, condition, notes, variant, size, color });
  };
  
  const [isLiked, setIsLiked] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const toggleWishlist = () => {
    setIsLiked(!isLiked);
  };

  // Fetch the image URL from Firebase Storage
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'gs://teskosudulu.firebasestorage.app/photomode_07112024_193212.png'); // Replace with your file path in storage
        const url = await getDownloadURL(imageRef);
        setImageUrl(url);
      } catch (error) {
        console.error("Error fetching image from Firebase:", error);
      }
    };
    fetchImage();
  }, []);

  return (
    <View>
      {showHeader && <Text style={styles.textHeader}>Popular items</Text>}
      
      <TouchableOpacity style={styles.card} onPress={handleCardPressed}>
        <View style={styles.imageWrapper}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text>Loading...</Text>
          )}
          <TouchableOpacity style={styles.wishlistButton} onPress={toggleWishlist}>
            <Icon 
              name={isLiked ? "heart" : "heart-o"} 
              size={20} 
              color="#EC2A00" 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <Text style={styles.description}>{category}</Text>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>Rp. {price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFC',
    borderRadius: 10,
    width: 170,
    overflow: 'hidden',
    marginTop: 5,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  wishlistButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#FBFAF5',
    borderRadius: 50,
    padding: 8,
  },
  details: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'afacad_Bold',
    marginBottom: 5, 
  },
  price: {
    fontSize: 16,
    fontFamily: 'afacad_Bold',  
    marginBottom: 5, 
    color: '#1A47BC',
  },
  description: {
    fontSize: 12,
    fontFamily: 'afacad_Bold',
    color: '#8E8E8D',
  },
  textHeader: {
    color: '#1A47BC',
    fontSize: 16,
    fontFamily: 'afacad_Bold',
    marginTop: 10,
    marginBottom: 10,
  }
});