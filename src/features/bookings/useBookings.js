import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // { field: "status", value: filterValue, method: "gte" };

  //SORT BY
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const Page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, Page],
    queryFn: () => getBookings({ filter, sortBy, Page }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (Page < pageCount) {
    //PRE-FETCHING
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, Page + 1],
      queryFn: () => getBookings({ filter, sortBy, Page: Page + 1 }),
    });
  }
  if (Page > 1) {
    //PRE-FETCHING
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, Page - 1],
      queryFn: () => getBookings({ filter, sortBy, Page: Page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
