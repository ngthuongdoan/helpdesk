<template>
  <div class="content">
    <div class="header">
      <h1 class="title">
        How can we
        <span id="highlight">help you?</span>
      </h1>
      <vue-suggestion
        :items="searchItems"
        v-model="item"
        :setLabel="setLabel"
        :itemTemplate="itemTemplate"
        @changed="inputChange"
        @selected="itemSelected"
        @enter="showAnswer"
        placeholder="Input here..."
      ></vue-suggestion>
    </div>
    <div class="card__container">
      <div class="card__items">
        <img src="~@/assets/technical-support.svg" alt width="20%" />
        <h3 class="card__header">Quality over cost</h3>
        <p>Quality maintenance is a sustainable approach.</p>
      </div>
      <div class="card__items">
        <img src="~@/assets/bolt.svg" alt width="20%" />
        <h3 class="card__header">Fast. Fresh. Convenient</h3>
        <p>Give us the honour to serve you.</p>
      </div>
      <div class="card__items">
        <img src="~@/assets/conversation.svg" alt width="20%" />
        <h3 class="card__header">Communicate With Tomorrow</h3>
        <p>Work as a team to help your customers get all the answers.</p>
      </div>
    </div>
  </div>
</template>

<script>
import itemTemplate from "@/components/ItemTemplate.vue";
export default {
  data() {
    return {
      item: {},
      searchItems: [],
      items: [
        {
          id: 1,
          question: "My computer does not turn on, what do I do now?",
          answer:
            "First check the computer's power cord to make sure it is completely plugged into the wall socket. If you are using a plug strip, make sure it is completely plugged into the wall socket and that the power switch on the plug strip is turned on. Some plug strips also have a built in circuit breaker which usually looks like a black or red button near the power switch. Press the button to reset it and see if that solves the problem.",
        },
        {
          id: 2,
          question: "What do I do when my computer crashes?",
          answer:
            'There are many reasons why a computer may just stop working or "freeze". Most of the time there isn\'t much we can do about it, it is a fact of life that computer programs have become so complex that occasionally users will experience problems even when performing common tasks. When your computer no longer responds to keyboard commands your best bet is to restart the computer.',
        },
        {
          id: 3,
          question: "What do I do if my hard disk fails to work?",
          answer:
            "As with most computer errors, your first step is to shut down your computer and restart it. This will help you determine whether or not you actually have a hard disk problem. If the disk is severely damaged then your computer will probably fail to restart properly. If this is the case then contact MCWare IT Solutions, this is a job for the professionals.",
        },
        {
          id: 4,
          question: "There is no display on the monitor, what do I do now?",
          answer:
            "Make sure the monitor is on. If no power light (green or orange light) is seen on the monitor display try pressing the power button until it comes on. If your computer monitor was on and you stepped away from the computer and upon returning it was black, it's likely that the computer is asleep. Try moving your mouse, clicking the mouse buttons, and/or pressing any key (space bar) on the keyboard to wake it up. Make sure that the monitor is connected properly to the back of the computer.",
        },
        {
          id: 5,
          question:
            "What do I do if the image on my monitor is distorted or skewed?",
          answer:
            "You may receive a distorted image when the cable is loose or defective. Disconnect the video cable going from the back of the computer and verify that no pins are bent, burnt or broken. Once verified re-connect the monitor cable. If the refresh rate is not properly set the monitor may have a wavy or an appearance that lines are going down or across the monitor slowly or fast, this may also cause a flickering affect. A distorted image can be caused by magnetic or other types of interference. Verify no speakers, fans or other magnetic devices are close to the monitor.",
        },
        {
          id: 6,
          question:
            "I get a 'no signal input' message on my monitor, what do I do?",
          answer:
            "Verify that the monitor is properly connected in the back of the monitor as well as to the back of the computer. If the monitor appears to be connected properly, verify that a cable is not loose by disconnecting all cables that can be disconnected in the back of the monitor (generally the data cable cannot be disconnected). Next, disconnect the data cable connected to the back of the computer and then reconnect the cable. When connecting the cable in the back of the computer ensure the cable connection is tight. Most Computers will also have screw ends that can be screwed in to hold the connector in place.",
        },
        {
          id: 7,
          question:
            "There are black borders on my monitors screen, what do I do?",
          answer:
            "If the resolution was recently changed it is possible for the monitor to not auto adjust or shift to the correct size. If this occurs, the resolution can be changed back to the original setting or you can manually adjust the monitor. If a black border exists on the monitor it can generally be resolved by manually adjusting the horizontal or vertical width. Because each monitor is different, the method of adjusting this setting will vary; consult your monitor documentation.",
        },
        {
          id: 8,
          question: "Why is my computer mouse acting erratically?",
          answer:
            "Users who have an optical mechanical mouse (most common mouse for desktop computers) are likely experiencing erratic behaviour because the mouse is not clean or is dirty. If you've cleaned the mouse and continue to encounter issues and this mouse has worked in the past fine unfortunately your mouse is likely defective. One additional test that can be done to help determine if this is the case or not is to connect the mouse to another computer. Otherwise we suggest replacing the mouse.",
        },
        {
          id: 9,
          question:
            "The wheel on my mouse isn't working properly, what do I do?",
          answer:
            "If you're running any version of Microsoft Windows and are encountering issues with the mouse wheel, first attempt to adjust the mouse settings through the Mouse Properties window. This window can be accessed by opening the Control Panel and double-clicking the Mouse icon.",
        },
        {
          id: 10,
          question: "How can I clean my keyboard?",
          answer:
            "The keys on a keyboard are only clipped on, with a knife or other thin object, carefully pop the keys off, this will allow you to clean under the keys as well as cleaning the keys themselves (make sure you remember where they went!).",
        },
        {
          id: 11,
          question: "How do I get into my computers safe mode?",
          answer:
            'To get into the Windows 7 / 10 Safe mode, as the computer is starting up press and hold your "F8 Key" which should bring up the "Windows Advanced Options Menu". Use your arrow keys to move to "Safe Mode" and press your Enter key.',
        },
        {
          id: 12,
          question:
            "I can't delete a file because it is being used by Windows, what do I do?",
          answer:
            "Close all programs running on the computer and try again. If after closing all programs running on the computer you are still encountering the same issue when attempting to delete files, load the computer into Safe Mode and delete the files.",
        },
        {
          id: 13,
          question: "How can I update my Microsoft Windows computer?",
          answer:
            "If you are running Microsoft Windows 7, Windows 10, or a later version of Microsoft Windows, you are eligible to update Microsoft Windows, and in some cases, your computer hardware with the latest drivers through Microsoft's update site, visit http://windowsupdate.microsoft.com. In most cases your computer should be set to automatically update when a new update becomes available.",
        },
        {
          id: 14,
          question:
            "Is it safe to turn off a Windows computer without doing a shut down?",
          answer:
            "Users should not simply press the power button or restart the computer while Windows is still running unless there is an issue with the computer. Microsoft has included the shut down feature because it enables a computer to go through all the necessary steps that are required before turning off the computer. In fact many versions of Microsoft Windows will check the computer for any problems if the computer is not shut down properly.",
        },
        {
          id: 15,
          question: "How can I recover a file from the recycle bin?",
          answer:
            "Double click the recycle bin icon on your desktop, here you will see all of the files within your bin. Select the files you wish to recover, right click and choose restore.",
        },
      ],
      itemTemplate,
    };
  },
  methods: {
    itemSelected(item) {
      this.item = item;
      this.showAnswer();
    },
    setLabel(item) {
      return item.question;
    },
    inputChange(text) {
      this.searchItems = this.items.filter((item) =>
        item.question.includes(text)
      );
    },
    showAnswer() {
      this.$swal({
        icon: "info",
        title: this.item.question,
        text: this.item.answer,
      }).then((this.item = {}));
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap");
.content {
  height: 100vh;
  position: relative;
}
.header {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    font-family: "Lato", sans-serif;
    font-size: 40px;
    letter-spacing: 3px;
    #highlight {
      position: relative;
    }
    #highlight::after {
      position: absolute;
      top: -10px;
      left: 0;
      content: "";
      height: 100%;
      width: 100%;
      border-bottom: 5px solid #47daad;
      z-index: -1;
      padding: 10px;
    }
  }
}

.card {
  &__container {
    position: absolute;
    width: 90vw;
    top: 50%;
    display: grid;
    margin-left: 10vw;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    z-index: -1;
  }
  &__items {
    width: 300px;
    min-height: 300px;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.61);
    border-radius: 20px;
    overflow: hidden;
    background: white;
    p {
      font-size: 16px;
      margin: 30px;
    }
    img {
      margin: 30px auto;
    }
  }
  &__header {
    margin: 10px;
    color: #47daad;
  }
}
</style>