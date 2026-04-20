import Image from "next/image";
import loading_emoji from "@/public/icons8-foot-emoji-96.png"

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-[spin_0.3s_linear_infinite]">
        <Image src={loading_emoji} alt="Loading Icon" width={200} height={200} className="mx-auto mt-4" priority/>
      </div>
    </div>
  );
}