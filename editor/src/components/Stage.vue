<template>
<div class="stage">
  <div class="row">
    <div class="col-1 key bg-success text-white" @click="toggle">
      {{num}}
    </div>
    <div v-show="show" class="col">
      <div class="row prop">
        <div class="col-1 key bg-success text-white">
          type
        </div>
        <div class="col buttons d-flex justify-content-start">
          <div class="btn-group">
            <button type="button" class="btn btn-secondary"
                    :class="{active: isDisplay}"
                    @click="changeType('display')">display</button>
            <button type="button" class="btn btn-secondary"
                    :class="{active: isQuiz}"
                    @click="changeType('quiz')">quiz</button>
          </div>
        </div>
      </div>
      <Property v-if="isDisplay" pkey="text" v-model="value.text" rows="3"/>
      <Property v-if="isQuiz" pkey="quizId" v-model="value.quizId"/>
    </div>
  </div>
</div>
</template>

<script>
import Property from './Property'

export default {
  name: 'stage',
  props: {
    'num': null,
    'value': {
      default: function() {
        return {
          type: null
        };
      }
    }
  },
  components: {
    Property
  },
  computed: {
  },
  data: function() {
    return {
      isQuiz: false,
      isDisplay: false,
      show: true
    };
  },
  beforeMount: function() {
    this.changeType(this.value.type);
  },
  mounted: function() {
  },
  beforeUpdate: function() {
    this.changeType(this.value.type);
  },
  methods: {
    changeType: function(type) {
      this.type = type;
      this.value.type = type;
      if(type == "quiz"){
        this.isQuiz = true;
        this.isDisplay = false;
        if(!this.value.quizId) this.$set(this.value, 'quizId', null);
      } else if(type == "display") {
        this.isQuiz = false;
        this.isDisplay = true;
        if(!this.value.text) this.$set(this.value, 'text', null);
      } else {
        this.isQuiz = false;
        this.isDisplay = false;
      }
    },
    toggle: function() {
      this.show = !this.show;
    },
    handleInput: function() {
      // this.$emit('input', this.value);
    }
  },
  watch: {
    value: {
      handler: function(val , old) {
        this.$emit('input', val);
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stage {
  margin-top: 0.5em;
}

.prop {
  margin-bottom: 5px;
}

.buttons {
  padding-left: 0;
}

.key {
  /*text-align: right;*/
  padding: 5px;
  border-radius: 3px;
  margin-right: 1em;
  cursor: pointer;
  /*border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;*/
}
</style>
