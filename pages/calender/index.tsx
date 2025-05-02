import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const getDaysArray = (year: number, month: number): (Date | null)[] => {
    const firstDayOfMonth = new Date(year, month, 1)
    const startingDay = firstDayOfMonth.getDay()
    const monthLength = new Date(year, month + 1, 0).getDate()
    const daysArray: (Date | null)[] = []

    for (let i = 0; i < startingDay; i++) {
      daysArray.push(null)
    }
    for (let i = 1; i <= monthLength; i++) {
      daysArray.push(new Date(year, month, i))
    }
    const remainingDays = 42 - daysArray.length
    for (let i = 1; i <= remainingDays; i++) {
      daysArray.push(null)
    }

    return daysArray
  }

  const renderCalendar = () => {
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()
    const daysArray = getDaysArray(year, month)
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const handleDayPress = (day: Date | null) => {
      setSelectedDate(day)
    }

    return (
      <View style={styles.calendarContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={prevMonth}>
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.month}>{`${new Date(currentDate).toLocaleString(
            "default",
            { month: "long" }
          )} ${year}`}</Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.daysContainer}>
          {daysOfWeek.map((day, index) => (
            <Text key={index} style={styles.dayOfWeek}>
              {day}
            </Text>
          ))}
          {daysArray.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dayContainer}
              onPress={() => handleDayPress(day)}
            >
              {day && (
                <View>
                  <Text
                    style={[
                      styles.day,
                      isSameDate(day, selectedDate) && styles.selectedDay,
                      isSameDate(day, new Date()) && styles.currentDay,
                    ]}
                  >
                    {day.getDate()}
                  </Text>
                  <View style={styles.dot}></View>
                  <Text
                    style={[
                      styles.dayText,
                      isSameDate(day, selectedDate) && styles.selectedDayText,
                      isSameDate(day, new Date()) && styles.currentDayText,
                    ]}
                  >
                    100%
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const isSameDate = (date1: Date | null, date2: Date | null) => {
    return date1 && date2 && date1.toDateString() === date2.toDateString()
  }

  return <View style={styles.container}>{renderCalendar()}</View>
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    height: 10,
    width: 10,
    backgroundColor: "red",
    textAlign: "right",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "red",
  },
  arrow: {
    fontSize: 20,
  },
  month: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "green",
  },
  dayOfWeek: {
    width: "14%",
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "orange",
  },
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor:"gray"
  },
  dayContainer: {
    width: "14%",
    height: 70,
    alignItems: "flex-end",
    borderWidth: 1,
    borderColor: "rgba(229, 229, 229, 1)",
  },
  day: {
    textAlign: "right",
  },
  dayText: {
    textAlign: "center",
    color: "rgba(23, 167, 0, 1)",
  },
  selectedDay: {
    backgroundColor: "lightblue",
    borderRadius: 20,
  },
  selectedDayText: {
    color: "white",
  },
  currentDay: {
    backgroundColor: "yellow",
    borderRadius: 20,
  },
  currentDayText: {
    color: "black",
  },
})

export default Calendar
