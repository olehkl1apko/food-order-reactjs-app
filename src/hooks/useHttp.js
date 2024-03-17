import { useCallback, useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}

export default function useHttp(endpoint, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(body) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(BACKEND_URL + endpoint, {
          ...config,
          body,
        });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [endpoint, config]
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
