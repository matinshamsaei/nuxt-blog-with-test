import { mount } from "@vue/test-utils";
import MessageList from "@/components/TestBook/MessageList";
import Message from "@/components/TestBook/Message";

// WITHOUT VUE-TEST-UTILS
// describe("App.test.js", () => {
//     let cmp, vm;
//     beforeEach(() => {
//         cmp = Vue.extend(App); // Create a copy of the original component
//         vm = new cmp({
//             data: {
//                 // Replace data value with this fake data
//                 messages: ["Cat"]
//             }
//         }).$mount(); // Instances and mounts the component
//     });
//     it('equals messages to ["Cat"]', () => {
//         expect(vm.messages).toEqual(["Cat"]);
//     });
// });

// WITH VUE-TEST-UTILS JUST MESSAGELIST CMP
describe("App.test.js", () => {
    let cmp;

    beforeEach(() => {
        cmp = mount(MessageList, {
            // Create a copy of the original component
            propsData: {
                // Replace data value with this fake data
                messages: ["Cat"]
            }
        });
    });

    it('has received ["Cat"] as the message property', () => {
        expect(cmp.vm.messages).toEqual(["Cat"]);
    });

    it("has the expected html structure", () => {
        expect(cmp.element).toMatchSnapshot();
    });

    it("div span text", () => {
        // cmp.find(".matin span").element  ===>  <span>content</span>
        expect(cmp.find(".matin span").text()).toEqual("content")
    })

    it("Message cmp is exist", () => {
        expect(cmp.findComponent(Message).exists()).toBe(true)
        // expect(cmp.find(".message").exists()).toBe(true)
    })

    it("Message cmp has message class", () => {
        // expect(cmp.findComponent(Message).attributes().class).toBe("message")
        expect(cmp.findComponent(Message).classes()).toContain("message")
    })

    it("Message cmp has style margin-top: 10px", () => {
        expect(cmp.findComponent(Message).attributes().style).toBe("margin-top: 10px;")
    })
});

