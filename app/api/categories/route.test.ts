import { NextResponse } from "next/server";
import { POST } from "./route";

describe("POST /api/categories", () => {
  it("should return 403 if unauthenticated", async () => {
    const req = {} as Request;

    const res = await POST(req);

    expect(res.status).toBe(403);
    expect(res.statusText).toBe("Unauthenticated");
  });

  it("should return 400 if name is missing", async () => {
    const req = {
      json: async () => ({
        imageUrl: "image.jpg",
      }),
    } as unknown as Request;

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(res.statusText).toBe("Name is required");
  });

  it("should return 400 if imageUrl is missing", async () => {
    const req = {
      json: async () => ({
        name: "Category 1",
      }),
    } as unknown as Request;

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(res.statusText).toBe("Image is required");
  });

  it("should create category and return it", async () => {
    const req = {
      json: async () => ({
        name: "Category 1",
        imageUrl: "image.jpg",
      }),
      auth: () => ({
        userId: "user123",
      }),
    } as unknown as Request;

    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("imageUrl");
  });
});
