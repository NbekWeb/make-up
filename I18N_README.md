# Internationalization (i18n) Setup

This project has been configured with Vue I18n to support multiple languages: English, Russian, and Uzbek.

## Features

- ✅ Support for 3 languages: English (en), Russian (ru), Uzbek (uz)
- ✅ Language switcher component with flags
- ✅ Persistent language selection (saved in localStorage)
- ✅ Default language: English
- ✅ Fallback to English for missing translations

## File Structure

```
src/
├── i18n/
│   ├── index.js              # Main i18n configuration
│   └── locales/
│       ├── en.json           # English translations
│       ├── ru.json           # Russian translations
│       └── uz.json           # Uzbek translations
├── components/
│   └── LanguageSwitcher.vue  # Language switcher component
└── views/
    └── DemoPage.vue          # Demo page showcasing i18n
```

## Usage

### 1. Using Translations in Components

```vue
<template>
  <div>
    <!-- Basic translation -->
    <h1>{{ $t('common.home') }}</h1>
    
    <!-- Translation with parameters -->
    <p>{{ $t('welcome.message', { name: 'John' }) }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

// Programmatic translation
const message = t('common.welcome')

// Change language programmatically
const changeLanguage = (lang) => {
  locale.value = lang
}
</script>
```

### 2. Adding the Language Switcher

```vue
<template>
  <div>
    <LanguageSwitcher />
  </div>
</template>

<script setup>
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
</script>
```

### 3. Adding New Translations

1. **Add to English file** (`src/i18n/locales/en.json`):
```json
{
  "new_section": {
    "title": "New Title",
    "description": "New description"
  }
}
```

2. **Add to Russian file** (`src/i18n/locales/ru.json`):
```json
{
  "new_section": {
    "title": "Новый заголовок",
    "description": "Новое описание"
  }
}
```

3. **Add to Uzbek file** (`src/i18n/locales/uz.json`):
```json
{
  "new_section": {
    "title": "Yangi sarlavha",
    "description": "Yangi tavsif"
  }
}
```

### 4. Using in Templates

```vue
<template>
  <div>
    <h1>{{ $t('new_section.title') }}</h1>
    <p>{{ $t('new_section.description') }}</p>
  </div>
</template>
```

## Available Translation Keys

### Common
- `common.home` - Home
- `common.about` - About
- `common.contact` - Contact
- `common.search` - Search
- `common.login` - Login
- `common.register` - Register
- `common.logout` - Logout
- `common.profile` - Profile
- `common.settings` - Settings
- `common.language` - Language
- `common.english` - English
- `common.russian` - Russian
- `common.uzbek` - Uzbek

### Navigation
- `navigation.home` - Home
- `navigation.catalog` - Catalog
- `navigation.favorites` - Favorites
- `navigation.cart` - Cart
- `navigation.account` - Account

### Home
- `home.welcome` - Welcome
- `home.hero_title` - Discover Amazing Products
- `home.hero_subtitle` - Find the best products for your needs
- `home.featured_products` - Featured Products
- `home.view_all` - View All
- `home.latest_products` - Latest Products

### Product
- `product.add_to_cart` - Add to Cart
- `product.add_to_favorites` - Add to Favorites
- `product.remove_from_favorites` - Remove from Favorites
- `product.price` - Price
- `product.description` - Description
- `product.specifications` - Specifications
- `product.reviews` - Reviews
- `product.related_products` - Related Products

### Footer
- `footer.about_us` - About Us
- `footer.contact_info` - Contact Information
- `footer.follow_us` - Follow Us
- `footer.newsletter` - Newsletter
- `footer.subscribe` - Subscribe
- `footer.all_rights_reserved` - All Rights Reserved

## Demo Page

Visit `/demo` to see a comprehensive demonstration of the i18n functionality, including:
- Real-time language switching
- Translation examples for all sections
- Current locale display
- Interactive language switcher

## Configuration

The i18n configuration is in `src/i18n/index.js`:

```javascript
const i18n = createI18n({
  legacy: false,
  locale: 'en', // default locale
  fallbackLocale: 'en',
  messages,
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true
})
```

## Language Persistence

The selected language is automatically saved to localStorage and restored on page reload.

## Adding New Languages

To add a new language:

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json`)
2. Add the language to the messages object in `src/i18n/index.js`
3. Add the language option to the LanguageSwitcher component
4. Add the flag and name mappings in the LanguageSwitcher component

## Best Practices

1. **Use nested keys** for better organization (e.g., `common.home` instead of `home`)
2. **Keep translations consistent** across all language files
3. **Use descriptive keys** that clearly indicate the content
4. **Test all languages** when adding new translations
5. **Use parameters** for dynamic content instead of concatenating strings

## Troubleshooting

- **Missing translations**: Check that the key exists in all language files
- **Language not switching**: Ensure the LanguageSwitcher component is properly imported
- **Persistent language not working**: Check localStorage in browser dev tools 