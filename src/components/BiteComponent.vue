<template>
  <div>
    <router-view v-bind:answer="answer"></router-view>

    <div id="main__content" v-if="biteData">
      <div id="main__content__wrapper">
        <div id="bite__status" class="bite__status" v-if="isDraft">
          <p>This is a draft bite</p>
        </div>

        <div id="main__content__info">
          <h1 class="title__label">{{ biteData.title }}</h1>

          <div class="content__info" v-if="biteData.subtype !== 'wordcloud'">
            <div class="content__info__field">
              <img
                src="https://s3.eu-central-1.amazonaws.com/images-develop/email-images/clock-icon.svg"
                class="content__info__image"
              />
              <label class="content__info__label content__info__duration"
                >{{ biteData.durationMins }} min</label
              >
            </div>
            <div class="content__info__field">
              <img
                src="https://s3.eu-central-1.amazonaws.com/images-develop/web-app-images/star-circle.svg"
                class="content__info__image"
              />
              <label class="content__info__label content__info__rating">{{
                rate
              }}</label>
            </div>
          </div>

          <h2
            class="description__label"
            v-if="biteData.subtype !== 'wordcloud'"
          >
            {{ biteData.description }}
          </h2>
        </div>

        <div class="line" v-if="biteData.subtype !== 'wordcloud'"></div>

        <bite-content-component
          v-bind:type="this.biteData.type"
          v-bind:details="this.biteData.details"
          v-bind:subtype="this.biteData.subtype"
          v-bind:description="this.biteData.description"
        >
        </bite-content-component>
      </div>
    </div>

    <app-footer
      v-if="showFooter()"
      :isCompleted="biteData.isCompleted"
      :complete="changeCompleteState"
    ></app-footer>
  </div>
</template>

<script>
import _ from "lodash";
import BiteContentComponent from "./BiteContentComponent";
import AppNav from "./AppNavigationComponent";
import AppFooter from "./FooterComponent";
import { requestAPI } from "../js/LearnedAPI";
import { bitePath, journeyPath } from "../js/APIpaths";
import {
  getEmployeeId,
  getCompanyCode,
} from "../js/authentication/AuthService";
import {
  completeCurrentBite,
  uncompleteCurrentBite,
  sendRating,
} from "../js/UserService";

export default {
  name: "bite",
  components: { AppFooter, AppNav, BiteContentComponent },
  data: function () {
    return {
      biteData: null,
      journeyData: null,
      startTime: new Date(),
      sessionInterval: null,
      allowReactionToMouseMovement: false,
    };
  },
  computed: {
    rate: function () {
      const rate = this.biteData.rate;
      return rate ? `Rating: ${rate}` : "Not rated yet!";
    },
    isDraft: function () {
      return this.biteData.status === "draft";
    },
  },
  watch: {
    biteData: function (val) {
      const { id, type } = val;
      this.gaOpen(id, type);
      this.handleAutocompletion();
    },
  },
  methods: {
    setData: function (bite, journey) {
      this.biteData = bite;
      this.journeyData = journey;
    },
    basePath: function () {
      return `/journeys/${this.$route.params.journeyId}/bites/${this.$route.params.biteId}`;
    },
    getParams() {
      return {
        ...this.$route.params,
        employeeId: getEmployeeId(),
        companyCode: getCompanyCode(),
      };
    },
    answer: function (value) {
      const component = this.$route.path.slice(
        this.$route.path.lastIndexOf("/") + 1
      );
      switch (component) {
        case "complete-action": {
          this.changeCompleteState(value);
          const name = value ? "rate" : "bite";
          this.$router.push({ name });
          break;
        }
        case "rate": {
          if (value) this.rateBite(parseInt(value));
          this.$router.back();
          break;
        }
        case "feedback": {
          this.$router.push({ name: "bite" });
          break;
        }
      }
    },
    handleAutocompletion: function () {
      if (this.isDraft || this.biteData.isCompleted) return;
      switch (this.biteData.type) {
        case "ping":
          this.autocompleteBite();
          break;
        case "survey":
          break;
        default:
          this.setAutocompleteAndPopup();
          break;
      }
    },
    showRatingIfAutocompleted: function (event) {
      if (this.allowReactionToMouseMovement) {
        this.$router.push({ name: "rate" });
        this.allowReactionToMouseMovement = false;
      }
    },
    changeCompleteState: function (newState) {
      this.emitCompletionStatus(this.biteData.id, newState);
      this.biteData.isCompleted = newState;
      if (newState) {
        completeCurrentBite(this.getParams());
        this.gaComplete();
        this.$router.push({ name: "rate" });
      } else {
        uncompleteCurrentBite(this.getParams());
      }
    },

    setAutocompleteAndPopup: function () {
      const autocompleteTimeoutRatio = 0.1;
      const popUpTimeoutRatio = 2.0;
      const timeToCompleteBite = this.biteData.durationMins;
      setTimeout(
        function () {
          this.autocompleteBite();
        }.bind(this),
        autocompleteTimeoutRatio * timeToCompleteBite * 60000
      );
      setTimeout(
        function () {
          this.showRatingIfAutocompleted();
        }.bind(this),
        popUpTimeoutRatio * timeToCompleteBite * 60000
      );
      setTimeout(
        function () {
          this.allowReactionToMouseMovement = true;
        }.bind(this),
        timeToCompleteBite * 60000
      );
    },

    autocompleteBite: function () {
      return completeCurrentBite(this.getParams()).then(() => {
        this.emitCompletionStatus(this.biteData.id, true);
        this.biteData.isCompleted = true;
        this.gaAutocomplete();
      });
    },
    rateBite: function (value) {
      sendRating(this.getParams(), value);
      this.gaRating(value);
    },
    showFooter: function () {
      return (
        this.biteData &&
        this.biteData.type !== "survey" &&
        this.biteData.status === "published" &&
        this.biteData.subtype !== "wordcloud"
      );
    },
    gaOpen: function (id, type) {
      this.$ga.event({
        eventCategory: type,
        eventAction: "desktop_open",
        eventLabel: this.$route.path,
      });
    },
    gaComplete: function () {
      this.$ga.event({
        eventCategory: this.biteData.type,
        eventAction: "desktop_complete",
        eventLabel: this.basePath(),
      });
    },
    gaAutocomplete: function () {
      this.$ga.event({
        eventCategory: this.biteData.type,
        eventAction: "desktop_autocomplete",
        eventLabel: this.basePath(),
      });
    },
    gaRating: function (givenRating) {
      this.$ga.event({
        eventCategory: this.biteData.type,
        eventAction: `rated ${givenRating}`,
        eventLabel: this.basePath(),
        eventValue: givenRating,
      });
    },
    emitCompletionStatus(biteId, newStatus) {
      this.$root.$emit("changed_completion_status", biteId, newStatus);
    },
  },

  beforeRouteEnter: beforeRouteEnter,
  beforeRouteUpdate(to, from, next) {
    beforeRouteEnter(to, from, (fn) =>
      Promise.resolve(fn(this)).then(() => next(), next)
    );
  },

  beforeDestroy() {
    clearInterval(this.sessionInterval);
  },
};

function beforeRouteEnter(to, from, next) {
  const params = {
    ...to.params,
    employeeId: getEmployeeId(),
    companyCode: getCompanyCode(),
  };
  const bite = bitePath(params);
  const journey = journeyPath(params);

  Promise.all([requestAPI(bite), requestAPI(journey)])
    .then(([bite, journey]) => {
      next((vm) => {
        vm.setData(bite, journey);
        if (localStorage.getItem("trackingRef")) {
          requestAPI(
            `/companies/${params.companyCode}/bites/${params.biteId}/sessions`,
            "PUT",
            {
              startTime: vm.startTime,
              endTime: new Date(),
              trackingRef: localStorage.getItem("trackingRef"),
            }
          );
        }
        vm.sessionInterval = setInterval(() => {
          requestAPI(
            `/companies/${params.companyCode}/bites/${params.biteId}/sessions`,
            "PUT",
            {
              startTime: vm.startTime,
              endTime: new Date(),
            }
          );
        }, 2000);
      });
    })
    .catch((error) => {
      if (_.get(error, "response.status") === 401) {
        next({
          name: "login",
          query: { redirect: to.fullPath },
        });
      } else {
        next({
          name: "error",
          query: {
            status: _.get(error, "response.status"),
          },
        });
      }
    });
}
</script>

<style lang="scss">
@import "../scss/styles.scss";

#main {
  &__content {
    min-height: 100%;
    margin-bottom: -$footer-height !important;
    width: $main-content-width;
    padding-left: 20px;
    &:after {
      content: "";
      display: inline-flex;
      height: $footer-height + 20px;
      width: 100%;
    }

    &__wrapper {
      width: 100%;
      height: 100%;
      padding-top: 84px;
    }

    &__info {
      width: 100%;
      padding-top: 34px;
      margin: 0 auto;
    }
  }
}

#bite__status {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #ffca00;
  @extend %font-primary;
  text-align: center;
  color: #ffffff;
}

h1 {
  @extend %font-primary;
}

h2 {
  @extend %font-secondary;
}

.content__info {
  margin: 13px auto;
  display: inline-block;

  &__field {
    display: inline;
    margin-right: 29px;
  }

  &__field:last-child {
    margin-right: 0;
  }

  &__label {
    @extend %font-secondary;
    line-height: 25px;
    text-align: center;
  }

  &__image {
    width: 14px;
    height: 14px;
    margin-right: 7px;
    vertical-align: middle;
  }
}

.description__label {
  overflow-wrap: break-word;
  max-width: $content-width;
}
</style>
