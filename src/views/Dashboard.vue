<template>
  <div class="container mb-10">
    <div class="flex gap-3">
      <Card></Card>
    </div>
    <div class="pt-4">
      <div v-if="loaded" class="card bg-white rounded-md shadow-lg">
        <h2 class="p-4 text-base text-primary font-semibold">User List</h2>
        <table class="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead class="text-gray-500 bg-gray-100 border rounded-md">
            <tr>
              <th scope="col" class="px-4 py-3">ID</th>
              <th scope="col" class="px-4 py-3">User</th>
              <th scope="col" class="px-4 py-3">Date Of Birth</th>
              <th scope="col" class="px-4 py-3">Email</th>
              <th scope="col" class="px-4 py-3">Job</th>
              <th scope="col" class="px-4 py-3">Country</th>
              <th scope="col" class="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b" v-for="user in users" :key="user.id">
              <td class="px-4 py-2">{{ user.id }}</td>
              <td class="px-4 py-2 text-primary">{{ user.first_name }}</td>
              <td class="px-5 py-2">
                {{ ubahFormatTanggal(user.date_of_birth) }}
              </td>
              <td class="px-4 py-2 text-primary">{{ user.email }}</td>
              <td class="px-4 py-2">{{ user.job }}</td>
              <td class="px-4 py-2 text-primary">{{ user.country }}</td>
              <td class="px-4 py-2 text-center flex">
                <button
                  class="text-primary border text-sm px-2 py-1 mr-2 rounded-lg"
                >
                  Select
                </button>
                <button
                  @click="detailToggle(user)"
                  class="text-primary border px-2 py-1 rounded-lg"
                >
                  Detail
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="text-center h-28 flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <ModalBox
      :selectedUser="selectedUser"
      :isShowModal="isShowModal"
      :detailToggle="detailToggle"
    ></ModalBox>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import ModalBox from "../components/ModalBox.vue";
import Card from "../components/Card.vue";

const users = ref({});
const loaded = ref(false);
const selectedUser = ref(null);
const isShowModal = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get(
      "https://api.slingacademy.com/v1/sample-data/users"
    );
    users.value = response.data.users;
    loaded.value = true;
  } catch (error) {
    console.log(error.message);
  }
});
const ubahFormatTanggal = (tanggalAwal) => {
  const date = new Date(tanggalAwal);
  const tahun = date.getFullYear();
  const bulan = (date.getMonth() + 1).toString().padStart(2, "0");
  const tanggal = date.getDate().toString().padStart(2, "0");
  return `${tahun}/${bulan}/${tanggal}`;
};
const detailToggle = (user) => {
  selectedUser.value = user;
  isShowModal.value = !isShowModal.value;
  console.log(selectedUser.value);
};
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
