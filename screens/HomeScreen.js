import  { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
// import CalendarScreen from './calendarScreen';
import DropTitle from '../components/DropTitle';

export default function HomeScreen({navigation}) {
  // const navigation = useNavigation();
  // Year dropdown
  const [openYear, setOpenYear] = useState(false);
  const [valueYear, setValueYear] = useState(null);
  const [itemsYear, setItemsYear] = useState([
    { label: '2026', value: 2026 },
    { label: '2027', value: 2027 },
    { label: '2028', value: 2028 },
    { label: '2029', value: 2029 },
  ]);

  // Term dropdown
  const [openTerm, setOpenTerm] = useState(false);
  const [valueTerm, setValueTerm] = useState(null);
  const [itemsTerm, setItemsTerm] = useState([
    { label: 'Fall', value: 'Fall' },
    { label: 'Spring', value: 'Spring' },
    { label: 'Summer', value: 'Summer' },
  ]);

  // Major dropdown
  const [openMajor, setOpenMajor] = useState(false);
  const [valueMajor, setValueMajor] = useState('Major');
  const [itemsMajor, setItemsMajor] = useState([
    { label: 'Computer Science', value: 'Computer Science' },
  ]);

  // Concentration dropdown
  const [openConcentration, setOpenConcentration] = useState(false);
  const [valueConcentration, setValueConcentration] = useState('Concentration');
  const [itemsConcentration, setItemsConcentration] = useState([
    { label: 'Hardware', value: 'Hardware' },
    { label: 'Cybersecurity', value: 'Cybersecurity' },
    { label: 'Software Development', value: 'Software Engineering' },
    { label: 'Web & Application Design', value: 'Design' },
    { label: 'Artificial Intelligence & Data Science', value: 'AI' },
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      <Text style={styles.title}>Make a Schedule</Text>
      <Text style={styles.subtitle}>
        Use the drop down menu to select which best works for you to generate.
      </Text>

{/* Year dropdown */}
<View style={[styles.dropdownWrapper, { zIndex: 10000 }]}>
  <DropTitle>Year</DropTitle>
  <DropDownPicker
    open={openYear}
    value={valueYear}
    items={itemsYear}
    setOpen={setOpenYear}
    setValue={setValueYear}
    setItems={setItemsYear}
    placeholder="Select year"
    listMode="SCROLLVIEW"
    onOpen={() => {
      setOpenTerm(false);
      setOpenMajor(false);
      setOpenConcentration(false);
    }}
    style={styles.dropdown}
    dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 10000 }]}
  />
</View>

{/* Term dropdown */}
<View style={[styles.dropdownWrapper, { zIndex: 9000 }]}>
  <DropTitle>Term</DropTitle>
  <DropDownPicker
    open={openTerm}
    value={valueTerm}
    items={itemsTerm}
    setOpen={setOpenTerm}
    setValue={setValueTerm}
    setItems={setItemsTerm}
    placeholder="Select term"
    listMode="SCROLLVIEW"
    onOpen={() => {
      setOpenYear(false);
      setOpenMajor(false);
      setOpenConcentration(false);
    }}
    style={styles.dropdown}
    dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 9000 }]}
  />
</View>

{/* Major dropdown */}
<View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
  <DropTitle>Major</DropTitle>
  <DropDownPicker
    open={openMajor}
    value={valueMajor}
    items={itemsMajor}
    setOpen={setOpenMajor}
    setValue={setValueMajor}
    setItems={setItemsMajor}
    placeholder="Select major"
    listMode="SCROLLVIEW"
    style={styles.dropdown}
    dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 2000 }]}
  />
</View>

{/* Concentration dropdown */}
<View style={[styles.dropdownWrapper, { zIndex: 1000 }]}>
  <DropTitle>Concentration</DropTitle>
  <DropDownPicker
    open={openConcentration}
    value={valueConcentration}
    items={itemsConcentration}
    setOpen={setOpenConcentration}
    setValue={setValueConcentration}
    setItems={setItemsConcentration}
    placeholder="Select concentration"
    listMode="SCROLLVIEW"
    style={styles.dropdown}
    dropDownContainerStyle={[styles.dropDownContainer, { zIndex: 1000 }]}
  />
</View>

      {/* Bottom half circle */}
      <View style={styles.halfCircle}></View>

      {/* Generate button */}
      <View style={styles.generateWrapper} pointerEvents="box-none">
        <Pressable onPress={() => navigation.navigate('CalendarScreen', {
          year: valueYear,
          term: valueTerm,
          major: valueMajor,
          concentration: valueConcentration,
        })}>
          <View style={styles.generate}>
            <Text style={styles.generateTitle}>GENERATE</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 300,
    paddingTop: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    width: '85%',
    fontStyle: 'italic',
    color: '#555',
    marginTop: 8,
    marginBottom: 5,
    textAlign: 'center',
  },
  formRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  dropdownWrapper: {
    width: '48%',
    paddingHorizontal: 20,
    marginTop: 16,
  },
  labelBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#c70202',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 6,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  dropdown: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  dropDownContainer: {
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  generate: {
    width: 220,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#031d52',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
    elevation: 20,
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  generateWrapper: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -110 }],
    bottom: 300,
    zIndex: 100000,
    elevation: 20,
  },
  generateTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 22,
  },
  formRow: {
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginTop: 12,
},
  // halfCircle: {
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   width: 390,
  //   height: 70,
  //   backgroundColor: '#3498db',
  //   borderTopLeftRadius: 100,
  //   borderTopRightRadius: 100,
  // },
});
