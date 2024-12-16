import { useEffect, useState } from "react";
import { baseUrl } from "../api/baseUrl";

const useFetch = <T, E = string>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<E | null>(null);
  const [refetchData, setRefetchData] = useState(false);

  const refetch = () => {
    setRefetchData(!refetchData);
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(baseUrl + url, {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error("Network Error");
        }

        const data = await res.json();

        setData(data);
        setLoading(false);
        setError(null);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message as E);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [refetchData]);

  return { data, loading, error, refetch };
};

export default useFetch;
