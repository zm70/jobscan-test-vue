<!-- <template>
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
          <div v-show="!showAllSkills" class="show-all-skills-link" @click="toggleSkillsView(true)">
            + More skills...
          </div>
          <div v-show="showAllSkills" class="show-limited-skills-link" @click="toggleSkillsView(false)">
            - Less skills...
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="skills-head">
          <h2>Job Positions</h2>
          <p>Explore Job Positions Aligned with Your Skills, Ranked by Scores:</p>
        </div>
        <div class="posting-section" v-show="!isPostingEmpty">
          <div class="card2" v-for="postingItem in postings" :key="postingItem.id">
            <span class="posting-score">
              <i class="fa fa-star" aria-hidden="true"></i>
              {{ postingItem.score }}
            </span>
            <h4>{{ postingItem.title }}</h4>
            <div class="posting-skills-section">
              <span v-for="postingSkill in postingItem.skills" :key="postingSkill.id">
                {{ postingSkill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { Skill } from '../../composables/Skill';
import { Posting } from '../../composables/Posting';

const skillCountLimit = 10;
const baseURL = process.env.VUE_APP_BASE_URL || '';
const skills = ref<{ [key: string]: Skill }>({});
const postings = ref<{ [key: string]: Posting }>({});
const selectedScores = ref<{ [key: string]: number }>({});
const selectedSkillsCount = ref(0);
const showAllSkills = ref(false);

const fetchSkills = () => {
  axios.get(`${baseURL}/skills`)
    .then(response => {
      skills.value = response.data;
    })
.catch(error => {
      console.error('Error fetching skills:', error);
    });
};

const fetchPostings = () => {
  const queryParams = Object.entries(selectedScores.value)
    .map(([key, value]) => `skill[${encodeURIComponent(key)}]=${encodeURIComponent(value)}`)
    .join('&');

  const endpoint = `/postings/search/skills?${queryParams}`;
  axios.get(`${baseURL}${endpoint}`)
    .then(response => {
      postings.value = response.data.results;
    })
    .catch(error => {
      console.error('Error fetching postings:', error);
    });
};

const selectSkill = (slug: string, score: number) => {
  if (selectedSkillsCount.value >= skillCountLimit) {
    alert('You can only select up to 10 items from the skills box.');
    return;
  }
  selectedScores.value[slug] = score;
  selectedSkillsCount.value++;
  fetchPostings();
};

const toggleSkillsView = (showAll: boolean) => {
  showAllSkills.value = showAll;
};

const isSelected = (slug: string, score: number) => selectedScores.value[slug] === score;

const displayedSkills = computed(() => {
  const skillsArray = Object.values(skills.value);
  return showAllSkills.value ? skillsArray : skillsArray.slice(0, 5);
});

const isPostingEmpty = computed(() => {
  return Object.keys(postings.value).length === 0;
});

onMounted(() => {
  fetchSkills();
});
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
    .show-all-skills-link,.show-limited-skills-link {
      cursor: pointer;
      margin-top: 20px;
    }
    .content-section {
      margin-top: 5%;
      margin-bottom: 5%;
    }
</style> -->
