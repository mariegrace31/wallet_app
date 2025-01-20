"use client"
import { useState } from 'react';

export default function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [account, setAccount] = useState('Bank');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTransaction = { description, amount, type, account, date: new Date().toISOString() };

    const response = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(newTransaction),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const addedTransaction = await response.json();
      onAddTransaction(addedTransaction);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <select value={account} onChange={(e) => setAccount(e.target.value)}>
        <option value="Bank">Bank</option>
        <option value="Mobile Money">Mobile Money</option>
        <option value="Cash">Cash</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
}
