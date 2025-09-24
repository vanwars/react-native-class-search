import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define a type for our data items
type Course = {
  code: string;
  title: string;
  hours: number;
  instructor: string;
  days: string;
  department: string;
  crn: string;
};

export default function HomeScreen() {
  // State to store our fetched data
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Replace this with your actual API endpoint
      const response = await fetch('https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/2025/fall/');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      console.log(data)
      // Transform the data to match our DataItem type
      const csciData = data.filter((item: any) => item.Department === 'CSCI')
      const formattedData: Course[] = csciData.map((item: any) => ({
        code: item.Code,
        title: item.Title,
        hours: item.Hours,
        instructor: item.Instructors && item.Instructors.length > 0 ? item.Instructors[0].Name : 'TBD',
        days: item.Days ? item.Days : 'TBD',
        department: item.Department ? item.Department : '',
        crn: item.CRN
      }));
      
      setCourses(formattedData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/poplars.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">UNCA Computer Science Courses - HI AJ!</ThemedText>
      </ThemedView>
      
      {/* Display loading state */}
      {isLoading && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Loading data...</ThemedText>
        </ThemedView>
      )}
      
      {/* Display error if any */}
      {error && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Error: {error}</ThemedText>
        </ThemedView>
      )}
      
      {/* Display fetched data */}
      {courses.map((course, index) => (
        <TouchableOpacity 
          key={course.code} 
          onPress={() => {
            // Navigate to the course details screen with the course data
            router.push({
              pathname: '/course-details',
              params: {...course},
            });
          }}
          activeOpacity={0.7}
        >
          <ThemedView 
            style={[
              styles.courseContainer,
              index < courses.length - 1 ? styles.courseBorder : null
            ]}
          >
            <ThemedView style={styles.courseHeader}>
              <ThemedText type="subtitle" style={styles.courseCode}>
                {course.code}. {course.title}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.courseDetails}>
            <ThemedText style={styles.creditHours}>CRN: {course.crn}</ThemedText>
            <ThemedText style={styles.creditHours}>Credit Hours: {course.hours}</ThemedText>
              <ThemedText style={styles.creditHours}>Instructor: {course.instructor}</ThemedText>
              <ThemedText style={styles.creditHours}>Days: {course.days}</ThemedText>
              <ThemedText style={styles.creditHours}>Department: {course.department}</ThemedText>
            </ThemedView>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    width: '100%',   // Make sure the container is full width
    height: 300,     // Set a fixed height for the container
  },
  image: {
    width: '100%',   // Make the image take up the full width of the container
    height: '100%',  // Make the image take up the full height of the container
  },
  courseContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  courseBorder: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseCode: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  courseTitle: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  courseDetails: {
    marginTop: 4,
  },
  creditHours: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 16,
  },
});
