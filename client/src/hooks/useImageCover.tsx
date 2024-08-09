import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import {
  getImageCoverById,
  updateImageCover,
  createImageCover,
} from "@/api/imageCover";

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

  const updateImageCoverMutation = useMutation({
    mutationFn: (data) => updateImageCover(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["imageCover"] });
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const createImageCoverMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      createImageCover(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["imageCover"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    // addProductMutation,
    useGetImageCoverById,
    createImageCoverMutation, // deleteProductMutation,
    updateImageCoverMutation,
  };
};
