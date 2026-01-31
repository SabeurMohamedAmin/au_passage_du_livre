<script setup lang="ts">
  import GuestsHeader from '@/components/guest/GuestsHeader.vue';
  import GuestsCTA from '@/components/guest/GuestsCTA.vue';
  
</script>

<template>
  <v-container class="py-6">
    <featured-guests-slider/>
    
    <!-- SECTION ALL GUESTS GRID -->
    <section id="all_guest">
      <guests-header/>
      
      <all-guests-grid/>
    </section>

    <!-- Become an Intervenant -->
    <GuestsCTA />
  </v-container>
</template>