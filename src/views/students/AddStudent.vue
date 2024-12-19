<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Create new Student</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">Student Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="newStudent.fullName"
              required
            />
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              v-model="newStudent.email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              v-model="newStudent.phoneNumber"
              required
            />
          </div>
          <div class="mb-3">
            <label for="adress" class="form-label">Adress</label>
            <input
              type="text"
              class="form-control"
              id="adress"
              v-model="newStudent.address"
              required
            />
          </div>
          <div class="mb-3">
            <label for="tutor" class="form-label">Tutor</label>
            <input
              type="text"
              class="form-control"
              id="tutor"
              v-model="newStudent.tutor"
              required
            />
          </div>
          <div class="mb-3">
            <label for="status" class="form-label">Status</label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="newStudent.status"
            >
              <option selected>Select Status</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
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

import { ref } from "vue";
import { useGestionStudentStore } from "../../store/gestionStudent";

const store = useGestionStudentStore();
const router = useRouter();

import { defineProps, defineEmits } from "vue";
import { useToast } from "vue-toastification";
const toast = useToast();
const props = defineProps({
  add: Boolean,
});

const emit = defineEmits(["close", "studentAdded"]);

function closeModal() {
  emit("close");
}

const newStudent = ref({
  fullName: "",
  email: "",
  address: "",
  tutor: "",
  status: "",
  phoneNumber: null,
});

const resetForm = () => {
  newStudent.value = {
    fullName: "",
    email: "",
    address: "",
    tutor: "",
    status: "",
    phoneNumber: "",
  };
};

const onSubmit = () => {
  console.log(newStudent.value); // Affiche correctement les données de l'étudiant

  store.addStudent(newStudent.value);
  toast.success("Student added successfully !");
  resetForm();

  closeModal();
  emit("studentAdded");
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
