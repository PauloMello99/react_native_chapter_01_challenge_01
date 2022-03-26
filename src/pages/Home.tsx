import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(title: string) {
    const taskExists = !!tasks.find((task) => task.title === title);

    if (taskExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
      return;
    }

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

  function handleEditTask(id: number, taskNewTitle: string) {
    setTasks((list) => {
      const newList = [...list];
      const taskIndex = newList.findIndex((tsk) => tsk.id === id);
      newList[taskIndex].title = taskNewTitle;
      return newList;
    });
  }

  function handleRemoveTask(id: number) {
    const remoteTask = () =>
      setTasks((list) => list.filter((tsk) => tsk.id !== id));

    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [{ text: "Não" }, { text: "Sim", onPress: remoteTask }]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />
      <TodoInput addTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
