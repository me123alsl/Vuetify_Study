<template>
  <div>
    <v-app>
      <v-navigation-drawer
        rail
        expand-on-hover
        app
      >
        <v-list dense density="compact" nav>
          <v-list-item v-for="menu in menus"
            :key="menu.value"
            :prepend-icon="menu.prependIcon"
            :title="menu.title"
            :to="menu.to"
            :value="menu.value"
          />
        </v-list>
        <template v-slot:append>
            <v-list-item prepend-icon="mdi-logout" color="error" block to="/logout">
              Logout
            </v-list-item>
        </template>
      </v-navigation-drawer>
      <v-main app>
        <v-container>
          <Breadcrumbs></Breadcrumbs>
          <router-view></router-view>
        </v-container>
      </v-main>
      <v-footer app>
      </v-footer>
    </v-app>
  </div>
</template>
<script setup>
import sidebarMenu from '@/menu/sidebar';
import Breadcrumbs from '@/layouts/default/LayoutBreadcrumbs.vue';
const menus = sidebarMenu;
</script>
