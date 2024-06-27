"use client";
import { privacy } from "@/app/utils/constants";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="absolute flex flex-col w-full h-full bg-white p-4">
      <pre className="whitespace-pre-wrap">{privacy}</pre>
      <button
        onClick={() => {
          router.back();
        }}
      >
        Back
      </button>
    </div>
  );
}
