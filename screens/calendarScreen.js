import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import { getSchedule } from "../util/server_connection";

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 0xFFFFFF).toString(16);
  return `#${randomColor.padStart(6, '0')}`;
}

export function CalendarScreen({ year = 2026, semester = "Spring", major = "CS" }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [classData, setClassData] = useState([]);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = ["8:00", "9:30", "11:00", "12:30", "2:00"];

  const normalizeTime = (timeString) => {
    if (!timeString || typeof timeString !== "string") return "";
    const match = timeString.match(/(\d{1,2}:\d{2})/);
    return match ? match[1] : timeString;
  };

  const normalizeDay = (dayToken) => {
    if (!dayToken || typeof dayToken !== "string") return null;
    const mapping = {
      M: "Mon", MON: "Mon", MONDAY: "Mon",
      TU: "Tue", TUE: "Tue", TUES: "Tue", TUESDAY: "Tue", T: "Tue",
      W: "Wed", WED: "Wed", WEDNESDAY: "Wed",
      R: "Thu", TH: "Thu", THU: "Thu", THUR: "Thu", THURS: "Thu", THURSDAY: "Thu", H: "Thu",
      F: "Fri", FRI: "Fri", FRIDAY: "Fri"
    };
    return mapping[dayToken.trim().toUpperCase()] || null;
  };

  const parseDays = (dayValue) => {
    if (Array.isArray(dayValue)) return Array.from(new Set(dayValue.map(normalizeDay).filter(Boolean)));
    if (typeof dayValue !== "string") return [];
    const tokens = dayValue.replace(/\s+/g, "").split(/[,;&]/).reduce((acc, token) => {
      if (!token) return acc;
      if (/^[A-Z]+$/.test(token)) {
        let i = 0;
        while (i < token.length) {
          const ch = token[i];
          if (ch === "T" && token[i + 1] === "H") { acc.push("TH"); i += 2; }
          else if (ch === "T" && token.startsWith("TU", i)) { acc.push("TU"); i += 2; }
          else { acc.push(ch); i += 1; }
        }
      } else acc.push(token);
      return acc;
    }, []);
    return Array.from(new Set(tokens.map(normalizeDay).filter(Boolean)));
  };

  const fetchSchedule = async () => {
    const response = await getSchedule(year, semester, major);
    const rawCourses = response?.courses || [];
    const processedCourses = rawCourses.map(c => ({
      ...c,
      day: parseDays(c.day),
      time: normalizeTime(c.time),
      color: c.color || getRandomHexColor(),
    }));
    setClassData(processedCourses);
  };

  useEffect(() => { fetchSchedule(); }, [year, semester, major]);

  const getEvent = (day, time) => classData.find(c => c.day.includes(day) && c.time === time);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerBubble} />
        <Text style={styles.header}>Weekly Schedule - {semester} {year}</Text>
      </View>

      {/* DAY HEADER */}
      <View style={styles.tableHeader}>
        <View style={styles.timeColumnHeader} />
        {days.map(day => <Text key={day} style={styles.dayHeaderText}>{day}</Text>)}
      </View>

      {/* SCHEDULE TABLE */}
      <ScrollView style={styles.scrollContainer}>
        {timeSlots.map((time, rowIndex) => (
          <View
            key={time}
            style={[
              styles.row,
              // { backgroundColor: time === "12:30" ? "#fefefe" : rowIndex % 2 === 0 ? "#fefefe" : "#f7f7f7" }
            ]}
          >
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
            {days.map(day => {
              const event = getEvent(day, time);
              return (
                <View key={day} style={styles.eventBox}>
                  {event ? (
                    <TouchableOpacity
                      style={[styles.event, { backgroundColor: event.color }]}
                      onPress={() => setSelectedClass(event)}
                    >
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventLocation}>{event.location}</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.emptySlot} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>

      {/* MODAL */}
      <Modal visible={!!selectedClass} transparent animationType="fade" onRequestClose={() => setSelectedClass(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedClass && (
              <>
                <Text style={styles.modalTitle}>{selectedClass.title}</Text>
                <Text style={styles.modalText}>Course ID: {selectedClass.id}</Text>
                <Text style={styles.modalText}>Time: {selectedClass.time}</Text>
                <Text style={styles.modalText}>Location: {selectedClass.location}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedClass(null)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  // CONTAINER
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 120,
    paddingTop: 20,
  },

  // HEADER
  headerWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    position: "relative",
  },
  headerBubble: {
    position: "absolute",
    top: 0,
    width: "30%",
    height: 50,
    backgroundColor: "#c70202",
    borderRadius: 30,
    zIndex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    zIndex: 2,
    paddingVertical: 12,
  },

  // TABLE
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 2,
    marginTop: 10,
  },
  timeColumnHeader: {
    width: 50,
  },
  timeColumn: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5fb",
    borderRadius: 6,
    paddingVertical: 1,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
    color: "#2f4f79",
    paddingVertical: 6,
    marginHorizontal: 70,
    borderRadius: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    borderRadius: 8,
    minHeight: 52,
    overflow: "hidden",
    paddingVertical: 9,
  },
  timeText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },

  // EVENT CELLS
  eventBox: {
    flex: 1,
    height: 60,
    marginHorizontal: 6,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#eee",
    marginLeft: 12,
  },
  event: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  eventTitle: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  eventLocation: {
    fontSize: 11,
    color: "#fff",
    textAlign: "center",
    marginTop: 1,
  },
  emptySlot: {
    width: "100%",
    height: "100%",
  },

  // MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "20%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#222",
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 18,
    alignSelf: "center",
    backgroundColor: "#c70202",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CalendarScreen;