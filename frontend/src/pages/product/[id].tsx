import { Button } from "@/components";
import { useGetProduct, useGetProducts } from "@/hooks/useProduct";
import { AuthorizedLayout } from "@/layout";
import { ProductService } from "@/services";
import { ProducStore } from "@/stores/product.store";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetStaticPaths } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

// export async function getStaticPaths() {
//   const queryClient = new QueryClient();
//   const productService = new ProductService();
//   const page = ProducStore.getState().page;
//   //   const products = async () => {
//   //     await queryClient.prefetchQuery({
//   //       queryKey: ["Products"],
//   //       queryFn: () => productService.fetchProducts(page),
//   //     });
//   //   };

//   //   const products: any = await queryClient.prefetchQuery({
//   //     queryKey: ["Products"],
//   //     queryFn: () => productService.fetchProducts(page),
//   //   });

//   //   try {
//   //     products = await queryClient.prefetchQuery({
//   //       queryKey: ["Products"],
//   //       queryFn: () => productService.fetchProducts(page),
//   //     });
//   //   } catch (error) {
//   //     console.log(error);
//   //   }

//   console.log(products);

//   const paths = products?.map((product: any) => ({
//     params: { id: product.id.toString() },
//   }));

//   //   const paths = Array.from({ length: 10 }, (_, index) => ({
//   //     params: {
//   //       id: (index + 1).toString(),
//   //     },
//   //   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

export async function getServerSideProps(context: any) {
  const queryClient = new QueryClient();
  const productService = new ProductService();

  const { params } = context;

  let isError = false;

  try {
    await queryClient.prefetchQuery(["Product", params.id], () =>
      productService.fetchProduct(params.id)
    );
  } catch (error) {
    isError = true;
    console.log(error);
  }

  return {
    props: {
      isError,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useGetProduct(id, true);
  console.log(data);

  if (isError) return "Not found";
  return (
    <AuthorizedLayout title="Produk Detail">
      {isLoading ? (
        <>Loading...</>
      ) : (
        <>
          <div className="flex flex-col gap-5">
            <Image
              src={data.image_url}
              alt="gambar_produk"
              width={70}
              height={70}
            />
            <div>Nama Produk : {data?.title}</div>
            <div>Harga Beli : {data?.buying_price}</div>
            <div>Harga Jual : {data?.selling_price}</div>
            <div>Stok : {data?.description}</div>
            <Button
              type="button"
              text="Kembali"
              onClick={() => router.push("/product")}
            />
          </div>
        </>
      )}
    </AuthorizedLayout>
  );
};

export default ProductDetail;
