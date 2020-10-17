<template>
  <div class="contact">
    <h2>Contact me</h2>
    <p>
      Email:
      <a href="mailto:jasonarnoldleo@gmail.com">jasonarnoldleo@gmail.com</a>
    </p>
    <p>
      Phone:
      <a v-if="mobile" href="tel:5203057106">(520)305.7106</a>
      <span v-else>(520)305.7106</span>
    </p>
    <h2>Find me on websites</h2>
    <div class="social-row">
      <div
        aria-label="GitHub"
        @mouseover="hovered = 'github'"
        @mouseleave="hovered = ''"
      >
        <a href="https://github.com/xezian">
          <GitHubIcon
            :transform="hovered !== 'github' ? 'scale(1.4)' : 'scale(1.5)'"
            :fill="hovered !== 'github' ? '#eaf2ff' : '#fff'"
          />
        </a>
      </div>
      <div
        aria-label="Stack Overflow"
        @mouseover="hovered = 'so'"
        @mouseleave="hovered = ''"
      >
        <a href="https://stackoverflow.com/users/8524758/jsonaleo">
          <SOIcon
            :transform="hovered !== 'so' ? 'scale(1.4)' : 'scale(1.5)'"
            :fill="hovered !== 'so' ? '#eaf2ff' : '#fff'"
          />
        </a>
      </div>
      <div
        aria-label="Twitter Icon"
        @mouseover="hovered = 'twitter'"
        @mouseleave="hovered = ''"
      >
        <a href="https://twitter.com/JSONaleo">
          <TwitterIcon
            :transform="hovered !== 'twitter' ? 'scale(1.4)' : 'scale(1.5)'"
            :fill="hovered !== 'twitter' ? '#eaf2ff' : '#fff'"
          />
        </a>
      </div>
      <div
        aria-label="LinkedIn"
        @mouseover="hovered = 'linkedin'"
        @mouseleave="hovered = ''"
      >
        <a href="https://www.linkedin.com/in/jason-a-leo/">
          <LinkedInIcon
            :transform="hovered !== 'linkedin' ? 'scale(1.4)' : 'scale(1.5)'"
            :fill="hovered !== 'linkedin' ? '#eaf2ff' : '#fff'"
          />
        </a>
      </div>
    </div>
    <h2>Download my Resume</h2>
    <div class="resume-row">
      <div
        aria-label="Resume"
        @mouseover="hovered = 'resume'"
        @mouseleave="hovered = ''"
      >
        <a href="https://www.linkedin.com/in/jason-a-leo/">
          <ResumeIcon
            :transform="hovered !== 'resume' ? 'scale(1.4)' : 'scale(1.5)'"
            :fill="hovered !== 'resume' ? '#eaf2ff' : '#fff'"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import GitHubIcon from "../assets/github.svg"
import SOIcon from "../assets/stack-overflow.svg"
import TwitterIcon from "../assets/twitter.svg"
import LinkedInIcon from "../assets/linkedin.svg"
import ResumeIcon from "../assets/file-account-outline.svg"
export default {
  components: {
    GitHubIcon,
    SOIcon,
    TwitterIcon,
    LinkedInIcon,
    ResumeIcon,
  },
  data() {
    return {
      hovered: "",
    }
  },
  computed: {
    mobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    },
  },
}
</script>

<style lang="postcss" scoped>
.contact a {
  text-decoration: none;
  color: #fff;
}
.contact span {
  color: #fff;
}
div.social-row {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
div.resume-row {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
