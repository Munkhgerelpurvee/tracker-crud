"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  //
  const [records, setRecords] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/article")
      .then((res) => res.json())
      .then((data) => {
        console.log("Where is Records Data", data);
        setRecords(data);
      });
  }, []);

  //
  const [accounts, setAccounts] = useState([]);
  // Refresh хийхэд биш харин бичмэгч автоматаар орж ирдэг болгоё гэвэл нэг function дотор бичиж өгөөд харин дараа нь түүнийг useEffect дотор нэг удаа дуудаж авдаг болгоно.  Мөн function createNewAccount дотор дуудчих юм бол дахин шинэчлэгдэж орж ирэх байгаа.

  function loadAccount() {
    fetch("http://localhost:4000/accounts/list")
      .then((res) => res.json())
      .then((data) => {
        console.log("Where is ACCOUNTS LIST Data", data);
        setAccounts(data);
      });
  }
  useEffect(() => {
    loadAccount();
  }, []);

  function createNewAccount() {
    const name = prompt("Name...");
    const title = prompt("Title:");
    fetch(`http://localhost:4000/accounts/create`, 
      {method: "POST",
      // Body нь өөрөө заавал string авдаг байгаа. Тэгхээр JSON файлаа string рүү хөрвүүлж бичих хэрэгтэй байгаа. Мөн ямар ч том хэмжээтэй текст авч чадна. 
       body: JSON.stringify({
        name:name,
        title:title,
        body_html:`сайн байна уу. Та бүхэндээ энэ сайхан өдрийн мэндийг хүргэж байна. Энэ body дотор ямар ч урт тэмдэгт явуулж болох байгаа. POST хүсэлтээр ямар ч өргөнтэй ямар ч тэмдэгт явуулж болно.Энэ зам дээр л урт болон тэмдэгтийн хязгаарлалт байдаг байгаа. http://localhost:4000/accounts/update?id=2024-08-17T10:22:46.286Z&name=Bold&title=harvest`
       },

         ),
      
       headers: {"Content-type":"application/json; charset=UTF-8"},
       })
      .then((res) => res.json())
      .then(() => {
        loadAccount();
      });
  }

  // Одоо create хийхдээ урт текстийг яаж оруулж ирэх вэ гэдэг асуудал гарна. Body гэсэн урт текстийг хэрхэн оруулж ирэх вэ? Ганц ширхэг нэр болон гарчиг бол // http://localhost:4000/accounts/create?name=Bold&title=harvest гэж оруулахад асуудалгүй ч урт body-ийг бол оруулах боломжгүй байгаа.

  //
  return (
    <main className="flex min-h-screen flex-col p-2 gap-4">
      <>
        {records.map((record) => {
          return (
            <>
              <div key={record.id} className="flex">
                {" "}
                <p className="bg-gray-200 gap-4 rounded-full">
                  {`№:${record.id}  ${record.title}`}
                </p>
                <br />
                <p className="bg-green-700 rounded-full">{record.name}</p>
                <br />
              </div>
              {/*  */}
            </>
          );
        })}
        {/* Одоо урд талаасаа мэдээллээ оруулдаг болно гэвэл яах вэ? Button хийж prompt-с утга авч болно.  */}
        <div className="flex">
          <button
            onClick={createNewAccount}
            className="bg-blue-800 rounded-full px-4 text-white"
          >
            Add New account
          </button>
        </div>
        <div className=" pr-4">
          {accounts.map((item, index) => {
            return (
              <div key={item.name + index} className="text-gray-600 gap-4 pr-4">
                <div>
                  {`Name:${item.name}`} {`Tiitle:${item.title}`}
                  <button className="bg-blue-800 rounded-full px-4 text-white">
                    Edit
                  </button>
                  <button className="bg-blue-800 rounded-full px-4 text-white">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </>
    </main>
  );
}
