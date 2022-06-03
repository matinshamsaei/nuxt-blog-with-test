import { mount, RouterLinkStub } from "@vue/test-utils";

import PostPreview from "@/components/Posts/PostPreview";

describe("test Post Preview", () => {
  const wrapper = mount(PostPreview, {
    stubs: {
      NuxtLink: RouterLinkStub
    },
    propsData: {
      isAdmin: false,
      id: "2",
      thumbnail: "https://cdn.mos.cms.futurecdn.net/8Zw7hWD5ZaquyftsRbEmof.jpg",
      title: "matin",
      previewText: "best post"
    }
  });

  it("test computed return for link id and isAdmin Prop", () => {
    expect(wrapper.vm.postLink).toEqual("/posts/2");
  });

  it("test h2 text as title", () => {
    expect(wrapper.find("h2").text()).toEqual("matin");
  });

  it("test p text as preview text", () => {
    expect(wrapper.find("p").text()).toEqual("best post");
  });
});
