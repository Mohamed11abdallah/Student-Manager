<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Registration</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="date" class="form-label">Registration Date</label>
            <input
              type="date"
              class="form-control"
              id="date"
              v-model="registration.date"
              required
            />
          </div>

          <div class="mb-3">
            <label for="startdate" class="form-label">Start Date</label>
            <input
              type="date"
              class="form-control"
              id="startdate"
              v-model="registration.startDate"
              required
            />
          </div>
          
          <div class="mb-3">
            <label for="mount" class="form-label">Amount</label>
            <input
              type="number"
              class="form-control"
              id="mount"
              v-model="registration.amount"
              required
            />
          </div>

          <div class="mb-3">
            <label for="student" class="form-label">Student</label>
            <select
              class="form-select"
              v-model="registration.studentId"
              required
            >
              <option value="" disabled>Select Student</option>
              <option
                v-for="student in students"
                :key="student.id"
                :value="student.id"
              >
                {{ student.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="module" class="form-label">Module</label>
            <select
              class="form-select"
              v-model="registration.moduleId"
              required
            >
              <option value="" disabled>Select Module</option>
              <option
                v-for="module in modules"
                :key="module.id"
                :value="module.id"
              >
                {{ module.name }}
              </option>
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
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { defineProps, defineEmits } from 'vue';
import { useGestionStore } from '../../store/gestionRegister';
import { useGestionStudentStore } from '../../store/gestionStudent';
import { useGestionModuleStore } from '../../store/gestionModule';

const store = useGestionStore();
const storeStudent = useGestionStudentStore();
const storeModule = useGestionModuleStore();
const toast = useToast();

const props = defineProps({
  registrationId: Number,
  add: Boolean
});
const emit = defineEmits(['close', 'registrationAdded']);

const registration = ref({
  date: '',
  startDate: '',
  
  amount: '',
  studentId: '',
  moduleId: '',
});
const editRegister = (register) => {
  
    
  registration.value = { ...register };
  

};

onMounted(() => {
  if (store.currentIndex !== null && store.currentIndex >= 0 && store.currentIndex < store.registrations.length) {
    editRegister(store.registrations[store.currentIndex]);
  }
});

  watch(() => store.currentIndex, (newIndex) => {
    if (newIndex !== null && newIndex >= 0 && newIndex < store.registrations.length) {
      editRegister(store.registrations[newIndex]);
    }
  });

const students = ref([]);
const modules = ref([]);

const closeModal = () => {
  emit('close');
};

const fetchStudentsAndModules = async () => {
  students.value = await storeStudent.fetchStudents();
  modules.value = await storeModule.fetchModules();
};

// const loadRegistration = () => {
//   if (props.registrationId) {
//     const reg = store.getRegistrationById(props.registrationId);
//     if (reg) {
//       registration.value = { ...reg };
//     }
//   }
// };

const onSubmit = async () => {
  try {
    
    

    await store.updateRegistration(registration.value.id, 
    registration.value
    );

    toast.success("Student modifié avec succès");
    
    closeModal();
    emit("registrationAdded")
  } catch (error) {
    if (error.response && error.response.data.errors) {
      serverErrors.value = error.response.data.errors;
    }
    toast.error("Erreur lors de la mise à jour de l'Student : " + error.message);
  }
};

onMounted(() => {
  fetchStudentsAndModules();
 
});


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