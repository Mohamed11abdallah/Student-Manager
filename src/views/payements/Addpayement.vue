<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create new Payment</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
           
  
            <div class="mb-3">
              <label for="payer" class="form-label">Payer</label>
              <input
                type="text"
                class="form-control"
                id="payer"
                v-model="newPayment.payer"
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="payerNumber" class="form-label">Payment Number</label>
              <input
                type="text"
                class="form-control"
                id="payerNumber"
                v-model="newPayment.payerNumber"
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="paymentMode" class="form-label">Payment Mode</label>
              <select class="form-select" aria-label="Default select example" v-model="newPayment.paymentMode">
  <option selected>Select Mode</option>
  <option value="CARD">CARD</option>
  <option value="BANK_TRANSFER">BANK_TRANSFER</option>
  <option value="CASH">CASH</option>
  
</select>
            </div>
  
            <div class="mb-3">
              <label for="amount" class="form-label">Amount</label>
              <input
                type="number"
                class="form-control"
                id="amount"
                v-model="newPayment.amount"
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="student" class="form-label">Student</label>
              <select
                class="form-select"
                v-model="newPayment.studentId"
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
                v-model="newPayment.moduleId"
                required
              >
                <option value="" disabled>Select Module</option>
                <option v-for="module in modules" :key="module.id" :value="module.id">
                  {{ module.name }}
                </option>
              </select>
            </div>
            <div class="mb-3">
              <label for="module" class="form-label"> Id of  Registration</label>
              <input
                type="number"
                class="form-control"
                id="amount"
                v-model="newPayment.registrationId"
                required
              />
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
 
  import { useToast } from 'vue-toastification';
  import { useGestionStudentStore } from '../../store/gestionStudent';
import { useGestionPayementStore } from '../../store/gestionPayment';
  
  const storeModule = useGestionModuleStore();
  const storePayment =  useGestionPayementStore();
  const toast = useToast();
  const storeStudent = useGestionStudentStore();
  
  const emit = defineEmits(['close', 'paymentAdded']);
  const students = ref([]);
  const modules = ref([]);
  
  const newPayment = ref({
    paymentDate: new Date(),
    payer: '',
    payerNumber: '',
    paymentMode: '',
    amount: null,
    studentId: null,
    moduleId: null,
    registrationId: null
  });
  
  function closeModal() {
    emit('close');
  }
  
  const resetForm = () => {
    newPayment.value = {
      paymentDate: '',
      payer: '',
      payerNumber: '',
      paymentMode: '',
      amount: null,
      studentId: null,
      moduleId: null,
      registrationId: null
    };
  };
  
  const onSubmit = () => {
    console.log(newPayment.value);
    storePayment.addPayment(newPayment.value);
    toast.success('Payment added successfully!');
    resetForm();
    closeModal();
    emit('paymentAdded');
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