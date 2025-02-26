interface Product {
    name: string;
    quantity: number;
    singleBuyingPrice: number;
    singleSellingPrice: number;
    totalPrice: number;
    totalProfit: number;
  }
  interface PopulatedSell {
    products: Product[];
  }

  export default PopulatedSell