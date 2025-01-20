import Link from 'next/link';
import { RiDashboardFill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-wallet_white text-white fixed">
      <h2 className="text-2xl font-bold p-4 text-wallet_black">Budget <span className='text-wallet_red_100'>Buddy</span></h2>
      <nav className="mt-10">
        <ul>
          <li className="p-4 hover:bg-wallet_red_75 group">
            <Link href="/" className='text-wallet_black group-hover:text-wallet_white flex gap-1 items-center'><RiDashboardFill />Dashboard</Link>
          </li>
          <li className="p-4 hover:bg-wallet_red_75 group">
            <Link href="/transactions" className='text-wallet_black group-hover:text-wallet_white flex gap-1 items-center'><AiOutlineTransaction />Transactions</Link>
          </li>
          <li className="p-4 hover:bg-wallet_red_75 group">
            <Link href="/reports" className='text-wallet_black group-hover:text-wallet_white flex gap-1 items-center'><TbReport />Reports</Link>
          </li>
          <li className="p-4 hover:bg-wallet_red_75 group">
            <Link href="/categories" className='text-wallet_black group-hover:text-wallet_white flex gap-1 items-center'><MdCategory />Categories</Link>
          </li>
          <li className="p-4 hover:bg-wallet_red_75 group">
            <Link href="/budgets" className='text-wallet_black group-hover:text-wallet_white flex gap-1 items-center'><RiMoneyDollarCircleFill />Budgets</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
