<template>

  <div class="container content-section">

    <div class="row">

      <div class="col-md-4">

        <div class="skills-head">

          <h2>Skills</h2>

          <p>Select Your Skills and Proficiency Levels:</p>

        </div>

        <div class="skills-section">

          <div class="card2" v-for="(skill, index) in displayedSkills" :key="index">

            <h4>{{ skill.name }}</h4>

            <div class="score">

              <span
                v-for="score in 5"
                :key="score"
                @click="selectSkill(skill.slug, score)"
                :class="{ 'selected': isSelected(skill.slug, score) }"
              >
                {{ score }}
              </span>

            </div>

          </div>

          <div v-show="!showAllSkills" class="show-all-skills-link" 
            @click="toggleSkillsView(true)"
          >
            + More skills...
          </div>

          <div v-show="showAllSkills" class="show-limited-skills-link" 
            @click="toggleSkillsView(false)"
          >
            - Less skills...
          </div>

        </div>

      </div>

      <div class="col-md-8">

        <div class="skills-head">

          <h2>Job Positions</h2>

          <p>Explore Job Positions Aligned with Your Skills, Ranked by Scores:</p>

        </div>

        <div class="posting-section">

          <div class="card2" v-for="postingItem in posting" :key="postingItem.id">

            <span class="posting-score">
              <i class="fa fa-star" aria-hidden="true"></i>
              {{ postingItem.score }}
            </span>

            <h4>{{ postingItem.title }}</h4>

            <div class="posting-skills-section">
              <span v-for="skill in postingItem.skills" :key="skill">
                {{ skill.name }}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>

<script>

import axios from 'axios';
const skillCountLimit = 10;

export default {
  name: 'JobPositions',
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_URL,
      skills: {},
      posting: {},
      selectedScores: {},
      selectedSkillsCount: 0,
      showAllSkills: false
    }
  },

  methods: {
    fetchSkills() {
      axios.get(`${this.baseURL}/skills`)
        .then(response => {
          this.skills = response.data;
        })
        .catch(error => {
          console.error('Error fetching skills:', error);
        });
    },

    fetchPostings() {
      const queryParams = Object.entries(this.selectedScores)
        .map(([key, value]) => `skill[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`)
        .join('&');

      const endpoint = `/postings/search/skills?${queryParams}`;
      axios.get(`${this.baseURL}${endpoint}`)
        .then(response => {
          this.posting = response.data.results;
        })
        .catch(error => {
          console.error('Error fetching postings:', error);
        });
    },

    selectSkill(slug, score) {
     
      if (this.selectedSkillsCount >= skillCountLimit) {
        alert('You can only select up to 10 items from the skills section.');
        return;
      }

      this.selectedScores[slug] = score;
      this.selectedSkillsCount++;
      this.fetchPostings();
    },

    toggleSkillsView(showAll) {
      this.showAllSkills = showAll;
    }
  },

  computed: {
    isSelected() {
      return (slug, score) => this.selectedScores[slug] === score;
    },

    displayedSkills() {
      const skillsArray = Object.values(this.skills);
      return this.showAllSkills ? skillsArray : skillsArray.slice(0, 5);
    },

  },

  mounted() {
    this.fetchSkills();
  }

}
</script>

<style scoped>

  h4 {
    margin: 12px 0 12px 0;
  }
  .score {
    text-align: right;
  }
  .score span {
    border: 1px solid #aaa5a580;
    margin: 5px;
    padding: 5px 8px;
    border-radius: 7px;
    cursor: pointer;

  }

  .score span.selected {
    background-color: lightblue;
  }

  .card2 {
    margin-bottom: 10px;
    padding: 10px;
    box-shadow: 2px 2px 4px rgb(168 220 233 / 42%);
    text-align: left;
  }

  .skills-section {
    margin-bottom: 10px;
    padding: 20px;
    box-shadow: 2px 2px 4px rgb(168 220 233 / 42%);
    border: 1px solid #add8e68c;
  }

  .posting-skills-section {
    margin: 10px 0 10px 0;
  }

  .posting-skills-section span {
    border: 1px solid #aaa5a580;
    padding: 5px 7px;
    border-radius: 7px;
    margin: 5px;
    background: lightyellow;
  }

  .posting-score {
    border: 1px solid gold;
    border-radius: 10px;
    background: gold;
    padding: 3px 8px 3px 8px;
    float: right;
  }

  .show-all-skills-link,
  .show-limited-skills-link {
    cursor: pointer;
    margin-top: 20px;
  }
  .content-section {
    margin-top: 5%;
    margin-bottom: 5%;
  }

</style>