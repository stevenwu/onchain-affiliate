// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const cart = input.cart;
  if (cart.has_referral?.value === "true") {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [
        {
          targets: [{ orderSubtotal: { excludedVariantIds: [] }}],
          message: "Onchain referral discount - 10% off!",
          value: {
            percentage: {
              value: "10"
            }
          }
        }
      ]
    }
  } else {
    return EMPTY_DISCOUNT;
  }
};
