<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create new Registration</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          

          <div class="mb-3">
            <label for="startdate" class="form-label">Start Date</label>
            <input
              type="date"
              class="form-control"
              id="startdate"
              v-model="newRegistration.startDate"
              required
            />
          </div>
          <!-- <div class="mb-3">
            <label for="enddate" class="form-label">End Date</label>
            <input
              type="date"
              class="form-control"
              id="enddate"
              v-model="newRegistration.endDate"
              required
            />
          </div> -->
          <div class="mb-3">
            <label for="mount" class="form-label">Amount</label>
            <input
              type="number"
              class="form-control"
              id="mount"
              v-model="newRegistration.amount"
              required
            />
          </div>

          <div class="mb-3">
            <label for="student" class="form-label">Student</label>
            <select
              class="form-select"
              v-model="newRegistration.studentId"
              required
            >
              <option value="" disabled>Select Student</option>
              <option v-for="student in students" :key="student.id" :value="student.id">
                {{ student.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="module" class="form-label">Module</label>
            <select
              class="form-select"
              v-model="newRegistration.moduleId"
              required
            >
              <option value="" disabled>Select Module</option>
              <option v-for="module in modules" :key="module.id" :value="module.id">
                {{ module.name }}
              </option>
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
import { ref, onMounted } from 'vue';



import { useGestionModuleStore } from '../../store/gestionModule';
import { useGestionStore } from '../../store/gestionRegister';
import { useToast } from 'vue-toastification';
import { useGestionStudentStore } from '../../store/gestionStudent';

const storeModule = useGestionModuleStore()
const store = useGestionStore();
const toast = useToast();

const emit = defineEmits(['close', 'registrationAdded']);
const storeStudent = useGestionStudentStore()
const students = ref([]);
const modules = ref([]);

const newRegistration = ref({
  date: new Date(),
  startDate: '',
  
  amount: '',
  studentId: '',
  moduleId: '',
});

function closeModal() {
  emit('close');
}

const resetForm = () => {
  newRegistration.value = {
    date: '',
    startDate: '',
    
    amount: '',
    studentId: '',
    moduleId: '',
  };
};

const onSubmit = () => {
  console.log(newRegistration.value);

  store.addRegistration(newRegistration.value);
  toast.success('Registration added successfully!');
  resetForm();
  closeModal();
  emit('registrationAdded');
};

const fetchStudentsAndModules = async () => {
  students.value = await storeStudent.fetchStudents();
  modules.value = await storeModule.fetchModules();
  console.log(students.value);
  console.log(modules.value);
  
};

onMounted(fetchStudentsAndModules);
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