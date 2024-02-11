<template>
  <transition name="slide-fade">
    <div
      v-show="isShowModal"
      class="flex justify-center absolute m-auto left-0 right-0 top-32"
      @click="detailToggle(selectedUser)"
    >
      <div
        class="bg-gray-100 w-96 h-72 p-6 rounded-md shadow-md"
        v-if="selectedUser"
      >
        <div class="flex flex-col justify-center items-center">
          <div class="w-1/4">
            <img :src=" selectedUser.profile_picture " alt="" class= />
          </div>
          <div class="">
            <h2 class="text-lg text-center">
              {{ selectedUser.first_name }}
              {{ selectedUser.last_name }}
            </h2>
            <p class="text-gray-500 text-center text-sm">
              {{ selectedUser.job }}
            </p>
          </div>
        </div>
        <div class="mt-2">
          <h2 class="text-sm">
            <span>Address:</span> {{ selectedUser.state }},
            {{ selectedUser.street }}
          </h2>
          <h2 class="text-sm"><span>Phone: </span>{{ selectedUser.phone }}</h2>
          <h2 class="text-sm"><span>Email: </span>{{ selectedUser.email }}</h2>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const { selectedUser, isShowModal } = defineProps({
  selectedUser: Object,
  isShowModal: Boolean,
  detailToggle: Function,
});
</script>

<style></style>
