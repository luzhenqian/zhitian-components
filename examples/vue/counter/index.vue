<template>
  <div>
    <my-counter />
    <my-counter />
  </div>
</template>

<script>
import Counter from "./component/counter";
import { defineComponent } from "vue";

export default defineComponent({
  name: "test",
  components: { "my-counter": Counter },
});
</script>
