export type Category = {
  id: string;
  name: string;
  image: string;
  createdAt: string;
};

export type Equipment = {
  id: string;
  name: string;
  price: string;
  producer: string;
  model: string;
  quantity: number;
  parameters: Parameter[];
  image: string;
  category: string;
  createdAt: string;
};
export type Parameter = {
  id: string;
  name: string;
  value: string;
  unit: string;
  createdAt: string;
};

export type Image = {
  id: string;
  url: string;
};
