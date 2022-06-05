import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

import AdminPostForm from "@/components/Admin/AdminPostForm";

describe("Test Admin Post Form Methods", () => {
  const wrapper = mount(AdminPostForm, {
    router,
    localVue
  });

  it("test save method", () => {
    const saveBtn = wrapper.find(".save-btn");
    saveBtn.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("submit");
  });

  it("test cancel method", async () => {
    const cancelBtn = wrapper.find(".cancel-btn");
    await cancelBtn.trigger("click");
    expect(wrapper.vm.$route.path).toBe("/admin");
  });
});

describe("test Admin Post Form Props", () => {
  const wrapper = shallowMount(AdminPostForm, {
    router,
    localVue,
    propsData: {
      post: {
        id: "1",
        title: "Test Post"
      }
    }
  });

  it("test editedPost data", () => {
    expect(wrapper.vm.$data.editedPost.id).toBe("1");
  });

  it("test title input", async () => {
    const titleInp = wrapper.find(".title-input");
    expect(titleInp.html().includes("Test Post")).toBeTruthy();
  });
});
