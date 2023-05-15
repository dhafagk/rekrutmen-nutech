import { Table } from "@/components";
import { AuthorizedLayout } from "@/layout";
import { ProductService } from "@/services";
import { ProducStore } from "@/stores/product.store";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import React from "react";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  const productService = new ProductService();
  const page = ProducStore.getState().page;

  try {
    await queryClient.prefetchQuery({
      queryKey: ["Products"],
      queryFn: () => productService.fetchProducts(page),
    });
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Product = () => {
  return (
    <AuthorizedLayout title="Product">
      <Table />
    </AuthorizedLayout>
  );
};

export default Product;
