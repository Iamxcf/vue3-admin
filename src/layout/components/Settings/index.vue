<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { useSettingsStore } from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const state = reactive({
  fixedHeader: settingsStore.fixedHeader,
  showTagsView: settingsStore.showTagsView,
  showSidebarLogo: settingsStore.showSidebarLogo,
  showThemeSwitch: settingsStore.showThemeSwitch,
  showScreenfull: settingsStore.showScreenfull
})

watch(
  () => state.fixedHeader,
  (value) => {
    settingsStore.changeSetting({
      key: 'fixedHeader',
      value
    })
  }
)
watch(
  () => state.showTagsView,
  (value) => {
    settingsStore.changeSetting({
      key: 'showTagsView',
      value
    })
  }
)
watch(
  () => state.showSidebarLogo,
  (value) => {
    settingsStore.changeSetting({
      key: 'showSidebarLogo',
      value
    })
  }
)
watch(
  () => state.showThemeSwitch,
  (value) => {
    settingsStore.changeSetting({
      key: 'showThemeSwitch',
      value
    })
  }
)
watch(
  () => state.showScreenfull,
  (value) => {
    settingsStore.changeSetting({
      key: 'showScreenfull',
      value
    })
  }
)
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统布局配置</h3>
      <div class="drawer-item">
        <span>显示标签栏</span>
        <el-switch v-model="state.showTagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示侧边栏 Logo</span>
        <el-switch v-model="state.showSidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>固定 Header</span>
        <el-switch v-model="state.fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示切换主题按钮</span>
        <el-switch v-model="state.showThemeSwitch" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>显示全屏按钮</span>
        <el-switch v-model="state.showScreenfull" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
  }
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
