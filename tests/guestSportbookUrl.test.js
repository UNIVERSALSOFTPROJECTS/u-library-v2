import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeGuestSportbookResponse as normalize } from "../src/js/guestSportbookUrl.js";

test("corrects guest prematch and live URLs while preserving response metadata", () => {
  for (const suffix of ["", "/live", "?lang=es", "/live?lang=es#view"]) {
    const response = { success: true, provider: "ank", payload: { url: "https://example.test/sportankAPI/bets286" + suffix, lang: "es" } };
    const result = normalize(response);
    assert.equal(result.payload.url, "https://example.test/sportankAPI/bets286.com" + suffix);
    assert.equal(result.success, true);
    assert.equal(result.payload.lang, "es");
    assert.equal(response.payload.url, "https://example.test/sportankAPI/bets286" + suffix);
    assert.deepEqual(normalize(result), result);
  }
});

test("preserves valid URLs and unrelated provider paths", () => {
  for (const url of ["https://example.test/sportankAPI/bets286.com/live", "https://example.test/sportankAPI/bets286other", "https://example.test/betsw3"]) {
    const response = { payload: { url } };
    assert.equal(normalize(response), response);
  }
});

test("handles absent or invalid response URLs without throwing", () => {
  for (const response of [null, undefined, {}, { payload: null }, { payload: {} }, { payload: { url: 123 } }]) {
    assert.equal(normalize(response), response);
  }
});
