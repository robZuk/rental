export const isAdmin = (userId?: string | null) => {
  return true;
  // return userId === process.env.NEXT_PUBLIC_ADMIN_ID;
};
