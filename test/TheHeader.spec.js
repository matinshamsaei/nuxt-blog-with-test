import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

import TheHeader from "@/components/Navigation/TheHeader";

describe("test The Header", () => {
  const wrapper = mount(TheHeader, {
    localVue,
    router,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  });

  wrapper.vm.$emit("sidenavToggle");

  it("test sidenavToggle emit", () => {
    expect(wrapper.emitted().sidenavToggle).toBeTruthy();
  });

  it("test navigation-items existence", () => {
    expect(wrapper.find(".navigation-items").exists()).toBe(true);
  });

  it("test navigation-items existence", async () => {
    await wrapper.find(".logo a").trigger("click");

    expect(wrapper.vm.$route.path).toBe("/");
  });
});
