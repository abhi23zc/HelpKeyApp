import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const HotelReviewsScreen = () => {
  // Reviews data with online placeholder images
  const reviews = [
    {
      id: 1,
      name: "Abraham Adam",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      timeAgo: "2 days ago",
      comment:
        "First of all, the location of this hotel is between the beach and fun street where full of shops, restaurants/bars, spas, and more.",
      images: [],
    },
    {
      id: 1,
      name: "Abraham Adam",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      timeAgo: "2 days ago",
      comment:
        "First of all, the location of this hotel is between the beach and fun street where full of shops, restaurants/bars, spas, and more.",
      images: [],
    },
    {
      id: 2,
      name: "Jessica Wong",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      timeAgo: "5 days ago",
      comment:
        "Beautiful hotel which had everything you could need. Rooms were spotless and well appointed.",
      images: [
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2349&q=80",
      ],
    },
    {
      id: 3,
      name: "Joe Alexander",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      rating: 4,
      timeAgo: "1 week ago",
      comment: "",
      images: [],
    },
  ];

  // Get rating bar width based on rating percentage
  const getRatingBarWidth = (rating: number) => {
    const ratingPercentages = [95, 80, 35, 15, 5]; // 5 to 1 star percentages
    return ratingPercentages[rating - 1];
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color="#FFCC00"
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{
          router.back()
        }}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Properties</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Reviews header */}
        <View style={styles.reviewsHeaderContainer}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Rating summary */}
        <View style={styles.ratingSummary}>
          <View style={styles.ratingAverage}>
            <Ionicons name="star" size={24} color="#FFCC00" />
            <Text style={styles.ratingNumber}>4.8</Text>
          </View>

          <View style={styles.ratingBarsContainer}>
            {[5, 4, 3, 2, 1].map((rating, index) => (
              <View key={rating} style={styles.ratingBarRow}>
                <Text style={styles.ratingBarLabel}>{rating}</Text>
                <View style={styles.ratingBarBackground}>
                  <View
                    style={[
                      styles.ratingBarFill,
                      { width: `${getRatingBarWidth(5 - index)}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.totalReviews}>374 Reviews</Text>

        {/* Reviews list */}
        {reviews.map((review, index) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <View style={styles.reviewHeaderContent}>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <View style={styles.reviewStars}>
                  {renderStars(review.rating)}
                  <Text style={styles.reviewTime}>{review.timeAgo}</Text>
                </View>
              </View>
            </View>

            {review.comment ? (
              <Text style={styles.reviewText}>{review.comment}</Text>
            ) : null}

            {review.images.length > 0 && (
              <View style={styles.reviewImages}>
                {review.images.map((image, imgIndex) => (
                  <Image
                    key={imgIndex}
                    source={{ uri: image }}
                    style={styles.reviewImage}
                  />
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Price and Book section */}
      </ScrollView>
      <View style={styles.pricingContainer}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Price</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceAmount}>$56</Text>
            <Text style={styles.priceUnit}>/ night</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  shareButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  reviewsHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAllText: {
    color: "#009FBD",
    fontWeight: "500",
  },
  ratingSummary: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  ratingAverage: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  ratingNumber: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ratingBarsContainer: {
    flex: 1,
  },
  ratingBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  ratingBarLabel: {
    width: 15,
    marginRight: 8,
    textAlign: "center",
  },
  ratingBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: "#FFCC00",
    borderRadius: 3,
  },
  totalReviews: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    color: "#777777",
    fontSize: 14,
  },
  reviewCard: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewHeaderContent: {
    flex: 1,
  },
  reviewerName: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginRight: 2,
  },
  reviewTime: {
    color: "#777777",
    fontSize: 12,
    marginLeft: 8,
  },
  reviewText: {
    lineHeight: 20,
    marginBottom: 12,
    color: "#333333",
  },
  reviewImages: {
    flexDirection: "row",
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginTop: 8,
  },
  pricingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    padding: 16,
  
  
  },
  priceSection: {
    flex: 1,
  },
  priceLabel: {
    color: "#777777",
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: "bold",
  },
  priceUnit: {
    color: "#777777",
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: "#009FBD",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default HotelReviewsScreen;
