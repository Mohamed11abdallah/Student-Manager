<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Module</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="newModule.name"
              required
            />
          </div>

          <div class="mb-3">
            <label for="duration" class="form-label">Duration</label>
            <input
              type="number"
              class="form-control"
              id="duration"
              v-model="newModule.duration"
              required
            />
          </div>
          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model="newModule.price"
              required
            />
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="newModule.status"
            >
              <option selected>Select Status</option>
              <option value="BEGINNER">BEGINNER</option>
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="ADVANCED">ADVANCED</option>
            </select>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";

import { ref, watch, onMounted } from "vue";

const store = useGestionModuleStore();
const router = useRouter();
import { defineProps, defineEmits } from "vue";
import { useGestionModuleStore } from "../../store/gestionModule";
import { useToast } from "vue-toastification";

const props = defineProps({
  add: Boolean,
});

const emit = defineEmits(["close", "ModuleAdded"]);

function closeModal() {
  emit("close");
}

const newModule = ref({ name: "", duration: "", price: null, status: "" });
const toast = useToast();

const editModule = (module) => {
  console.log("Module à éditer:", module); // Vérifier les données du module avant modification
  newModule.value = { ...module };
};

// Vérifier que le bon module est sélectionné
onMounted(() => {
  console.log("Modules disponibles lors du montage:", store.modules);
  console.log("Index du module à éditer:", store.currentIndex); // Vérifier l'index avant de l'utiliser
  if (
    store.currentIndex !== null &&
    store.currentIndex >= 0 &&
    store.currentIndex < store.modules.length
  ) {
    editModule(store.modules[store.currentIndex]);
  }
});

watch(
  () => store.currentIndex,
  (newIndex) => {
    console.log("Index du module sélectionné :", newIndex); // Vérifier l'index du module
    if (newIndex !== null && newIndex >= 0 && newIndex < store.modules.length) {
      editModule(store.modules[newIndex]);
    }
  }
);

const resetForm = () => {
  newModule.value = ref({ name: "", duration: "", price: null, status: "" });
};

const onSubmit = async () => {
  try {
    console.log("ID du module à mettre à jour :", newModule.value.id); // Vérifier l'ID du module
    console.log("Données envoyées à l'API : ", newModule.value); // Vérifier les données envoyées

    await store.updateModule(newModule.value.id, {
      name: newModule.value.name,
      duration: newModule.value.duration,
      price: newModule.value.price,
      status: newModule.value.status,
    });

    toast.success("Module modifié avec succès");
    resetForm();
    closeModal();
    emit("moduleAdded");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du module :", error);
    toast.error("Erreur lors de la mise à jour du module : " + error.message);
  }
};
</script>
<style scoped>
#carouselExampleControls .carousel-item img {
  height: 100vh;
}
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
