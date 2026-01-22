import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

function DropTitle({ title, children }){
  const labelText = children ?? title;

  return(
    <View style={styles.labelBubble}>
          <Text style={styles.label}>{labelText}</Text>
    </View>
  );
}
export default DropTitle;

const styles = StyleSheet.create({

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
  }
});