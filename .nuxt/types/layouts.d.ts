import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "error"
declare module "/workspaces/clock/clock3/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}