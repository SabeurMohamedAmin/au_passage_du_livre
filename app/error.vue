<script setup lang="ts">
  const props = defineProps<{
    error: {
      statusCode?: number
      statusMessage?: string
      message?: string
    }
  }>();

  const isPopup = computed(() => {
    return typeof window !== 'undefined' && window.opener
  });

  const message = computed(() => {
    if (props.error?.statusCode === 401) {
      return 'You already have an account. Please use the login page.'
    }

    return (
      props.error?.message ||
      'Please create an account before logging in and try again.'
    )
  });

  onMounted(() => {
    if (!isPopup.value) return

    // Notify parent window
    window.opener.postMessage(
      {
        type: 'OAUTH_ERROR',
        statusCode: props.error?.statusCode,
        message: message.value,
      },
      window.location.origin
    )

    // Give user time to read, then close
    setTimeout(() => {
      window.close()
    }, 100)
  });

</script>

<template>
  <div class="popup-error">
    <h2>
      {{ error?.statusCode || 'Error' }}
    </h2>
    <p>
      {{ message }}
    </p>

    <small v-if="isPopup">
      This window will close automatically…
    </small>
  </div>
</template>

<style scoped>
  .popup-error {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 24px;
  }

  h2 {
    font-size: 28px;
    margin-bottom: 8px;
  }

  p {
    opacity: 0.8;
    max-width: 320px;
  }

  small {
    margin-top: 16px;
    font-size: 12px;
    opacity: 0.6;
  }
</style>
