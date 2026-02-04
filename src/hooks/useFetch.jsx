import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetchDataFromApi(url);

        if (isMounted) {
          setData(res);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err?.response?.data?.status_message || "Something went wrong",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
