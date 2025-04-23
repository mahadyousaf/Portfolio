import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TaskManager = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [hiddenTasks, setHiddenTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const hideTask = (index) => {
    const taskToHide = tasks[index];
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setHiddenTasks([...hiddenTasks, taskToHide]);
  };

  const unhideTask = (index) => {
    const taskToUnhide = hiddenTasks[index];
    const newHiddenTasks = hiddenTasks.filter((_, i) => i !== index);
    setHiddenTasks(newHiddenTasks);
    setTasks([...tasks, taskToUnhide]);
  };

  const showHiddenTasks = () => {
    alert(`Hidden Tasks:\n${hiddenTasks.join('\n')}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text>{item}</Text>
            <View style={styles.buttons}>
              <Button title="Remove" onPress={() => removeTask(index)} />
              <Button title="Hide" onPress={() => hideTask(index)} />
            </View>
          </View>
        )}
      />
      <Button title="Show Hidden Tasks" onPress={showHiddenTasks} />
      <FlatList
        data={hiddenTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text>{item}</Text>
            <View style={styles.buttons}>
              <Button title="Unhide" onPress={() => unhideTask(index)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default TaskManager;