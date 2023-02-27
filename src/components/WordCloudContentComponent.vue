<template>
  <div class="bite__content__wordcloud">
    <p class="description">
      <span id="description" v-html="this.description"></span>
    </p>
    <div>
      <div id="display-countdown" v-if="showCountDown">
        <div
          id="value"
          :class="[
            'timeLeftClass',
            timerValue === '00:00' ? 'timeUpColor' : 'timeRunColor',
          ]"
        >
          <span>{{ timerValue }}</span>
        </div>
      </div>
      <div class="setTimer" v-if="!showCountDown">
        <label class="setTimer__label">Set timer</label>
        <b-form-input
          id="input-timer"
          class="setTimer__field"
          type="number"
          min="1"
          max="60"
          step="1"
          placeholder="0"
          @keypress="isNumberKey($event)"
          v-model="timerValue"
        >
        </b-form-input>
        <label class="setTimer__label">min</label>
      </div>
    </div>
    <Button
      id="start-button"
      class="main__button"
      v-on:click="startRound()"
      :disabled="buttonDisabled"
      >{{ roundLabel }}</Button
    >
    <div v-if="showError" class="p-3 text-danger">{{ errorMessage }}</div>
    <div v-if="runningCountDown && this.wordCloudHtml">
      <iframe
        id="display-wordcloud"
        class="wordcloud__iframe"
        :src="this.wordCloudHtml"
      ></iframe>
    </div>
  </div>
</template>

<script>
import Button from "./Button";
import { requestAPI } from "../js/LearnedAPI";
import { getCompanyCode } from "../js/authentication/AuthService";
import { get, isEmpty, isNil } from "lodash";

export default {
  name: "WordCloudContentComponent",
  components: { Button },
  props: {
    description: String,
  },

  data() {
    return {
      countDown: false,
      roundLabel: "Start Exercise",
      timerValue: "",
      previousTimerValue: "",
      intervalTimer: null,
      endTime: "0",
      time: [
        {
          display: String,
          secs: Number,
        },
      ],
      wordCloudInterval: null,
      roundId: null,
      wordCloudHtml: null,
      errorMessage: null,
    };
  },

  computed: {
    showCountDown() {
      return this.countDown;
    },

    runningCountDown() {
      return this.countDown && this.timerValue !== "00:00";
    },

    showError() {
      return this.errorMessage;
    },

    buttonDisabled() {
      if (this.countDown) {
        return false;
      } else {
        return Boolean(
          isEmpty(this.timerValue) ||
            parseInt(this.timerValue) >= 60 ||
            parseInt(this.timerValue) <= 0
        );
      }
    },
  },

  methods: {
    getParams() {
      return { ...this.$route.params, companyCode: getCompanyCode() };
    },

    isNumberKey(event) {
      const charCode = event.which ? event.which : event.keyCode;
      // Only allow two digits and only numbers
      if (this.timerValue.length >= 2 || !(charCode >= 48 && charCode <= 57)) {
        return event.preventDefault();
      }
    },

    startRound() {
      if (this.roundLabel === "Start Exercise") {
        this.errorMessage = null;
        this.countDown = true;
        this.roundLabel = "New Round";
        this.time.display = this.timerValue + ":00";
        this.time.secs = parseInt(this.timerValue) * 60;
        this.previousTimerValue = this.timerValue;
        this.setTime(this.time.secs);
        const params = this.getParams();
        const startRoundPath = `/companies/${params.companyCode}/journeys/${params.journeyId}/bites/${params.biteId}/rounds/start`;
        return requestAPI(startRoundPath, "POST")
          .then((round) => {
            this.roundId = round.id;
            if (!isNil(this.roundId) && this.runningCountDown) {
              this.wordCloudInterval = setInterval(() => {
                if (this.runningCountDown) {
                  this.getWordCloud();
                }
              }, 5000);
            }
          })
          .catch((error) => {
            if (get(error, "response.status") === 400) {
              this.errorMessage = get(error, "response.data");
            } else if (get(error, "response.status") === 404) {
              this.errorMessage = get(error, "response.data");
            }
            clearInterval(this.wordCloudInterval);
          });
      } else {
        this.countDown = false;
        this.roundLabel = "Start Exercise";
        this.timerValue = "";
        this.time.display = "";
        this.time.secs = 0;
        this.setTime(this.time.secs);
        this.timerValue = this.previousTimerValue;
      }
    },

    getWordCloud() {
      const params = this.getParams();
      const getRoundStatusPath = `/companies/${params.companyCode}/journeys/${params.journeyId}/bites/${params.biteId}/rounds/${this.roundId}/status`;
      return requestAPI(getRoundStatusPath)
        .then((wordCloud) => {
          this.errorMessage = null;
          this.wordCloudHtml = null;
          this.wordCloudHtml = wordCloud.url;
        })
        .catch((error) => {
          if (get(error, "response.status") === 400) {
            this.errorMessage = get(error, "response.data");
          } else if (get(error, "response.status") === 404) {
            this.errorMessage = get(error, "response.data");
          }
        });
    },

    setTime(seconds) {
      clearInterval(this.intervalTimer);
      const now = Date.now();
      const end = now + seconds * 1000;
      this.displayTimeLeft(seconds);

      this.setCountDown(end);
    },

    setCountDown(end) {
      this.intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);

        if (secondsLeft === 0) {
          this.endTime = 0;
        }

        if (secondsLeft < 0) {
          clearInterval(this.intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },

    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      if (!isEmpty(this.timerValue)) {
        this.timerValue = `${this.zeroPadded(minutes)}:${this.zeroPadded(
          seconds
        )}`;
      }
    },

    zeroPadded(num) {
      return num < 10 ? `0${num}` : num;
    },
  },

  beforeDestroy() {
    clearInterval(this.wordCloudInterval);
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/styles.scss";

.main__button {
  @extend %common-button;
  margin-top: 0.7rem;
}

.main__button:disabled {
  background-color: #dedee9;
}

.bite__content__wordcloud {
  width: $main-content-width;
  margin: 0 auto;
}

.description {
  @extend %font-primary;
  font-weight: bold;
  font-size: 20px;
  line-height: 1.4;
}

.setTimer {
  margin: 0.8125rem auto;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-flow: nowrap;
  justify-content: flex-start;
  align-items: center;
  &__field {
    align-self: center;
    margin-right: 1rem;
    width: 5rem;
    border-color: (rgb(118, 118, 118), rgb(195, 195, 195));
  }

  &__label {
    @extend %font-no-highlighted;
    line-height: 1.75;
    align-self: center;
    width: 5rem;
  }
}

.timeLeftClass {
  @extend %font-primary;
  margin: 0 0 0.8125rem;
  font-size: 40px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.7;
  letter-spacing: normal;
}

.timeRunColor {
  color: #42a6bb;
}

.timeUpColor {
  color: #d6d8db;
}

.time {
  display: flex;
  justify-content: center;
}

.wordcloud__iframe {
  position: fixed;
  top: 30%;
  bottom: 15%;
  left: 38%;
  right: 15%;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
