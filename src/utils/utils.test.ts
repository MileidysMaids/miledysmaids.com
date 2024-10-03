import { calculateEstimate } from "./calculateEstimate";

describe("utils", () => {
  it("[calculateEstimate] should return correct estimate", () => {
    const estimate = calculateEstimate({});

    expect(estimate).toStrictEqual({
      total: 106,
      taxes: 6,
      subtotal: 100,
      discount: 0,
      before_discount: 100,
    });
  });
});
