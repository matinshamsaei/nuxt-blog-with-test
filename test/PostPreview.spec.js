import { mount, RouterLinkStub } from '@vue/test-utils'
import PostPreview from '@/components/Posts/PostPreview'
// import VueRouter from 'vue-router'

// const localVue = createLocalVue()

// so u can't mock $route and $router in cmp mock
// localVue.use(VueRouter)
// const router = new VueRouter()

const $route = {
    path: '/posts/2',

    params: {
        id: 2,
    },
};

describe('mock $route', () => {
    const wrapper = mount(PostPreview, {
        // localVue,
        // router,

        // stub nuxt link for vue warn (unknown custom element)
        // WITH TWO WAYS: 
        // 1
        stubs: {
            NuxtLink: RouterLinkStub
        },
        // 2
        // stubs: ['nuxt-link'],

        mocks: {
            $route
        },

        propsData: {
            isAdmin: false,
            id: "2",
            thumbnail: "",
            title: "matin",
            previewText: ""
        }
    });

    it('correct computed link id', () => {
        expect(wrapper.vm.postLink).toEqual("/posts/2");
    });

    it('check route path and id param', () => {
        expect(wrapper.vm.$route.path).toEqual('/posts/2');
        expect(wrapper.vm.$route.params.id).toEqual(2);
    })
})
