export interface Product {
  id: number;
  category_idFk: string;
  sub_category_idFk: string;
  category_name: string;
  sub_category_name: string;
  product_name: string;
  product_image: string;
  available_quantity: string;
  cost_price: string;
  selling_price: string;
  expiry_date: string;
  created_by: string;
  updated_by: null;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  description: string;
}

/**
 *           "category_idFk": "1",
      "sub_category_idFk": "2",
      "category_name": "mobile",
      "sub_category_name": "IPHONE",
      "product_name": "11 pro max",
      "product_image": "images/products/1761967845645791.upload.png",
      "available_quantity": "1",
      "cost_price": "12",
      "selling_price": "21",
      "expiry_date": "2023-04-19",
      "created_by": "5",
      "updated_by": null,
      "created_at": "2023-04-01T10:04:40.000000Z",
      "updated_at": null,
      "deleted_at": null
 */

// export const products: Product[] = [
//   {
//     id: 1,
//     name: 'Product 1',
//     image: 'https://placeimg.com/200/200/tech',
//     price: 10,
//     stock: 20,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//   },
//   {
//     id: 2,
//     name: 'Product 2',
//     image: 'https://placeimg.com/200/200/nature',
//     price: 20,
//     stock: 10,
//     description: 'Pellentesque euismod enim eu purus ullamcorper blandit.'
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     image: 'https://placeimg.com/200/200/animals',
//     price: 30,
//     stock: 5,
//     description: 'Vestibulum quis sapien in libero lobortis euismod sit amet at lacus.'
//   },
//   {
//     id: 4,
//     name: 'Product 1',
//     image: 'https://placeimg.com/200/200/tech',
//     price: 10,
//     stock: 20,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//   },
//   {
//     id: 5,
//     name: 'Product 2',
//     image: 'https://placeimg.com/200/200/nature',
//     price: 20,
//     stock: 10,
//     description: 'Pellentesque euismod enim eu purus ullamcorper blandit.'
//   },
//   {
//     id: 6,
//     name: 'Product 3',
//     image: 'https://placeimg.com/200/200/animals',
//     price: 30,
//     stock: 5,
//     description: 'Vestibulum quis sapien in libero lobortis euismod sit amet at lacus.'
//   },
//   {
//     id: 7,
//     name: 'Product 1',
//     image: 'https://placeimg.com/200/200/tech',
//     price: 10,
//     stock: 20,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//   },
//   {
//     id: 8,
//     name: 'Product 2',
//     image: 'https://placeimg.com/200/200/nature',
//     price: 20,
//     stock: 10,
//     description: 'Pellentesque euismod enim eu purus ullamcorper blandit.'
//   },
//   {
//     id: 9,
//     name: 'Product 3',
//     image: 'https://placeimg.com/200/200/animals',
//     price: 30,
//     stock: 5,
//     description: 'Vestibulum quis sapien in libero lobortis euismod sit amet at lacus.'
//   },
//   {
//     id: 10,
//     name: 'Product 1',
//     image: 'https://placeimg.com/200/200/tech',
//     price: 10,
//     stock: 20,
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//   },
//   {
//     id: 11,
//     name: 'Product 2',
//     image: 'https://placeimg.com/200/200/nature',
//     price: 20,
//     stock: 10,
//     description: 'Pellentesque euismod enim eu purus ullamcorper blandit.'
//   },
//   {
//     id: 12,
//     name: 'Product 3',
//     image: 'https://placeimg.com/200/200/animals',
//     price: 30,
//     stock: 5,
//     description: 'Vestibulum quis sapien in libero lobortis euismod sit amet at lacus.'
//   }
// ];
