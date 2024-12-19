<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { useGestionStore } from "../../store/gestionRegister";
import { onMounted, ref } from "vue";
const students = ref([]);
import AddRegister from "../register/AddRegister.vue";
import { useToast } from "vue-toastification";
import EditRegister from "./EditRegister.vue";
const store = useGestionStore();
const showDetails = ref(false);
const selectedRegistration = ref(null);
const add = ref(false);
const editC = ref(false);

function editCust() {
  editC.value = true;
}
const toast = useToast();
const viewDetails = (registration) => {
  selectedRegistration.value = registration;
  showDetails.value = true;
};
function formatDate(date) {
  if (!date) return ""; // Vérifie si la date est valide
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("fr-FR", options).format(new Date(date));
}

function newCust() {
  add.value = true;
}
function openModal(registration) {
  selectedRegistration.value = registration;
}

function closeModal() {
  showDetails.value = false;
  selectedRegistration.value = null;
}
const registrations = ref([]);
async function getRegistration() {
  try {
    registrations.value = await store.fetchRegistrations();
    console.log(registrations.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des apprenant:", error);
  }
}

onMounted(async () => {
  await getRegistration();
});

const selectedRegistre = ref(null);
const destroy = (registration) => {
  selectedRegistre.value = registration; // Assigner l'administrateur sélectionné
  if (!selectedRegistre.value) {
    toast.error("Aucun student sélectionné");
    return;
  }
  if (window.confirm("Confirm the deletion of this student")) {
    const index = registrations.value.findIndex(
      (registration) => registration.id === selectedRegistre.value.id
    );
    if (index !== -1) {
      const registrationId = registrations.value[index].id;
      store.deleteRegistration(registrationId);
      registrations.value.splice(index, 1);
      toast.success("student supprimé avec succès");
    } else {
      toast.error("student non trouvé");
    }
  }
};
</script>

<template>
  <NavBar />
  <div class="container mb-4 mt-4">
    <h2>List of Registers</h2>
  </div>
  <div class="container d-flex justify-content-end mb-2">
    <button class="btn btn-info" @click="newCust()">
      <i class="fa fa-user-plus" aria-hidden="true"></i> Add New Registration
    </button>
  </div>

  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Date Register</th>
          <th scope="col">Start</th>
          <th scope="col">End</th>
          <th scope="col">Amount</th>
          <th scope="col">Module</th>
          <th scope="col">Student</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(registration, index) in registrations"
          :key="registration.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(registration.dateRegister) }}</td>
          <td>{{ formatDate(registration.startDate) }}</td>
          <td>{{ formatDate(registration.endDate) }}</td>
          <td>{{ registration.amount }} MRU</td>
          <td>{{ registration.module ? registration.module.name : "N/A" }}</td>
          <td>
            {{ registration.student ? registration.student.fullName : "N/A" }}
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="openModal(registration)"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-warning" @click="editCust()">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="destroy(registration)"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal-overlay" v-if="selectedRegistration">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Registration</h5>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="closeModal"
        >
          <i class="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
      <div class="modal-body">
        <ul>
          <li>
            <strong>Student Name :</strong>
            {{ selectedRegistration.student?.fullName }}
          </li>
          <li>
            <strong>Email :</strong> {{ selectedRegistration.student?.email }}
          </li>
          <li>
            <strong>Module Name :</strong>
            {{ selectedRegistration.module?.name }}
          </li>
          <li>
            <strong>Module Duration :</strong>
            {{ selectedRegistration.module?.duration }}
          </li>
          <li>
            <strong>Module Price :</strong>
            {{ selectedRegistration.module?.price }} MRU
          </li>
          <li><strong>Status :</strong> {{ selectedRegistration.status }}</li>
        </ul>
      </div>
    </div>
  </div>

  <AddRegister
    v-if="add"
    :add="add"
    @close="add = false"
    @registrationAdded="getRegistration()"
  />
  <EditRegister
    v-if="editC"
    :editC="editC"
    @close="editC = false"
    @registrationAdded="getRegistration()"
  />
</template>

<style scoped>
.carousel-item img {
  height: 200px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  max-width: 600px;
  width: 100%;
  padding: 1rem;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  margin: 0;
}

.btn-close {
  background: white;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.modal-body {
  padding: 1rem 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
