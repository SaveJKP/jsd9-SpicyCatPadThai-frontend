import { useEffect, useState } from "react";
import { FetchDataUser, AddData, DeleteData } from "../api";

export default function TestAPI() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [position, setPosition] = useState("");

  async function fetchDataUser() {
    setUsers(await FetchDataUser());
  }

  useEffect(() => {
    fetchDataUser();
  }, []);

  async function addData() {
    const payload = { name, lastname, position };
    await AddData(payload);
  }

  const save = async () => {
    await addData();
    fetchDataUser();
  };

  const remove = async (item) => {
    await DeleteData(item);
    fetchDataUser();
  };

  return <div>TestAPI</div>;
}
