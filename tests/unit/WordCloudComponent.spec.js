import { mount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import { BootstrapVue } from "bootstrap-vue";
import routes from "../../src/routes.js";
import SideBarComponent from "../../src/components/WordCloudContentComponent.vue";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(BootstrapVue);
let router, wrapper;

describe("WordCloudContentComponent", () => {
  beforeAll(async () => {
    router = new VueRouter({ routes });
    wrapper = mount(SideBarComponent, {
      localVue,
      router,
      data() {
        return {
          countDown: false,
          timerValue: 0,
          previousTimerValue: 1,
          intervalTimer: null,
          timeLeft: "00:00",
          endTime: "0",
          time: [
            {
              display: String,
              secs: Number,
            },
          ],
          wordCloudHtml: null,
        };
      },
    });
  });

  it("Should show the bite description", () => {
    expect(wrapper.find("#description").exists()).toBe(true);
  });

  it("Should not show the countdown when rendering.", () => {
    expect(wrapper.find("#display-countdown").exists()).toBe(false);
  });

  it("Should show the countdown after setting a value", async () => {
    await wrapper.setData({ countDown: true });
    expect(wrapper.find("#display-countdown").exists()).toBe(true);
  });

  it("Can set a timer value between 1-60 minutes. This value should be displayed in the countdown", async () => {
    await wrapper.setData({ countDown: false });
    expect(wrapper.find("#input-timer").setValue("2"));
    await wrapper.setData({ countDown: true });
    expect(wrapper.find("#value").text()).toBe("2");
  });

  it("Should not show the wordcloud when rendering.", () => {
    expect(wrapper.find("#display-wordcloud").exists()).toBe(false);
  });

  it("Should display the wordcloud after starting the exercise", async () => {
    await wrapper.setData({ countDown: true });
    await wrapper.setData({
      wordCloudHtml:
        "https://learned-collaborative-bites-dev.s3.eu-central-1.amazonaws.com/wordcloud/289.html",
    });
    expect(wrapper.find("#display-wordcloud").exists()).toBe(true);
  });
});
