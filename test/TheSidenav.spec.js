import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

import TheSidenav from "@/components/Navigation/TheSidenav";

describe("test The Sidenav", () => {
  const wrapper = mount(TheSidenav, {
    localVue,
    router,
    stubs: {
      NuxtLink: RouterLinkStub
    },
    propsData: {
      show: true
    }
  });

  it("test nav-list click and close emit", async () => {
    await wrapper.find(".nav-list").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("test sidenav-backdrop click and close emit", async () => {
    await wrapper.find(".sidenav-backdrop").trigger("click");
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
