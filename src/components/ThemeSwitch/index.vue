<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { MagicStick } from '@element-plus/icons-vue'

const appStore = useAppStore()

const themeList = computed(() => {
  return appStore.themeList
})
const activeThemeName = computed(() => {
  return appStore.activeThemeName
})
const handleSetTheme = (name: string) => {
  appStore.setTheme(name)
}
</script>

<template>
  <el-dropdown trigger="click" @command="handleSetTheme">
    <div>
      <el-tooltip effect="dark" content="主题模式" placement="bottom">
        <el-icon :size="20">
          <MagicStick />
        </el-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(theme, index) in themeList"
          :key="index"
          :disabled="activeThemeName === theme.name"
          :command="theme.name"
        >
          <span>{{ theme.title }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
