import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';

export default function Carousel() {
    const images = [
        "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
        "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
    ];

  return (
    <View style={styles.container}>
      <Swiper
        autoplay={true}
        loop={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {images.map((image, index) => (
          <View style={styles.slide} key={index}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '94%',
    height: 200,
    borderRadius: 6,
  },
  dot: {
    backgroundColor: '#90A4AE',
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#13274F',
    width: 8,
    height: 8,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});