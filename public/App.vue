<template>
   <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <h2>Airbnb</h2>

      <v-spacer></v-spacer>

      <v-btn
        target="_blank"
        text
      >
        <span class="mr-2">Share</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';


export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
