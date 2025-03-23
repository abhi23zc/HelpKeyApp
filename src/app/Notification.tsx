import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  StatusBar,
  Linking
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const NotificationsScreen = () => {
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  // Notification data
  const notifications = [
    {
      id: 1,
      section: 'Today',
      items: [
        {
          id: 101,
          type: 'booking',
          title: 'Booking Sucessful',
          message: 'You\'ve been booking in The Dreamland by Young Villas from 16 - 20 Sep 2024.',
          time: '12:19',
          iconName: 'calendar',
          iconColor: '#33C4C9'
        },
        {
          id: 102,
          type: 'discount',
          title: 'Discount 10% Off Today',
          message: 'Just today, discount 10% off for all booking. Grab it fast!',
          time: '10:25',
          iconName: 'gift',
          iconColor: '#2D7FF9'
        },
        {
          id: 103,
          type: 'payment',
          title: 'Payment Code Expired',
          message: 'Your payment code has been expired. Please payment again! Click here',
          time: '08:34',
          iconName: 'alert-circle',
          iconColor: '#F77',
          actionText: 'Click here',
          actionLink: '#payment'
        }
      ]
    },
    {
      id: 2,
      section: 'Yesterday',
      items: [
        {
          id: 201,
          type: 'review',
          title: 'Give Your Review',
          message: 'Let\'s help other users by leaving your review for Adiwana Suites. Review here',
          time: '19:34',
          iconName: 'star',
          iconColor: '#FFCC00',
          actionText: 'Review here',
          actionLink: '#review'
        },
        {
          id: 202,
          type: 'booking',
          title: 'Booking Sucessful',
          message: 'You\'ve been booking in Hyatt Regency Bali from 01 - 03 Sep 2024.',
          time: '23:08',
          iconName: 'calendar',
          iconColor: '#33C4C9'
        }
      ]
    },
    {
      id: 3,
      section: '14 September 2024',
      items: [
        {
          id: 301,
          type: 'discount',
          title: 'Discount 10% Off Today',
          message: 'Just today, discount 10% off for all booking. Grab it fast!',
          time: '10:25',
          iconName: 'gift',
          iconColor: '#2D7FF9'
        }
      ]
    }
  ];
  
  // Handle action link press
  const handleActionPress = (link: string) => {
    Linking.openURL(link);
  };

  // Start animations when component mounts
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Render icon based on notification type
  const renderIcon = (iconName: string, color: string) => {
    return (
      <View style={[styles.iconContainer, { backgroundColor: `${color}15` }]}>
        <Feather name={iconName} size={20} color={color} />
      </View>
    );
  };
  
  // Format message with clickable action text
  const formatMessage = (message: string, actionText: string, actionLink: string) => {
    if (!actionText) return <Text style={styles.notificationMessage}>{message}</Text>;
    
    const parts = message.split(actionText);
    return (
      <Text style={styles.notificationMessage}>
        {parts[0]}
        <Text 
          style={styles.actionText}
          onPress={() => handleActionPress(actionLink)}
        >
          {actionText}
        </Text>
        {parts.length > 1 ? parts[1] : ''}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
  
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {notifications.map((section, sectionIndex) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            
            {section.items.map((notification, itemIndex) => (
              <Animated.View 
                key={notification.id}
                style={[
                  styles.notificationCard,
                  {
                    opacity: fadeAnim,
                    transform: [{ 
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 20 + (sectionIndex * 10) + (itemIndex * 5)]
                      }) 
                    }]
                  }
                ]}
              >
                {renderIcon(notification.iconName, notification.iconColor)}
                
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle}>{notification.title}</Text>
                    <Text style={styles.notificationTime}>{notification.time}</Text>
                  </View>
                  
                  {formatMessage(
                    notification.message, 
                    notification.actionText, 
                    notification.actionLink
                  )}
                </View>
              </Animated.View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  moreButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 14,
    paddingHorizontal: 16,
  },
  notificationCard: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  notificationTime: {
    fontSize: 12,
    color: '#888888',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  actionText: {
    color: '#009FBD',
    fontWeight: '500',
  }
});

export default NotificationsScreen;