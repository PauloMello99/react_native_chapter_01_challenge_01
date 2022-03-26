import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {
    const newTask: Task = { id: new Date().getTime(), done: false, title };
    setTasks((t) => [...t, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks((list) => {
      const newList = [...list];
      const taskIndex = newList.findIndex((tsk) => tsk.id === id);
      newList[taskIndex].done = !newList[taskIndex].done;
      return newList;
    });
  }

  function handleRemoveTask(id: number) {
    setTasks((list) => list.filter((tsk) => tsk.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
