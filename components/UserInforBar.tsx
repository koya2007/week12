"use client";

import { useEffect, useState } from "react";

type UserInfo = {
  role: string;
  name: string;
  email: string;
};

// ค่าเริ่มต้น (ใช้เมื่อยังไม่มีข้อมูลผู้ใช้)
const defaultUser: UserInfo = {
  role: "USER",
  name: "น.ส. ใช้งาน ธรรมดา",
  email: "user@company.com",
};

export default function UserInfoBar() {
  const [user, setUser] = useState<UserInfo>(defaultUser);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user"); // ปรับ key ให้ตรงกับที่เก็บตอน login
      if (saved) setUser({ ...defaultUser, ...JSON.parse(saved) });
    } catch {
      // ใช้ค่าเริ่มต้น
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm">
      <div className="flex items-center gap-1">
        <span className="font-bold text-black">ROLE:</span>
        <span className="rounded-full bg-red-50 px-3 py-1 font-bold text-red-600">
          {user.role.toUpperCase()}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <span className="font-bold text-black">NAME:</span>
        <span className="rounded-full bg-green-50 px-3 py-1 font-bold text-green-700">
          {user.name}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <span className="font-bold text-black">EMAIL:</span>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
          {user.email}
        </span>
      </div>
    </div>
  );
}