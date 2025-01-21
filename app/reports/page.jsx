"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";

export default function ReportPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex">
        <Sidebar />
        <p className="text-[15px] lg:text-[20px] text-center flex justify-center mx-auto mt-64">
          Please log in to view your transactions report.
        </p>
      </div>
    );
  }

  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      const savedTransactions = JSON.parse(localStorage.getItem(user.email)) || [];
      setTransactions(savedTransactions);
    }
  }, [user]);

  const handleGenerateReport = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);

      return transactionDate >= start && transactionDate <= end;
    });

    setFilteredTransactions(filtered);
  };

  const handleTodayReport = () => {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);
      return transactionDate >= start && transactionDate <= end;
    });

    setFilteredTransactions(filtered);
  };

  const headers = [
    { label: "Amount", key: "amount" },
    { label: "Category", key: "category" },
    { label: "Subcategory", key: "subcategory" },
    { label: "Date", key: "date" },
  ];

  return (
    <div className="flex relative">
      <Sidebar />
      <div className="p-8 mx-auto w-full pl-4 pt-16 lg:pt-8 lg:pl-80">
        <h2 className="text-lg lg:text-2xl text-wallet_red_100 font-semibold">Transactions Report</h2>

        <div className="mt-6 flex gap-3 lg:gap-6">
          <div className="flex flex-col lg:flex-row justify-center mx-auto lg:mx-0 items-center gap-2">
            <div className="flex gap-4 items-center">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-2 border text-[11px] lg:text-[16px]"
            />
            <span className="text-gray-600">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-2 border text-[11px] lg:text-[16px]"
            />
            </div>
            <div className="flex gap-3">
            <button
              onClick={handleGenerateReport}
              className="bg-wallet_red_100 text-white text-[13px] lg:text-[16px] p-2 rounded-lg"
            >
              Generate Report
            </button>
            <button
              onClick={handleTodayReport}
              className="bg-green-500 text-white p-2 text-[13px] lg:text-[16px] rounded-lg"
            >
              Today's Report
            </button>
            </div>
           
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <p className="text-[15px] lg:text-[20px] text-wallet_black font-extralight mt-6">
            No transactions found in this time range.
          </p>
        ) : (
          <>
            <div className="mt-4">
              <table className="min-w-full mt-10 lg:mt-4 table-auto">
                <thead>
                  <tr>
                    <th className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px] text-left">Amount</th>
                    <th className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px] text-left">Category</th>
                    <th className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px] text-left">Subcategory</th>
                    <th className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px] text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr key={transaction.id}>
                      <td className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px]">{transaction.amount}</td>
                      <td className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px]">{transaction.category}</td>
                      <td className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px]">{transaction.subcategory}</td>
                      <td className="border px-1 lg:px-4 py-1 lg:py-2 text-[11px] lg:text-[17px]">
                        {new Date(transaction.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mt-4">
                <CSVLink
                  data={filteredTransactions}
                  headers={headers}
                  filename={"transactions_report.csv"}
                  className="bg-wallet_red_20 text-wallet_black p-2 text-[12px] lg:text-[16px] rounded-lg flex items-center gap-2"
                >
                  <FaDownload /> Download Report
                </CSVLink>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
