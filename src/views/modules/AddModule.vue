<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create new Module</h5>
          
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
        <input type="number"
          class="form-control"
          id="duration"
         v-model="newModule.duration"
          required
        >
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input type="number"
          class="form-control"
          id="price"
         v-model="newModule.price"
          required
        >
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Status</label>
        <select class="form-select" aria-label="Default select example" v-model="newModule.status">
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
          <button type="submit" class="btn btn-primary">
             Confirm
          </button>
        </div>
    </form>
        </div>
        
        
      </div>
    </div>
    
</template>
<script setup>
import { useRouter } from 'vue-router';



import { ref } from 'vue';
import { useGestionModuleStore } from '../../store/gestionModule';

const store = useGestionModuleStore()
const router = useRouter()


import { defineProps, defineEmits } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast()
const props = defineProps({
  add: Boolean
});

const emit = defineEmits(['close', "moduleAdded"]);

function closeModal() {
  emit('close'); 
}


 const newModule = ref({ name: "", duration: "", price: null, status: "" });



 const resetForm = () => {
    newModule.value = { name: "", duration: "", price: null, status: "" }
};

const onSubmit = () => {
  console.log(newModule.value); // Affiche correctement les données de l'étudiant

  store.addModule(
    newModule.value
  );
  toast.success("module added successfully !");
  resetForm();

  closeModal();
  emit("moduleAdded")
};


</script>
<style scoped>
#carouselExampleControls .carousel-item img{
  height: 100vh;
}
          .carousel-item img{
  height: 200px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
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