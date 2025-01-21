"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { FaPlus } from "react-icons/fa6";

export default function TransactionsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex">
        <Sidebar />
        <p className="text-[20px] text-center flex justify-center mx-auto mt-64">
          Please log in to see your transactions.
        </p>
      </div>
    );
  }

  const EXPENSE_LIMIT = 2000;

  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    category: "",
    subcategory: "",
  });
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (user) {
      const savedTransactions = JSON.parse(localStorage.getItem(user.email)) || [];
      setTransactions(savedTransactions);
    }
  }, [user]);

  const saveTransactions = (updatedTransactions) => {
    localStorage.setItem(user.email, JSON.stringify(updatedTransactions));
  };

  const handleAddTransaction = () => {
    const newTransactionEntry = {
      id: Date.now(),
      ...newTransaction,
      date: new Date().toISOString(),
    };

    const updatedTransactions = [...transactions, newTransactionEntry];

    const totalExpense = updatedTransactions
      .filter((transaction) => transaction.category === "expense")
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

    if (totalExpense > EXPENSE_LIMIT) {
      setShowLimitModal(true);
    } else {
      setTransactions(updatedTransactions);
      saveTransactions(updatedTransactions);
    }

    setNewTransaction({
      amount: "",
      category: "",
      subcategory: "",
    });

    setIsAddingTransaction(false);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  const closeModal = () => setIsAddingTransaction(false);

  const closeLimitModal = () => setShowLimitModal(false);

  const closeSummary = () => setSelectedTransaction(null);

  const totalIncome = transactions
    .filter((transaction) => transaction.category === "income")
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.category === "expense")
    .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

  return (
    <div className="flex relative">
      <Sidebar />
      <div className="p-8 mx-auto w-full pl-80">
        <h2 className="text-2xl text-wallet_red_100 font-semibold">Transactions</h2>

        {transactions.length === 0 ? (
          <div className="flex justify-between items-center mt-4">
            <p className="text-[20px] text-wallet_black font-extralight">
              You don't have any transactions
            </p>
            <button
              onClick={() => setIsAddingTransaction(true)}
              className="bg-wallet_red_100 text-white rounded-lg p-2 flex items-center gap-1"
            >
              <FaPlus /> Add New Transaction
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex justify-between">
              <h3 className="text-lg text-gray-400">All Transactions</h3>
              <button
                onClick={() => setIsAddingTransaction(true)}
                className="bg-wallet_red_100 text-[15px] text-white rounded-lg p-2 flex gap-1 items-center"
              >
                <FaPlus /> Add New Transaction
              </button>
            </div>

            <table className="min-w-full mt-4 table-auto">
              <thead>
                <tr>
                  <th className="border px-4 py-2 text-left">#</th>
                  <th className="border px-4 py-2 text-left">Amount</th>
                  <th className="border px-4 py-2 text-left">Category</th>
                  <th className="border px-4 py-2 text-left">Subcategory</th>
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{transaction.amount}</td>
                    <td className="border px-4 py-2">{transaction.category}</td>
                    <td className="border px-4 py-2">{transaction.subcategory}</td>
                    <td className="border px-4 py-2">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTransaction(transaction.id);
                        }}
                        className="bg-wallet_red_100 text-[12px] text-white rounded-lg px-2 py-1"
                      >
                        Delete this transaction
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center gap-6 mt-4">
              <p className="bg-green-100 p-2 rounded-lg">
                Total Income: ${totalIncome.toFixed(2)}
              </p>
              <p className="bg-wallet_red_10 p-2 rounded-lg">
                Total Expense: ${totalExpense.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {selectedTransaction && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h3 className="text-xl mb-2 text-wallet_red_100">Transaction Summary</h3>
              <p><strong>Amount:</strong> ${selectedTransaction.amount}</p>
              <p><strong>Category:</strong> {selectedTransaction.category}</p>
              <p><strong>Subcategory:</strong> {selectedTransaction.subcategory}</p>
              <p><strong>Date:</strong> {new Date(selectedTransaction.date).toLocaleDateString()}</p>
              <button
                onClick={closeSummary}
                className="bg-red-500 text-white p-2 w-full mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {isAddingTransaction && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h3 className="text-xl mb-2">Add New Transaction</h3>

              <input
                type="number"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                className="p-2 border mb-2 w-full"
              />
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, category: e.target.value })
                }
                className="p-2 border mb-2 w-full"
              >
                <option value="">Select Category</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="text"
                placeholder="Subcategory"
                value={newTransaction.subcategory}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, subcategory: e.target.value })
                }
                className="p-2 border mb-4 w-full"
              />
              <button
                onClick={handleAddTransaction}
                className="bg-green-500 text-white p-2 w-full mb-2"
              >
                Add Transaction
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white p-2 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showLimitModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h3 className="text-xl mb-2 text-red-500">Expense Limit Exceeded</h3>
              <p>You shouldn't exceed $2000 of expenses!</p>
              <button
                onClick={closeLimitModal}
                className="bg-red-500 text-white p-2 w-full mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
