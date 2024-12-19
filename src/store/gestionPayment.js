import axios from "axios";
import { defineStore } from "pinia";

export const useGestionPayementStore = defineStore("gestionPayement", {
  state: () => ({
    payements: [],
    searchQuery: "",

    currentIndex: 0,
    payment: null,
  }),
  actions: {
    getPayement() {
      return this.payments.filter((payment) =>
        payment.payer.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    async getPaymentById(id) {
      try {
        const resp = await axios.get(
          `http://localhost:4000/api/payments/${id}`
        );
        console.log(resp.data);

        return resp.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du payement:", error);
        return null;
      }
    },
    async fetchPayements() {
        try {
          const resp = await axios.get("http://localhost:4000/api/payments");
          return (this.payements = resp.data.map((payement) => ({
            id: payement.id,
            paymentDate: payement.paymentDate,
            payer: payement.payer,
            payerNumber: payement.payerNumber,
            paymentMode: payement.paymentMode,
            amount: payement.amount,
            module: payement.registration?.module?.name || 'N/A',
            student: payement.registration?.student?.fullName || 'N/A',
            registration: payement.registration?.id || 'N/A',
          })));
        } catch (error) {
          console.error("Erreur lors de la récupération des payements :", error);
        }
      },
      

    async addPayment(payementData) {
      try {
        await axios.post("http://localhost:4000/api/payments", payementData);
      } catch (error) {
        console.error("Erreur lors de l'ajout du payement : ", error);
        throw error;
      }
    },

    async updatePayement(id, data) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/payments/${id}`,
          data
        );
        console.log("Payement mis à jour avec succès :", response.data);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error("Erreur côté serveur :", error.response.data);
        } else {
          console.error("Erreur lors de la requête :", error.message);
        }
        throw error;
      }
    },

    async deletePayement(id) {
      try {
        await axios.delete(`http://localhost:4000/api/payments/${id}`);
        // Optionnel : Mettez à jour la liste des utilisateurs si elle est gérée globalement
        this.payements = this.payements.filter(
          (payement) => payement.id !== id
        );
      } catch (error) {
        console.error("Erreur lors de la suppression de l'apprenant :", error);
        throw error;
      }
    },
  },
});
