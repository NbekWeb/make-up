<template>
  <div class="language-switcher">
    <a-dropdown>
      <a-button type="text" class="language-btn">
        <span class="flag-icon">{{ getCurrentFlag }}</span>
        <span class="language-name">{{ getCurrentLanguageName }}</span>
        <DownOutlined />
      </a-button>
      <template #overlay>
        <a-menu @click="changeLanguage">
          <a-menu-item key="en">
            <span class="flag-icon">🇺🇸</span>
            <span>{{ $t("common.english") }}</span>
          </a-menu-item>
          <a-menu-item key="ru">
            <span class="flag-icon">🇷🇺</span>
            <span>{{ $t("common.russian") }}</span>
          </a-menu-item>
          <a-menu-item key="uz">
            <span class="flag-icon">🇺🇿</span>
            <span>{{ $t("common.uzbek") }}</span>
          </a-menu-item>
          <a-menu-item key="kk">
            <span class="flag-icon">🇰🇿</span>
            <span>Kazakh</span>
          </a-menu-item>
          <a-menu-item key="ko">
            <span class="flag-icon">🇰🇷</span>
            <span>Korean</span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup>
import { DownOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import useCore from "@/stores/core.pinia";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const { locale: i18nLocale } = useI18n();
const core = useCore();
const { locale } = storeToRefs(core);

const changeLanguage = ({ key }) => {
  core.setLocale(key);
  i18nLocale.value = key;
};

const getCurrentFlag = computed(() => {
  const flags = {
    en: "🇺🇸",
    ru: "🇷🇺",
    uz: "🇺🇿",
    kk: "🇰🇷",
    ko: "🇰🇿",
  };
  return flags[locale.value] || flags.en;
});

const getCurrentLanguageName = computed(() => {
  const names = {
    en: "English",
    ru: "Русский",
    uz: "O'zbekcha",
    ko: "Kazakh",
    kk: "Korean",
  };
  return names[locale.value] || names.en;
});
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

.language-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 12px;
}

.language-btn:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.flag-icon {
  font-size: 12px;
  margin-right: 2px;
}

.language-name {
  font-size: 12px;
  font-weight: 400;
}

:deep(.ant-dropdown-menu-item) {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
}

:deep(.ant-dropdown-menu-item:hover) {
  background-color: #f5f5f5;
}
</style>
