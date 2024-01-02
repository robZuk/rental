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
  reservationItems?: ReservationItem[];
  imageUrl: string;
  categoryId: string;
  createdAt: string;
};

export type CartItem = {
  userId: string;
  equipmentId: string;
  name: string;
  price: number | string;
  image: string;
  dates: Date[];
  initialDays: Date[];
  createdAt: Date;
};

export type Reservation = {
  id: string;
  equipmentId: string;
  userId: string;
  reservationItems: ReservationItem[];
  // dates: Date[];
  isPayed: boolean;
  createdAt: string;
};

export type ReservationItem = {
  id: string;
  reservationId: string;
  equipmentId: string;
  dates: DateItem[];
};

export type DateItem = {
  id: string;
  reservationItemId: string;
  date: string;
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

// export type Image = {
//   id: string;
//   url: string;
// };
