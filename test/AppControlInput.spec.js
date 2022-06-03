import { mount } from "@vue/test-utils";

import AppControlInput from "@/components/UI/AppControlInput";

describe("test App ControlInput", () => {
  const wrapper = mount(AppControlInput, {
    propsData: {
      controlType: "textarea",
      value: "Hi there"
    },
    slots: {
      default: "Test Textarea Content"
    }
  });

  const label = wrapper.find("label");
  it("test text slot for label", async () => {
    expect(label.text()).toBe("Test Textarea Content");
  });

  const textarea = wrapper.find("textarea");
  it("test textarea value", async () => {
    expect(textarea.element.value).toBe("Hi there");
  });

  it("test textarea rows", async () => {
    expect(textarea.attributes("rows")).toBe("10");
  });
});
