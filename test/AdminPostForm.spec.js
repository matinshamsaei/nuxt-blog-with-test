import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

import AdminPostForm from "@/components/Admin/AdminPostForm";

describe("test Admin Post Form", () => {
  const wrapper = mount(AdminPostForm, {
    router,
    localVue,
    propsData: {
      post: {
        id: "1",
        title: "Test Post"
      }
    }
  });

  it("test editedPost Data", () => {
    expect(wrapper.vm.$data.editedPost.id).toBe("1");
  });

  // it("test save method", () => {
  //   wrapper.find(".save-btn").trigger("click");
  //   expect(wrapper.emitted()).toHaveProperty("submit");
  // });

  it("test cancel method", async () => {
    const cancelBtn = wrapper.find(".cancel-btn");

    await cancelBtn.trigger("click");

    expect(wrapper.vm.$route.path).toBe("/admin");
  });
});
