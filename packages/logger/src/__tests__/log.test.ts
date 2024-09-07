import { LOGGER } from "..";

jest.spyOn(global.console, "log");

describe("@repo/logger", () => {
  it("prints a message", () => {
    LOGGER("hello");
    // eslint-disable-next-line no-console -- testing console
    expect(console.log).toBeCalledWith("LOGGER: ", "hello");
  });
});
