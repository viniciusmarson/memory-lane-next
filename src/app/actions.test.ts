import {
  createMemory,
  updateMemory,
  getMemory,
  getMemories,
  deleteMemory,
} from "./actions";

import { db, memories } from "@/db/schema";

jest.mock("@/db/schema", () => ({
  db: {
    insert: jest.fn(() => ({ values: jest.fn() })),
    update: jest.fn(() => ({
      set: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(undefined),
      }),
    })),
    select: jest.fn(() => ({
      from: jest.fn(),
      where: jest.fn(),
      orderBy: jest.fn(),
      limit: jest.fn(),
      offset: jest.fn(),
    })),
    delete: jest.fn(() => ({ where: jest.fn() })),
  },
  memories: {
    id: Symbol("id"),
    title: Symbol("title"),
    description: Symbol("description"),
    image: Symbol("image"),
    date: Symbol("date"),
  },
}));

describe("Memory Service", () => {
  const mockMemory = {
    title: "A trip to the mountains",
    description: "A wonderful experience",
    image: "https://example.com/image.jpg",
    date: "2024-03-19",
  };

  test("createMemory should insert a memory into the database", async () => {
    await createMemory(mockMemory);
    expect(db.insert).toHaveBeenCalledWith(memories);
  });

  test("createMemory should throw an error for invalid data", async () => {
    await expect(createMemory({ ...mockMemory, title: "" })).rejects.toThrow(
      "Invalid input"
    );
  });

  test("updateMemory should update a memory with valid data", async () => {
    await updateMemory(1, mockMemory);
    expect(db.update).toHaveBeenCalledWith(memories);
  });

  test("getMemory should return a memory if it exists", async () => {
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => [{ id: 1, ...mockMemory }],
      }),
    });

    const result = await getMemory(1);
    expect(result).toEqual({ id: 1, ...mockMemory });
  });

  test("getMemory should return null if no memory is found", async () => {
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        where: () => [],
      }),
    });

    const result = await getMemory(1);
    expect(result).toBeNull();
  });

  test("getMemories should return paginated memories", async () => {
    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => [{ count: 100 }],
    });

    (db.select as jest.Mock).mockReturnValueOnce({
      from: () => ({
        orderBy: () => ({
          limit: () => ({
            offset: () => [mockMemory],
          }),
        }),
      }),
    });

    const result = await getMemories(1, 10, "oldest");
    expect(result).toEqual({
      memories: [mockMemory],
      total: 100,
    });
  });

  test("deleteMemory should remove a memory", async () => {
    await deleteMemory(1);
    expect(db.delete).toHaveBeenCalledWith(memories);
  });
});
