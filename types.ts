export type Category = {
  id: string;
  name: string;
  imageUrl: string;
  equipments: Equipment[];
  // createdAt: string;
};

export type Equipment = {
  id: string;
  name: string;
  price: number;
  producer: string;
  model: string;
  quantity: number;
  parameters: Parameter[];
  reservationItems?: ReservationItem[];
  imageUrl: string;
  categoryId: string;
  // createdAt: string;
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
  userId: string;
  reservationItems: ReservationItem[];
  isPayed: boolean;
  createdAt: string;
};

export type ReservationItem = {
  id: string;
  reservationId: string;
  equipmentId: string;
  dates: DateItem[];
  equipmentPrice: number | string;
  // value: number | string;
};

export type ReservationItemDetails = {
  id: string;
  // reservationId: string;
  // equipmentId: string;
  dates: DateItem[];
  equipmentPrice: number | string;
  equipmentName: string;
  amount: number | string;
};

export type DateItem = {
  id: string;
  reservationItemId: string;
  date: string;
  // createdAt: string;
};

export type Parameter = {
  id: string;
  name: string;
  value: string;
  unit: string;
  equipmentId: string;
  createdAt: string;
};

export type CustomerClient = {
  id: string;
  userId: string;
  email: string;
  imageUrl: string;
  firstName: string;
  lastName: string;
};

//table admin columns
export type ReservationsColumn = {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  isPayed: string;
  amount: number | string;
  createdAt: string;
};

export type ReservationColumn = {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userImageUrl: string;
  userEmail: string;
  reservationItems: ReservationItem[];
  isPayed: boolean;
  amount: number | string;
  createdAt: string;
};

export type EquipmentColumn = {
  id: string;
  name: string;
  price: number | string;
  producer: string;
  model: string;
  quantity: number;
  parameters: Parameter[];
  imageUrl: string;
  categoryId: string;
};
export type EquipmentsColumn = {
  id: string;
  name: string;
  price: number | string;
  producer: string;
  model: string;
  imageUrl: string;
  categoryId: string;
};

export type CategoriesColumn = {
  id: string;
  name: string;
  imageUrl: string;
  // createdAt: string;
};

//user columns
export type UserReservationsColumn = {
  id: string;
  isPayed: string;
  amount: number | string;
  createdAt: string;
};
