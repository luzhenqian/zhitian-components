<template>
  <div>
    <my-counter />
    <my-counter />
  </div>
</template>

<script>
import Counter from "./counter.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "test",
  components: { "my-counter": Counter },
});
</script>
