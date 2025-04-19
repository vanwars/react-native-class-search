import { StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CourseDetailsScreen() {
  const [description, setDescription] = useState<String>("");

  // Get the course data from the navigation params
  const params = useLocalSearchParams();
  
  // Parse the course data from the params
  const course = {...params};

  const fetchDescription = async () => {
    const year = '2025'
    const season = 'fall'
    const response = await fetch(`https://meteor.unca.edu/registrar/class-schedules/api/v1/courses/description/${year}/${season}/${course.crn}`);
    const data = await response.text();
    console.log(data);
    // trim the quotation marks
    const text = data.substring(1, data.length-1);
    setDescription(text)
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchDescription();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.courseCode}>{course.code}: {course.title}</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.detailsContainer}>
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Credit Hours:</ThemedText>
          <ThemedText style={styles.detailValue}>{course.hours}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Instructor:</ThemedText>
          <ThemedText style={styles.detailValue}>{course.instructor}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Days:</ThemedText>
          <ThemedText style={styles.detailValue}>{course.days}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.detailRow}>
          <ThemedText type="defaultSemiBold">Department:</ThemedText>
          <ThemedText style={styles.detailValue}>{course.department}</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText>{description}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  courseCode: {
    marginBottom: 8,
  },
  courseTitle: {
    marginBottom: 16,
  },
  detailsContainer: {
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
    marginLeft: 16,
  },
}); 