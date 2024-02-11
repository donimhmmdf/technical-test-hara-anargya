<template>
  <h2>Overview</h2>
  <div class="container pb-32">
    <div class="pt-4">
      <div class="card bg-white rounded-md shadow-lg">
        <div class="flex justify-between items-center">
          <h2 class="p-4 text-base text-primary font-semibold">
            Daftar Pengguna
          </h2>
        </div>

        <table
          v-if="users.length > 0"
          class="table-fixed w-full text-sm text-left rtl:text-right text-gray-500"
        >
          <thead class="text-gray-500 bg-gray-100 border rounded-md">
            <tr>
              <th scope="col" class="py-3 px-1 w-8 text-center">ID</th>
              <th scope="col" class="py-3 px-1">Nama</th>
              <th scope="col" class="py-3 px-1">Tanggal Lahir</th>
              <th scope="col" class="py-3 px-1">Email</th>
              <th scope="col" class="py-3 px-1">Pekerjaan</th>
              <th
                scope="col"
                class="py-3 px-1 flex gap-2 cursor-pointer items-center"
                @click="sort('provinsi')"
              >
                Provinsi
                <svg
                  fill="#a0aec0"
                  height="15px"
                  width="15px"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 490 490"
                  xml:space="preserve"
                >
                  <g>
                    <polygon
                      points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 
		0,194.27 37.087,221.213 	"
                    />
                    <polygon
                      points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 
		490,295.715 452.913,268.802 	"
                    />
                  </g>
                </svg>
              </th>
              <th scope="col" class="py-3 px-1">Kota</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b"
              v-for="user in sortUsers"
              :key="user.id"
            >
              <td class="py-2 px-1 text-center">{{ user.id }}</td>
              <td class="">{{ user.first_name }} {{ user.last_name }}</td>
              <td class="text-primary">{{ user.date_of_birth }}</td>
              <td class="">{{ user.email }}</td>
              <td class="py-2 px-1 text-primary">{{ user.job }}</td>
              <td class="py-2 px-1">{{ user.provinsi }}</td>
              <td class="py-2 px-1 text-primary">{{ user.kota }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="text-center p-3 text-gray-400">
          Data pengguna kosong
        </div>
      </div>
    </div>

    <Button
      @click="toggleShowAdd()"
      class="mt-4 text-white mb-3 bg-green-500 p-2 text-sm hover:bg-opacity-80 transition duration-300 ease-in-out rounded-md"
      >Tambah Pengguna</Button
    >
    <transition name="fade">
      <div class="flex flex-col" v-if="isShowAdd">
        <input
          type="text"
          placeholder="Username"
          class="w-full p-2 rounded-md ring-1"
          v-model="inputData.username"
        />
        <div class="flex flex-row gap-2 mt-2">
          <div class="w-1/2">
            <input
              type="text"
              class="w-full p-2 rounded-md ring-1"
              placeholder="Nama Depan"
              v-model="inputData.firstName"
            />
          </div>
          <div class="w-1/2">
            <input
              type="text"
              class="w-full p-2 rounded-md ring-1"
              placeholder="Nama Belakang"
              v-model="inputData.lastName"
            />
          </div>
        </div>
        <div class="flex flex-row gap-2 mt-2">
          <div class="w-1/2">
            <input
              type="text"
              class="w-full p-2 rounded-md ring-1"
              placeholder="Email"
              v-model="inputData.email"
            />
          </div>
          <div class="w-1/2">
            <input
              type="text"
              class="w-full p-2 rounded-md ring-1"
              placeholder="Pekerjaan"
              v-model="inputData.job"
            />
          </div>
        </div>

        <input
          type="text"
          placeholder="Tanggal Lahir"
          class="w-full p-2 rounded-md ring-1 mt-2"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
          v-model="inputData.dateOfBirth"
        />
        <div class="flex flex-row gap-2 mt-2">
          <div class="">
            <select
              name=""
              id=""
              v-model="selectedProvinsi"
              class="p-2 ring-1 rounded-md"
            >
              <option value="">Pilih Provinsi</option>
              <option
                v-for="item in filteredProvinsi"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="w-1/2">
            <select v-model="selectedKota" class="p-2 ring-1 rounded-md">
              <option value="">Pilih Kota</option>
              <option v-for="kota in filteredKota" :key="kota.id" :value="kota">
                {{ kota.name }}
              </option>
            </select>
          </div>
        </div>
        <button
          class="mt-4 text-white bg-green-500 p-2 text-sm hover:bg-opacity-80 transition duration-300 ease-in-out rounded-md"
          @click="addUser"
        >
          Tambahkan
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import city from "../assets/js/city";
import province from "../assets/js/province";

const kota = ref(city);
const provinsi = ref(province);
const selectedProvinsi = ref("");
const selectedKota = ref("");
const isShowAdd = ref(false);
const currentSortDir = ref("asc");
const currentSort = ref("provinsi");
const users = ref([
  {
    id: "1",
    first_name: "Bagas",
    last_name: "Sidik",
    date_of_birth: "2001-02-03",
    job: "UIUX",
    email: "sidikb@gmail.com",
    provinsi: 1,
    kota: "KABUPATEN ACEH SELATAN",
  },
  {
    id: "2",
    first_name: "Dayat",
    last_name: "Mustopa",
    date_of_birth: "2001-06-03",
    job: "Web Developer",
    email: "dayatm@gmail.com",
    provinsi: 16,
    kota: "KABUPATEN LEBAK",
  },
  {
    id: "3",
    first_name: "Gialng",
    last_name: "Hayat",
    date_of_birth: "2000-02-03",
    job: "Backend Developer",
    email: "gilangh@gmail.com",
    provinsi: 15,
    kota: "KABUPATEN MOJOKERTO",
  },
  {
    id: "4",
    first_name: "Bagas",
    last_name: "Sidik",
    date_of_birth: "2001-02-03",
    job: "UIUX",
    email: "sidikb@gmail.com",
    provinsi: 12,
    kota: "KABUPATEN BOGOR",
  },
]);
const inputData = reactive({
  username: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  job: "",
});
const filteredKota = computed(() => {
  return kota.value.filter((kota) => {
    if (selectedProvinsi.value.length == 0) {
      return kota;
    } else {
      return kota.provinsi_id === selectedProvinsi.value;
    }
  });
});
const filteredProvinsi = computed(() => {
  return provinsi.value.filter((provinsi) => {
    if (selectedKota.value.length == 0) {
      return provinsi;
    } else {
      return provinsi.id === selectedKota.value.provinsi_id;
    }
  });
});
const addUser = () => {
  for (const key in inputData) {
    if (!inputData[key]) {
      alert("Harap isi data terlebih dahulu");
      return;
    }
  }
  users.value.push({
    id: users.value.length + 1,
    user: inputData.username,
    first_name: inputData.firstName,
    last_name: inputData.lastName,
    date_of_birth: inputData.dateOfBirth,
    email: inputData.email,
    job: inputData.job,
    provinsi: selectedProvinsi.value,
    kota: selectedKota.value.name,
  });
  Object.keys(inputData).forEach((key) => {
    inputData[key] = "";
  });
  selectedProvinsi.value = "";
  selectedKota.value = "";
};
const toggleShowAdd = () => {
  isShowAdd.value = !isShowAdd.value;
};
const sort = (param) => {
  if (param === currentSort.value) {
    currentSortDir.value = currentSortDir.value === "asc" ? "desc" : "asc";
  }
  currentSort.value = param;
};

const usersFiltered = computed(() => {
  return users.value.map((user) => {
    return {
      ...user,
      provinsi:
        provinsi.value.find((prov) => prov.id === user.provinsi)?.name || "",
    };
  });
});
const sortUsers = computed(() => {
  return usersFiltered.value.sort((a, b) => {
    let modifier = 1;
    if (currentSortDir.value === "desc") modifier = -1;
    if (a[currentSort.value] < b[currentSort.value]) return -1 * modifier;
    if (a[currentSort.value] > b[currentSort.value]) return 1 * modifier;
    return 0;
  });
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
