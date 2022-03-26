import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { ItemWrapper } from "./ItemWrapper";

import { TaskItem } from "./TaskItem";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      showsVerticalScrollIndicator={false}
      style={styles.flatlist}
      contentContainerStyle={styles.contentContainer}
      renderItem={({ item, index }) => (
        <ItemWrapper index={index}>
          <TaskItem
            index={index}
            item={item}
            onRemoveTaskPress={removeTask}
            onEditTaskPress={editTask}
            onToggleTaskDonePress={toggleTaskDone}
          />
        </ItemWrapper>
      )}
    />
  );
}

const styles = StyleSheet.create({
  flatlist: {
    marginTop: 32,
  },
  contentContainer: {
    paddingBottom: 24,
  },
});
