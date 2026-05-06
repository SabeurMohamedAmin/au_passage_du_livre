<script setup lang="ts">
  const { iconArrowRight } = useRtlIcons();
  defineProps<{
    title: string;
    description: string;
    seeAllLabel: string;
    seeAllLink: string; 
  }>();
</script>

<template>
    <!-- SECTION HEADER -->
    <v-row class="mb-12">
      <v-col cols="12" md="9" lg="8">
        <h2 class="mb-4 text-h5 text-sm-h4 font-weight-black opacity-70">
          {{title}}
        </h2>

        <p class="text-h6 text-medium-emphasis mt-2 font-weight-regular" v-html="description">
         
        </p>
      </v-col>

      <!-- Button -->
      <v-col
        cols="12"
        md="3"
        class="d-flex ms-auto justify-md-end align-start mt-4 mt-md-0"
      >
        <v-btn
          color="primary"
          variant="outlined"
          class="font-weight-bold text-body-1 rounded-xl"
          :to="$localePath(seeAllLink)"
        >
          {{seeAllLabel}}
          <v-icon end :icon="iconArrowRight"/>
        </v-btn>
      </v-col>
    </v-row>
    <!-- RESPONSIVE CARDS GRID -->
    <notre-mission-content/>
</template>

<style lang="css" scoped>
</style>