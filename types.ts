export type Category = {
  id: string;
  name: string;
  image: string;
  createdAt: string;
};

export type Equipment = {
  id: string;
  name: string;
  price: number | string;
  producer: string;
  model: string;
  quantity: number;
  parameters?: Parameter[];
  imageUrl: string;
  categoryId: string;
  createdAt: string;
};
export type Parameter = {
  id: string;
  name: string;
  value: string;
  unit: string;
  equipmentId: string;
  createdAt: string;
};

export type Image = {
  id: string;
  url: string;
};
