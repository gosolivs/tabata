<template>
	<label class="base-field">
		<span class="base-field__label">
			<slot name="label" />
		</span>

		<slot />
	</label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "BaseField",
});
</script>

<style>
.base-field {
	display: block;
}

.base-field__label {
	display: block;
	font-size: 14px;
	margin: 0 0 4px;
}
</style>
