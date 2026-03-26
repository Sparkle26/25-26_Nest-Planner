import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from "react-native";
import { getSchedule } from "../util/server_connection";

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 0xFFFFFF).toString(16);

  const paddedColor = randomColor.padStart(6, '0');

  return `#${paddedColor}`;
}
//import { getSchedule } from '../util/firebase_connection';

// Sample data structure for the course schedule
// const classData = [
//   { title: "Computer Science I", id: "CS121", location: "Esbenshade 281", day: ["Mon", "Wed", "Fri"], time: "11:00", color: "#004B98" },
//   { title: "Software Engineering", id: "CS341", location: "CS Lounge", day: ["Tue", "Thu"], time: "9:30", color: "#3DB5E6" },
// ];

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
    const token = dayToken.trim().toUpperCase();

    const mapping = {
      M: "Mon",
      MON: "Mon",
      MONDAY: "Mon",
      TU: "Tue",
      TUE: "Tue",
      TUES: "Tue",
      TUESDAY: "Tue",
      T: "Tue",
      W: "Wed",
      WED: "Wed",
      WEDNESDAY: "Wed",
      R: "Thu",
      TH: "Thu",
      THU: "Thu",
      THUR: "Thu",
      THURS: "Thu",
      THURSDAY: "Thu",
      H: "Thu",
      F: "Fri",
      FRI: "Fri",
      FRIDAY: "Fri",
    };

    return mapping[token] || null;
  };

  const parseDays = (dayValue) => {
    if (Array.isArray(dayValue)) {
      return Array.from(
        new Set(
          dayValue
            .map((d) => normalizeDay(d))
            .filter(Boolean)
        )
      );
    }
    if (typeof dayValue !== "string") return [];

    // split by comma/spaces or keep single-run tokens like MWF or TuTh
    const tokens = dayValue
      .replace(/\s+/g, "")
      .split(/[,;&]/)
      .reduce((acc, token) => {
        if (!token) return acc;

        // handle compact form like MWF or TuTh
        if (/^[A-Z]+$/.test(token) && !token.includes(" ")) {
          let i = 0;
          while (i < token.length) {
            const ch = token[i];
            if (ch === "T" && token[i + 1] === "H") {
              acc.push("TH");
              i += 2;
            } else if (ch === "T" && token.startsWith("TU", i)) {
              acc.push("TU");
              i += 2;
            } else {
              acc.push(ch);
              i += 1;
            }
          }
        } else {
          acc.push(token);
        }
        return acc;
      }, []);

    return Array.from(
      new Set(
        tokens
          .map((t) => normalizeDay(t))
          .filter(Boolean)
      )
    );
  };

  const fetchSchedule = async () => {
    console.log("Sending out the get request");
    const response = await getSchedule(year, semester, major);
    const rawCourses = response?.courses || [];

    const processedCourses = rawCourses.map((c) => ({
      ...c,
      day: parseDays(c.day),
      time: normalizeTime(c.time),
      color: c.color || getRandomHexColor(),
    }));

    setClassData(processedCourses);

    console.log("Fetched classes:", processedCourses);
  };

  useEffect(() => {
    fetchSchedule();
  }, [year, semester, major]);

  const getEvent = (day, time) =>
    classData.find((c) => c.day.includes(day) && c.time === time);

  return (
    <View style={styles.container}>

      {/* FIXED HEADER */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerBubble} />
        <Text style={styles.header}>Weekly Schedule - {semester} {year}</Text>
      </View>

      <View style={styles.tableHeader}>
        <View style={styles.timeColumnHeader} />
        {days.map((day) => (
          <Text key={day} style={styles.dayHeaderText}>{day}</Text>
        ))}
      </View>

      <ScrollView style={styles.scrollContainer}>
        {timeSlots.map((time) => (
          <View key={time} style={styles.row}>
            <Text style={styles.timeText}>{time}</Text>

            {days.map((day) => {
              const event = getEvent(day, time);

              return (
                <View key={day} style={styles.eventBox}>
                  {event ? (
                    <TouchableOpacity
                      style={[styles.event, { backgroundColor: event.color || "#ccc" }]}
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
      <Modal
        visible={!!selectedClass}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedClass(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedClass && (
              <>
                <Text style={styles.modalTitle}>{selectedClass.title}</Text>
                <Text style={styles.modalText}>Course ID: {selectedClass.id}</Text>
                <Text style={styles.modalText}>Time: {selectedClass.time}</Text>
                <Text style={styles.modalText}>Location: {selectedClass.location}</Text>

                <TouchableOpacity
                  onPress={() => setSelectedClass(null)}
                  style={styles.closeButton}
                >
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
container: {
  flex: 1,
  backgroundColor: "#fff",
  paddingHorizontal: 16,
  paddingTop: 40,
},

/* FIXED HEADER */
  headerWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  headerBubble: {
    position: "absolute",
    top: 0,
    width: "80%",
    height: 50,
    backgroundColor: "#c70202",
    borderRadius: 24,
    zIndex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    zIndex: 2,
    paddingVertical: 10,
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    paddingRight: 8,
  },
  timeColumnHeader: {
    width: 50,
  },
  dayHeaderText: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },

  scrollContainer: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  timeText: {
    width: 50,
    fontSize: 9,
    fontWeight: "bold",
    color: "#444",
    paddingHorizontal: 13,
  },

  eventBox: {
    flex: 1,
    height: 80,
    marginHorizontal: 0,
    marginVertical: 6,
    borderRadius: 10,
    overflow: "hidden", // FIX: ensures event fills the box cleanly
  },

  event: {
    width: "100%", // FIXED
    height: "100%", // FIXED
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  eventTitle: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
  eventLocation: {
    fontSize: 10,
    color: "#fff",
    textAlign: "center",
  },

  emptySlot: {
    width: "100%",
    height: "100%",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 15,
    color: "#444",
    marginBottom: 5,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 15,
    alignSelf: "center",
    backgroundColor: "#c70202",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
