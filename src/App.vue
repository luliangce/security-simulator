<template lang="pug">
h1 保安模拟器
h2 {{ E.name }}
div(style="padding:30px")
  el-row(:gutter="30")
    el-col(:span="6" :xs="24")
      el-card(shadow="always")
        template(#header)
          | 你的信息
        el-form(label-position="top")
          el-form-item(label="名声")
            el-progress(:percentage="profile.fame")
          el-form-item(label="公司信任")
            el-progress(:percentage="profile.trust")
    el-col(:span="8" :xs="24" style="min-height: 300px;")
      el-button(@click="nextStep" type="primary" :disabled="!canGoNext")
        | 继续
      div(class="question") {{p?.desc}}

      br
      div(v-for="(o,i) in p?.options||[]" :key="i" class="option" @click="makeChoice(o)")
        i(class="el-icon-right")
        | {{o.desc}}
    el-col(:span="8" :xs="24")
      li(v-for="(m,i) in messages" :key="i" class="message" :class="{latest: i==0}" )
        | {{m}}

</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue'
import { Option } from '@/core/problem'
import { chap1 } from '@/core/story/chap1'

export default defineComponent({
  setup () {
    const E = reactive(chap1)
    const profile = reactive({
      fame: 50,
      trust: 100
    })
    const messages = ref<string[]>([])
    const step = ref(1)
    const p = computed(() => {
      return E.problems.get(step.value)
    })

    const nextStep = () => {
      if (!p.value) { return }
      messages.value.unshift(p.value.desc)
      if (p.value.next === -1) {
        step.value = -1
      } else {
        step.value += 1
      }
    }
    const makeChoice = (opt:Option) => {
      profile.fame += opt.fame
      profile.trust += opt.trust
      if (p.value) {
        messages.value.unshift(p.value.desc)
      }
      messages.value.unshift(opt.result as string)
      if (opt.next === -1) {
        step.value = opt.next
      } else if (!opt.next) {
        step.value += 1
      } else {
        step.value = opt.next
      }
    }
    const canGoNext = computed(() => {
      return step.value !== -1 && !p.value?.options
    })
    watchEffect(() => {
      if (profile.trust <= 0) {
        messages.value.unshift('公司对你失去了信任，你丢掉了工作...')
      }
      if (profile.fame <= 0) {
        messages.value.unshift('你的行为在社会上引起了巨大的反响，你社死了...')
      }
      if (profile.fame <= 0 || profile.trust <= 0) {
        step.value = -1
      }
    })
    watchEffect(() => {
      if (step.value !== -1) {
        return
      }
      if (profile.trust <= 0 || profile.fame <= 0) {
        messages.value.unshift('很遗憾，下辈子不要挑战保安这么高难度的职业了')
      } else {
        messages.value.unshift('恭喜你！你平安度过了这一天')
      }
    })
    return {
      E,
      messages,
      nextStep,
      makeChoice,
      profile,
      canGoNext,
      p
    }
  }
})
</script>

<style>
.option {
  width: 200px;
  margin: 10px;
  transition: all 0.1s;
  user-select: none;
  cursor: pointer;
}
.option:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translate(3px,-1px);
  font-size: larger;
}

.message {
  margin: 5px;
  border-bottom: dotted rgba(0, 0, 0, 0.1);
}
.question {
  width: 100%;
  word-wrap: break-word;
  white-space: normal;
  font-size: larger;
  font-weight: bolder;
}
.latest {
  font-size: larger;
  margin-top: 10px;
  font-weight: bolder;
  color: darkgreen;
}
</style>
