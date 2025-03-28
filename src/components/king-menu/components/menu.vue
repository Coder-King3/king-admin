<script setup lang="ts">
import type { MenuProps } from '../types'

import { computed, toRefs } from 'vue'

import { cn } from '@/utils'

defineOptions({ name: 'KingMenu' })

interface Props extends MenuProps {
  popperOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  mode: 'vertical',
  popperOffset: 12,
  rounded: true,
  theme: 'light'
})

const {
  collapse,
  collapseShowTitle,
  defaultActive,
  mode,
  popperOffset,
  rounded,
  theme
} = toRefs(props)

const activePath = computed(() => defaultActive.value)

const is = (name: string, condition?: boolean) => {
  return name && condition ? `is-${name}` : ''
}

const isStateClassNames = computed(() => [
  is('rounded', rounded.value),
  is(theme.value, true)
])
const menuClassName = 'king-menu'
const menuClassNames = computed(() => {
  const classNames = cn(menuClassName, '!b-0', [
    is('vertical', mode.value === 'vertical'),
    is('collapse', collapse.value),
    is('collapse-show-title', collapseShowTitle.value),
    ...isStateClassNames.value
  ])

  return classNames
})

const menuPopperClassNames = computed(() =>
  cn(menuClassName, `${menuClassName}__popup`, [...isStateClassNames.value])
)
</script>

<template>
  <ElMenu
    :class="menuClassNames"
    :collapse-transition="false"
    :popper-class="menuPopperClassNames"
    :popper-offset="popperOffset"
    :unique-opened="accordion"
    :mode="mode"
    :collapse="collapse"
    :default-active="activePath"
  >
    <slot></slot>
  </ElMenu>
</template>

<style lang="scss">
$namespace: king;

@mixin menu-vars {
  --menu-margin: 6px;
  --menu-radius: 8px;
  --menu-title-width: 140px;
  --menu-item-gap: 4px;
  --menu-content-height: 42px;
  --menu-content-margin: 0px;
  --menu-content-icon-size: 16px;
  --menu-content-radius: 0px;
  --menu-content-indent: 16px;

  &.is-dark {
    --menu-background-color: hsl(var(--menu));
    --menu-content-color: hsl(var(--foreground) / 80%);
    --menu-item-background-color: var(--menu-background-color);
    --menu-item-hover-color: hsl(var(--accent-foreground));
    --menu-item-hover-background-color: hsl(var(--accent));
    --menu-item-active-color: hsl(var(--accent-foreground));
    --menu-item-active-background-color: hsl(var(--accent));
    --menu-submenu-background-color: var(--menu-background-color);
    --menu-submenu-hover-color: hsl(var(--foreground));
    --menu-submenu-hover-background-color: hsl(var(--accent));
    --menu-submenu-active-color: hsl(var(--foreground));
    --menu-submenu-active-background-color: transparent;
  }

  &.is-light {
    --menu-background-color: hsl(var(--menu));
    --menu-content-color: hsl(var(--foreground));
    --menu-item-background-color: var(--menu-background-color);
    --menu-item-hover-color: var(--menu-item-color);
    --menu-item-hover-background-color: hsl(var(--accent));
    --menu-item-active-color: hsl(var(--primary));
    --menu-item-active-background-color: hsl(var(--primary) / 15%);
    --menu-submenu-background-color: var(--menu-background-color);
    --menu-submenu-hover-color: hsl(var(--primary));
    --menu-submenu-hover-background-color: hsl(var(--accent));
    --menu-submenu-active-color: hsl(var(--primary));
    --menu-submenu-active-background-color: transparent;
  }

  &.is-rounded {
    --menu-content-margin: var(--menu-margin);
    --menu-content-radius: var(--menu-radius);
  }
}

@mixin menu-content {
  $content-selector: '.#{$namespace}-menu-content';

  position: relative;
  box-sizing: border-box;
  height: var(--menu-content-height) !important;
  padding-left: calc(
    var(--menu-content-indent) + var(--el-menu-level) *
      var(--menu-content-indent)
  ) !important;
  margin-bottom: var(--menu-item-gap);
  font-size: var(--menu-font-size);
  color: var(--menu-content-color);
  text-decoration: none;
  cursor: pointer;
  border-radius: var(--menu-content-radius);
  transition: all 300ms;

  &:hover #{$content-selector}__icon {
    transform: scale(1.2);
  }

  #{$content-selector} {
    &__title {
      max-width: var(--menu-title-width);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      opacity: 1;
    }

    &__icon {
      flex-shrink: 0;
      width: var(--menu-content-icon-size);
      height: var(--menu-content-icon-size);
      margin-right: 8px;
      text-align: center;
      vertical-align: middle;
      transition: transform 250ms !important;
    }
  }
}

@mixin menu-content-state($type, $state) {
  color: var(--menu-#{$type}-#{$state}-color) !important;
  background-color: var(--menu-#{$type}-#{$state}-background-color);
}

.#{$namespace}-menu {
  $sub-menu-title-selector: '.#{$namespace}-sub-menu > .el-sub-menu__title';

  position: relative;
  box-sizing: border-box;
  background: hsl(var(--menu-background-color));

  @include menu-vars;

  // 垂直菜单
  &.is-vertical {
    transition: all 300ms;
    &:not(.is-collapse) > #{$sub-menu-title-selector} {
      padding-left: calc(
        var(--menu-content-indent) - var(--menu-content-margin)
      ) !important;
    }

    // 圆润模式
    &.is-rounded {
      padding: 0 var(--menu-margin);
    }
  }

  // 折叠菜单
  &.is-collapse {
    width: 100% !important;

    .#{$namespace}-menu-content__icon {
      margin-right: 0 !important;
    }

    .#{$namespace}-menu-content__title {
      display: inline-flex;
      flex-shrink: 0;
      height: 0 !important;
      margin-top: 0;
      font-size: 12px;
      font-weight: 400;
      line-height: normal;
      opacity: 0 !important;
      transition: all 250ms ease !important;
    }

    #{$sub-menu-title-selector},
    .#{$namespace}-menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 var(--menu-content-indent) !important;
    }

    .#{$namespace}-sub-menu.is-active > .el-sub-menu__title,
    .#{$namespace}-menu-item.is-active {
      background: var(--menu-item-active-background-color) !important;
    }

    &.is-collapse-show-title {
      .#{$namespace}-menu-content__title {
        height: auto !important;
        margin-top: 8px !important;
        opacity: 1 !important;
      }

      #{$sub-menu-title-selector} {
        height: calc(
          var(--menu-content-height) + (var(--menu-content-height) / 2)
        ) !important;
      }
    }
  }

  &__popup {
    $popup-menu-selector: '.el-menu--vertical > .el-menu';

    .#{$namespace}-sub-menu > .el-sub-menu__title,
    .#{$namespace}-menu-item {
      padding: 0 calc(var(--menu-margin) * 2) !important;
    }

    // 圆润模式
    &.is-rounded > #{$popup-menu-selector} {
      padding: var(--menu-content-margin);
    }

    & > #{$popup-menu-selector} {
      padding-bottom: calc(
        var(--menu-content-margin) - var(--menu-item-gap)
      ) !important;
      border-radius: var(--menu-radius);
    }
  }
}

.#{$namespace}-menu-item {
  background-color: var(--menu-item-background-color);
  @include menu-content;

  &.is-active {
    @include menu-content-state('item', 'active');
  }

  &:hover:not(.is-active) {
    @include menu-content-state('item', 'hover');
  }
}

.#{$namespace}-sub-menu {
  /* expand-icon */
  $icon-selector: '.el-sub-menu__title .el-sub-menu__icon-arrow';

  .el-sub-menu__title {
    background-color: var(--menu-submenu-background-color);
    @include menu-content;

    & > .el-icon.el-sub-menu__icon-arrow {
      right: calc(var(--menu-margin) * 2) !important;
    }
  }

  &.is-active > .el-sub-menu__title {
    @include menu-content-state('submenu', 'active');
  }

  & > .el-sub-menu__title:hover {
    @include menu-content-state('submenu', 'hover');
  }

  #{$icon-selector},
  #{$icon-selector} svg {
    width: var(--menu-content-icon-size);
    height: var(--menu-content-icon-size);
  }

  &.is-opened > #{$icon-selector} {
    transform: rotate(180deg) !important;
  }
}
</style>
