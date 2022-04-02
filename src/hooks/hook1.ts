import axios from "axios";
import { useCallback, useState } from "react";
import { Todo } from "../types/type1";

export const useTodo = () => {
  const [users, setUsers] = useState<Todo[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get<Todo[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );
      // const data = [];
      setUsers(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, isLoading, fetch };
};
