import {
  mount,
  shallowMount,
  createLocalVue,
  RouterLinkStub
} from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

import AdminPostForm from "@/components/Admin/AdminPostForm";
import AppButton from "@/components/UI/AppButton";
import AppControlInput from "@/components/UI/AppControlInput";

describe("Test Admin Post Form Methods", () => {
  const wrapper = mount(AdminPostForm, {
    router,
    localVue,
    stubs: {
      NuxtLink: RouterLinkStub
    }
  });

  it("test AppButton existence", () => {
    expect(wrapper.contains(AppButton)).toBe(true);
  });

  it("test AppControlInput existence", () => {
    expect(wrapper.contains(AppControlInput)).toBe(true);
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
    stubs: {
      NuxtLink: RouterLinkStub
    },
    propsData: {
      post: {
        id: "1",
        title: "Test Post",
        author: "admin",
        content: "sample content",
        previewText: "sample text"
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

  it("test author input", async () => {
    const authorInp = wrapper.find(".author-input");
    expect(authorInp.html().includes("admin")).toBeTruthy();
  });

  it("test content input", async () => {
    const contentInp = wrapper.find(".content-input");
    expect(contentInp.html().includes("sample content")).toBeTruthy();
  });

  it("test previewText input", async () => {
    const previewTextInp = wrapper.find(".preview-text-input");
    expect(previewTextInp.html().includes("sample text")).toBeTruthy();
  });
});
