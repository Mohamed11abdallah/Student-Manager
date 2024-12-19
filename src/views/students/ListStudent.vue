<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { useGestionStudentStore } from "../../store/gestionStudent";
import { onMounted, ref } from "vue";
const students = ref([]);
import EditStudent from "../students/EditStudent.vue";
import AddStudent from "../students/AddStudent.vue";
import { useToast } from "vue-toastification";
const store = useGestionStudentStore();
const showDetails = ref(false);
const selectedStudent = ref(null);
const add = ref(false);
const editC = ref(false);
const toast = useToast();
function editCust() {
  editC.value = true;
}
const viewDetails = (student) => {
  selectedStudent.value = student;
  showDetails.value = true;
};

function newCust() {
  add.value = true;
}
function openModal(student) {
  selectedStudent.value = student;
}

function closeModal() {
  showDetails.value = false;
  selectedStudent.value = null;
}

async function getStudent() {
  try {
    students.value = await store.fetchStudents();
    console.log(students.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des apprenant:", error);
  }
}

onMounted(async () => {
  await getStudent();
});

const destroy = async (student) => {
  if (!student) {
    toast.error("Aucun étudiant sélectionné");
    return;
  }
  if (window.confirm("Confirm the deletion of this student")) {
    const index = students.value.findIndex((stud) => stud.id === student.id);
    if (index !== -1) {
      try {
        await store.deleteStudent(student.id); // Appel API pour supprimer
        students.value.splice(index, 1); // Retirer l'étudiant de la liste locale
        toast.success("Etudiant supprimé avec succès");
      } catch (error) {
        toast.error("Erreur lors de la suppression de l'étudiant");
      }
    } else {
      toast.error("Etudiant non trouvé");
    }
  }
};
</script>

<template>
  <NavBar />
  <div class="container mb-4 mt-4">
    <h2>List of Students</h2>
  </div>
  <div class="container d-flex justify-content-end mb-2">
    <button class="btn btn-info" @click="newCust()">
      <i class="fa fa-user-plus" aria-hidden="true"></i> Add New Student
    </button>
  </div>

  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Name</th>

          <th scope="col">Email</th>
          <th scope="col">Tutor</th>
          <th scope="col">Phone</th>
          <th scope="col">status</th>
          <th scope="col">Adress</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students" :key="student.id">
          <td>{{ index + 1 }}</td>
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.tutor }}</td>
          <td>{{ student.phoneNumber }}</td>
          <td>{{ student.status }}</td>
          <td>{{ student.address }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="viewDetails(student)"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-warning" @click="editCust()">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-danger" @click="destroy(st)">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal-overlay" v-if="showDetails">
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
          <li><strong>Student Name :</strong> {{ selectedStudent.name }}</li>
          <li><strong>Address :</strong> {{ selectedStudent.address }}</li>
          <li><strong>Email :</strong> {{ selectedStudent.email }}</li>
          <li><strong>Phone :</strong> {{ selectedStudent.phoneNumber }}</li>

          <li><strong>Tutor :</strong> {{ selectedStudent.tutor }}</li>
          <li><strong>Status :</strong> {{ selectedStudent.status }}</li>
        </ul>
      </div>
    </div>
  </div>

  <AddStudent
    v-if="add"
    :add="add"
    @close="add = false"
    @studentAdded="getStudent()"
  />
  <EditStudent
    v-if="editC"
    :editC="editC"
    @close="editC = false"
    @studentAdded="getStudent()"
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
