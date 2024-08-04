"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getImageCoverById } from "@/api/imageCover";

export const useImageCover = () => {
  const queryClient = useQueryClient();

  const useGetImageCoverById = (id: number) =>
    useQuery({
      queryKey: ["imageCover"],
      queryFn: () => getImageCoverById(id),
    });

  //   const useGetProductById = (id) =>
  //     useQuery({
  //       queryKey: ["products"],
  //       queryFn: () => getProductById(id),
  //     });

  return {
    // addProductMutation,
    useGetImageCoverById,
    // useGetProductById,
    // deleteProductMutation,
    // updateProductMutation,
  };
};
