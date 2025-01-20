import Image from "next/image";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <div className="flex" >
     <Sidebar />
     <div>
      <p>hello</p>
     </div>
    </div>
  );
}
