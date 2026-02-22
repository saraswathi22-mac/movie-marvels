import { useEffect, useState } from "react";
import axios from "axios";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchDataFromApi(url, {
          ...params,
          signal: controller.signal,
        });

        setData(res);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err?.response?.data?.status_message ||
              err.message ||
              "Something went wrong"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, JSON.stringify(params)]);

  return { data, loading, error };
};

export default useFetch;
