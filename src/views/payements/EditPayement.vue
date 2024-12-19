<template>
    <div class="modal-overlay">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit Payment</h5>
        </div>
        <div class="modal-body">
          <form @submit.prevent="onSubmit">
            <div class="mb-3">
              <label for="payer" class="form-label">Payer</label>
              <input
                type="text"
                class="form-control"
                id="payer"
                v-model="payment.payer"
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="paymentNumber" class="form-label">Payment Number</label>
              <input
                type="text"
                class="form-control"
                id="paymentNumber"
                v-model="payment.paymentNumber"
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="paymentMode" class="form-label">Payment Mode</label>
              <select class="form-select" aria-label="Default select example" v-model="payment.paymentMode">
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
                v-model="payment.amount"
                required
              />
            </div>
  
            <div class="mb-3">
              <label for="student" class="form-label">Student</label>
              <select
                class="form-select"
                v-model="payment.studentId"
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
                v-model="payment.moduleId"
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
 
  import { useGestionStudentStore } from '../../store/gestionStudent';
  import { useGestionModuleStore } from '../../store/gestionModule';
import { useGestionPayementStore } from '../../store/gestionPayment';
  
  const store = useGestionPayementStore();
  const storeStudent = useGestionStudentStore();
  const storeModule = useGestionModuleStore();
  const toast = useToast();
  
  const props = defineProps({
    paymentId: Number,
    add: Boolean
  });
  const emit = defineEmits(['close', 'paymentUpdated']);
  
  const payment = ref({
    payer: '',
    paymentNumber: '',
    paymentMode: '',
    amount: '',
    studentId: '',
    moduleId: '',
  });
  
  const editPayment = (paymentData) => {
    payment.value = { ...paymentData };
  };
  
  onMounted(() => {
    if (store.currentIndex !== null && store.currentIndex >= 0 && store.currentIndex < store.payements.length) {
      editPayment(store.payements[store.currentIndex]);
    }
  });
  
  watch(() => store.currentIndex, (newIndex) => {
    if (newIndex !== null && newIndex >= 0 && newIndex < store.payements.length) {
      editPayment(store.payements[newIndex]);
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
  
  const onSubmit = async () => {
    try {
      await store.updatePayement(payment.value.id, payment.value);
      toast.success('Payment updated successfully');
      closeModal();
      emit('paymentUpdated');
    } catch (error) {
      toast.error('Error updating payment: ' + error.message);
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