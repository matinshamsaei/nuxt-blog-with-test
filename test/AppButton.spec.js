import { mount } from "@vue/test-utils";

import AppButton from "@/components/UI/AppButton";

describe("test App Button", () => {
  const wrapper = mount(AppButton, {
    propsData: {
      btnStyle: "inverted"
    },
    slots: {
      default: "Test Button"
    }
  });

  const btn = wrapper.find(".button");

  it("test button class prop", () => {
    expect(btn.classes()).toContain("inverted");
  });

  it("test text slot for button", async () => {
    expect(btn.html()).toContain("Test Button");
  });
});
