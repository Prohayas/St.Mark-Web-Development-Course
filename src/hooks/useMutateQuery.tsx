import { useState } from "react";
import { baseUrl } from "../api/baseUrl";

type RequestOptions<T> = {
  url: string;
  method: "POST" | "PUT" | "DELETE";
  bodyData?: T;
  formData?: FormData;
};

type ApiResponse<T> = {
  response: T | null;
  error: string | null;
  isLoading: boolean;
  query: <TData>({
    url,
    method,
    bodyData,
    formData,
  }: RequestOptions<TData>) => Promise<void>;
};

function useMutateQuery<T>(): ApiResponse<T> {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const query = async <TData,>({
    url,
    method,
    bodyData,
    formData,
  }: RequestOptions<TData>) => {
    setIsLoading(true);
    setError(null);

    try {
      const headers: HeadersInit = formData
        ? {}
        : { "Content-Type": "application/json" };
      const body = formData
        ? formData
        : bodyData
        ? JSON.stringify(bodyData)
        : undefined;

      const res = await fetch(baseUrl + url, {
        method,
        headers,
        body,
      });

      if (!res.ok) {
        throw new Error("Network error occured.");
      }

      const data = await res.json();

      setResponse(data);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };
  return { response, error, isLoading, query };
}

export default useMutateQuery;
