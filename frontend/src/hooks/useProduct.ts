import { ProductService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

const productService = new ProductService();

const useGetProducts = (page: number) => {
  return useQuery(
    ["Products", page],
    () => productService.fetchProducts(page),
    {
      select: (res) => res.data.data.data,
      keepPreviousData: true,
    }
  );
};

const useGetProduct = (id: any, show?: boolean) => {
  return useQuery(["Product", id], () => productService.fetchProduct(id), {
    select: (res) => res.data.data,
    enabled: !!show && !!id,
  });
};

const useGetAllProducts = (perPage: number = 0) => {
  return useQuery(
    ["Products"],
    () => productService.fetchAllProducts(perPage),
    {
      select: (res) => res.data.data.data.length,
    }
  );
};

const useSearchProducts = (perPage: number = 10, search: string) => {
  return useQuery(
    ["Products", search],
    () => productService.searchProducts(perPage, search),
    {
      select: (res) => res.data.data.data,
      enabled: !!search,
    }
  );
};

const useAddProduct = () => {
  return useMutation((body) => {
    return productService.addProduct(body);
  });
};

const useEditProduct = () => {
  return useMutation((formEdit) => {
    return productService.editProduct(formEdit);
  });
};

const useDeleteProduct = () => {
  return useMutation((id) => productService.deleteProduct(id));
};

export {
  useGetProducts,
  useGetProduct,
  useGetAllProducts,
  useSearchProducts,
  useAddProduct,
  useEditProduct,
  useDeleteProduct,
};
