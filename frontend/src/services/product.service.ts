import AdapterService from "./adapter.service";

export default class ProductService extends AdapterService {
  constructor() {
    super();
  }

  async fetchProducts(page: number) {
    try {
      return this.sendGetRequest("/products?page=" + page);
    } catch (error: any) {
      throw new Error("ProductService.fetchProducts: " + error?.message);
    }
  }

  async fetchProduct(id: any) {
    try {
      return this.sendGetRequest("/products/" + id);
    } catch (error: any) {
      throw new Error("ProductService.fetchProduct: " + error?.message);
    }
  }

  async fetchAllProducts(perPage: number = 0) {
    try {
      return this.sendGetRequest("/products/view/all?perPage=" + perPage);
    } catch (error: any) {
      throw new Error("ProductService.fetchAllProducts: " + error?.message);
    }
  }

  async searchProducts(perPage: number = 10, search: string) {
    try {
      return this.sendGetRequest(
        `/products/view/search?perPage=${perPage}&search=${search}`
      );
    } catch (error: any) {
      throw new Error("ProductService.searchProducts: " + error?.message);
    }
  }

  async addProduct(body: any) {
    try {
      return this.sendPostFormDataRequest("/products", body, null);
    } catch (error: any) {
      throw new Error("ProductService.addProduct: " + error?.message);
    }
  }

  async editProduct(formEdit: any) {
    const { id, ...body } = formEdit;
    console.log(id);
    console.log(body);
    try {
      return this.sendPutFormDataRequest(`/products/${id}`, body, null);
    } catch (error: any) {
      throw new Error("ProductService.editProduct: " + error?.message);
    }
  }

  async deleteProduct(id: any) {
    try {
      return this.sendDeleteRequest(`/products/${id}`);
    } catch (error: any) {
      throw new Error("ProductService.deleteProduct: " + error?.message);
    }
  }
}
