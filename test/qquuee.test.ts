import Q from "../src/index";

const q = new Q();
const sleep = <T>(value: T, time: number) =>
  new Promise<T>(resolve => setTimeout(() => resolve(value), time));

describe("q.add", () => {
  it("should return value", async () => {
    expect(await q.add(() => 0)).toEqual(0);
  });

  it("should return values in order they are added", async () => {
    const response = await Promise.all([
      q.add(() => sleep(0, 1000)),
      q.add(() => sleep(1, 500)),
    ]);

    expect(response).toEqual([0, 1]);
  });
});
