import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskItemProps {
  item: Task;
  index: number;
  onToggleTaskDonePress: (id: number) => void;
  onRemoveTaskPress: (id: number) => void;
  onEditTaskPress: (id: number, newTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  onToggleTaskDonePress,
  onRemoveTaskPress,
  onEditTaskPress,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTitle(item.title);
  }

  function handleSubmitEditing() {
    onEditTaskPress(item.id, title);
    setTitle(item.title);
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing) {
      textInputRef.current?.focus();
    } else {
      textInputRef.current?.blur();
    }
  }, [isEditing]);

  useEffect(() => {
    setTitle(item.title);
  }, [item.title]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => onToggleTaskDonePress(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>
          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.actionButtons}>
        {isEditing ? (
          <TouchableOpacity
            testID={`cancel-${index}`}
            style={styles.actionButton}
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID={`edit-${index}`}
            style={styles.actionButton}
            onPress={handleStartEditing}
          >
            <Icon name="edit-2" size={18} color="#b2b2b2" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          testID={`trash-${index}`}
          style={[styles.actionButton, { opacity: isEditing ? 0.2 : 1 }]}
          onPress={() => onRemoveTaskPress(item.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  actionButtons: {
    flexDirection: "row",
    marginRight: 24,
  },
  actionButton: {
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
