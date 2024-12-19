<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import { useGestionStore } from "../../store/gestionRegister";
import { onMounted, ref } from "vue";
const students = ref([]);

import { useToast } from "vue-toastification";
import Addpayement from "./Addpayement.vue";
import EditPayement from "./EditPayement.vue";
import { useGestionModuleStore } from "../../store/gestionModule";
const storeModule = useGestionModuleStore();
import { useGestionStudentStore } from "../../store/gestionStudent";
import { useGestionPayementStore } from "../../store/gestionPayment";

const store = useGestionPayementStore();
const storeStudent = useGestionStudentStore();
const showDetails = ref(false);
const selectedPayment = ref(null);
const add = ref(false);
const editC = ref(false);
const toast = useToast();
function editCust() {
  editC.value = true;
}
const viewDetails = (payment) => {
  selectedPayment.value = payment;
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
function openModal(payment) {
  selectedPayment.value = payment;
}

function closeModal() {
  showDetails.value = false;
  selectedPayment.value = null;
}
const payments = ref([]);
async function getPayment() {
  try {
    payments.value = await store.fetchPayements();
    console.log(payments.value);
  } catch (error) {
    console.error("Erreur lors de la récupération des apprenant:", error);
  }
}

onMounted(async () => {
  await getPayment();
});

const selectedPaye = ref(null);
const destroy = (payment) => {
  selectedPaye.value = payment; // Assigner l'administrateur sélectionné
  if (!selectedPaye.value) {
    toast.error("Aucun payement sélectionné");
    return;
  }
  if (window.confirm("Confirm the deletion of this payement")) {
    const index = payments.value.findIndex(
      (payment) => payment.id === selectedPaye.value.id
    );
    if (index !== -1) {
      const paymentId = payments.value[index].id;
      store.deletePayement(paymentId);
      payments.value.splice(index, 1);
      toast.success("payement supprimé avec succès");
    } else {
      toast.error("payement non trouvé");
    }
  }
};
</script>

<template>
  <NavBar />
  <div class="container mb-4 mt-4">
    <h2>List of Payments</h2>
  </div>
  <div class="container d-flex justify-content-end mb-2">
    <button class="btn btn-info" @click="newCust()">
      <i class="fa fa-plus" aria-hidden="true"></i> Add New Payement
    </button>
  </div>

  <div class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Payement Date</th>

          <th scope="col">Payer</th>
          <th scope="col">Payement Number</th>
          <th scope="col">Payement Mode</th>
          <th scope="col">Amount</th>

          <th scope="col">Module</th>
          <th scope="col">Student</th>
          <th scope="col">Registration</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(payment, index) in payments" :key="payment.id">
          <td>{{ index + 1 }}</td>
          <td>{{ formatDate(payment.paymentDate) }}</td>
          <td>{{ payment.payer }}</td>
          <td>{{ payment.payerNumber }}</td>
          <td>{{ payment.paymentMode }}</td>
          <td>{{ payment.amount }}</td>
          <td>{{ payment.module }}</td>
          <td>{{ payment.student }}</td>
          <td>{{ payment.registration }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary"
              @click="openModal(payment)"
            >
              <i class="fa fa-eye" aria-hidden="true"></i>
            </button>
            <button type="button" class="btn btn-warning" @click="editCust()">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="destroy(payment)"
            >
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal-overlay" v-if="selectedPayment">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">View Payement</h5>
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
            <strong>Payment Date :</strong>
            {{ formatDate(selectedPayment.paymentDate) }}
          </li>
          <li><strong>Amount:</strong> {{ selectedPayment.amount }}</li>
          <li><strong>Payer :</strong>{{ selectedPayment.payer }}</li>
          <li>
            <strong>Payer Number :</strong> {{ selectedPayment.payerNumber }}
          </li>
          <li>
            <strong>Payer Mode :</strong> {{ selectedPayment.paymentMode }}
          </li>
          <li><strong>Module :</strong> {{ selectedPayment.module }}</li>
          <li><strong>Student :</strong> {{ selectedPayment.student }}</li>
          <li>
            <strong>Registration :</strong> {{ selectedPayment.registration }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <Addpayement
    v-if="add"
    :add="add"
    @close="add = false"
    @paymentAdded="getPayment()"
  />
  <EditPayement
    v-if="editC"
    :editC="editC"
    @close="editC = false"
    @paymentAdded="getPayment()"
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
