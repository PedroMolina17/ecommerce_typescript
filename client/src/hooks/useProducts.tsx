"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/products";

export const useProduct = () => {
  const queryClient = useQueryClient();

  const useGetAllProducts = () =>
    useQuery({
      queryKey: ["products"],
      queryFn: () => getAllProducts(),
    });

  return {
    useGetAllProducts,
  };
};
