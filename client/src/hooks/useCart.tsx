"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getCart, updateCart, createCart } from "../api/cart";
import toast from "react-hot-toast";

export const useCart = () => {
  const queryClient = useQueryClient();

  const useGetCart = (id: number) =>
    useQuery({
      queryKey: ["cart", id],
      queryFn: () => getCart(id),
    });

  const addCartMutation = useMutation({
    mutationFn: (data) => createCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Producto Añadido");
    },
  });

  const updateCartMutation = useMutation({
    mutationFn: (data) => updateCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    addCartMutation,
    useGetCart,
    updateCartMutation,
    // deleteProductMutation,
    // updateProductMutation,
  };
};
