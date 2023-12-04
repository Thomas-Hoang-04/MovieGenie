import axios from "axios";
import { Category } from "./types";

export const getData = async ({
  queryKey,
  pageParam,
}: {
  queryKey: string[];
  pageParam: number;
}) => {
  const [_key, query, type] = queryKey as [string, Category, string];
  const res = await axios.request({
    method: "GET",
    url: `/api/search`,
    params: {
      type: type,
      query: query,
      page: pageParam,
    },
  });
  return res.data;
};
