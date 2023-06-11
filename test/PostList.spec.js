import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils";
import VueRouter from "vue-router";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

import PostList from "@/components/Posts/PostList";

describe("test Post List", () => {
  const wrapper = mount(PostList, {
    localVue,
    router,
    stubs: {
      NuxtLink: RouterLinkStub
    },
    propsData: {
      isAdmin: true,
      posts: [
        {
          id: "5",
          thumbnail:
            "https://cdn.mos.cms.futurecdn.net/8Zw7hWD5ZaquyftsRbEmof.jpg",
          title: "hosein",
          previewText: "best post"
        }
      ]
    }
  });

  it("test h2 text as title", () => {
    expect(wrapper.find("h2").text()).toEqual("hosein");
  });

  it("test p text as preview text", () => {
    expect(wrapper.find("p").text()).toEqual("best post");
  });
});
