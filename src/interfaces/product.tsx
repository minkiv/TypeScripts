interface IProduct {
  _id: any;
  name: string;
  price: number;
  images: string;
  description: string;
  categoryId: { _id: any; name: string; products: [string] };
}

export default IProduct;
