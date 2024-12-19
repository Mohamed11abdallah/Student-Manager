<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { useGestionModuleStore } from "../../store/gestionModule";
import { onMounted, ref } from "vue";
import EditModule from "./EditModule.vue";
import AddModule from "./AddModule.vue";
import { useToast } from "vue-toastification";

const store = useGestionModuleStore();

const showDetails = ref(false);
const selectedModule = ref(null);
const add = ref(false);
const editC = ref(false);
const toast = useToast();
function editCust() {
  editC.value = true;
}
const viewDetails = (module) => {
  selectedModule.value = module;
  showDetails.value = true;
};

function newCust() {
  add.value = true;
}
function openModal(module) {
  selectedModule.value = module;
}

function closeModal() {
  showDetails.value = false;
  selectedModule.value = null;
}
const modules = ref([]);
async function getModule() {
  try {
    modules.value = await store.fetchModules();
    console.log(modules.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des module:", error);
  }
}

onMounted(async () => {
  await getModule();
});

const selectedModu = ref(null);
const destroy = (module) => {
  selectedModu.value = module; // Assigner l'administrateur sélectionné
  if (!selectedModu.value) {
    toast.error("Aucun module sélectionné");
    return;
  }
  if (window.confirm("Confirm the deletion of this module")) {
    const index = modules.value.findIndex(
      (module) => module.id === selectedModu.value.id
    );

    if (index !== -1) {
      const moduleId = modules.value[index].id;
      console.log(moduleId);

      store.deleteModule(moduleId);
      modules.value.splice(index, 1);
      toast.success("module supprimé avec succès");
    } else {
      toast.error("module non trouvé");
    }
  }
};
</script>

<template>
  <NavBar />
  <div class="container mb-4 mt-4">
    <h2>List of Modules</h2>
  </div>
  <div class="container d-flex justify-content-end mb-2">
    <button class="btn btn-info" @click="newCust()">
      <i class="fa fa-user-plus" aria-hidden="true"></i> Add New Module
    </button>
  </div>

  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Module Name</th>

          <th scope="col">Duration</th>
          <th scope="col">Price</th>
          <th scope="col">Status</th>

          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(module, index) in modules" :key="module.id">
          <td>{{ index + 1 }}</td>
          <td>{{ module.name }}</td>
          <td>{{ module.duration }} jours</td>

          <td>{{ module.price }}</td>
          <td>{{ module.status }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="openModal(module)"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-warning" @click="editCust()">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="destroy(module)"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal-overlay" v-if="selectedModule">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Student</h5>
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
          <li><strong>Student Name :</strong> {{ selectedModule.name }}</li>
          <li>
            <strong>Duration :</strong> {{ selectedModule.duration }} jours
          </li>
          <li><strong>Price :</strong> {{ selectedModule.price }}</li>
          <li><strong>Status :</strong> {{ selectedModule.status }}</li>
        </ul>
      </div>
    </div>
  </div>

  <AddModule
    v-if="add"
    :add="add"
    @close="add = false"
    @moduleAdded="getModule()"
  />
  <EditModule
    v-if="editC"
    :editC="editC"
    @close="editC = false"
    @moduleAdded="getModule()"
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
