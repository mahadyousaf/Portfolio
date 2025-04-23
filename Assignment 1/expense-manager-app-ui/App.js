import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const addExpense = () => {
    if (expenseName.trim() && expenseAmount.trim()) {
      setExpenses([...expenses, { id: Date.now().toString(), name: expenseName, amount: parseFloat(expenseAmount) }]);
      setExpenseName('');
      setExpenseAmount('');
    }
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const renderExpenseItem = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseName}>{item.name}</Text>
      <Text style={styles.expenseAmount}>${item.amount.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Manager</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Expense Name"
          value={expenseName}
          onChangeText={setExpenseName}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={expenseAmount}
          keyboardType="numeric"
          onChangeText={setExpenseAmount}
        />
        <TouchableOpacity style={styles.addButton} onPress={addExpense}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.totalText}>Total Expenses: ${totalExpenses.toFixed(2)}</Text>
      <FlatList
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.expenseList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796b',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00796b',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#00796b',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
  },
  expenseList: {
    paddingBottom: 20,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  expenseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00796b',
  },
  expenseAmount: {
    fontSize: 16,
    color: '#d32f2f',
  },
});

export default App;