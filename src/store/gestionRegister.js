import axios from "axios";
import { defineStore } from "pinia";


export const useGestionStore = defineStore("gestion", {
    state: () => ({
      registrations: [],
      searchQuery: "",
      
      
      currentIndex: 0,
      registration: null,
      
    }),
    actions: {
        getRegistration(){
            return this.registrations.filter((registration) =>
                registration.dateRegister.toLowerCase().includes(this.searchQuery.toLowerCase())
              );
        },


        async getRegistrationById(id) {
            try {
              const resp = await axios.get(
                `http://localhost:4000/api/registrations/${id}`
              );
              console.log(resp.data);
      
              return resp.data;
            } catch (error) {
              console.error(
                "Erreur lors de la récupération de l'inscription:",
                error
              );
              return null;
            }
          },
          async fetchRegistrations() {
            try {
              const resp = await axios.get("http://localhost:4000/api/registrations");
              console.log(resp);
              return (this.registrations = resp.data.map((registration) => ({
                id: registration.id,
                dateRegister: registration.dateRegister,
                startDate: registration.startDate,
                endDate: registration.endDate,
                amount: registration.amount,
                rest: registration.rest,
                student: registration.student, // Inclure les données de l'étudiant
                module: registration.module,   // Inclure les données du module
              })));
            } catch (error) {
              console.error(
                "Erreur lors de la récupération des apprenants :",
                error
              );
            }
          },
          

          async addRegistration(registrationData) {
            try {
              await axios.post("http://localhost:4000/api/registrations", registrationData);
              
            } catch (error) {
              console.error("Erreur lors de l'ajout du registration : ", error);
              throw error;
            }
          },

         

          async updateRegistration(id, data) {
            try {
              const response = await axios.put(`http://localhost:4000/api/registrations/${id}`, data,);
              console.log("registration mis à jour avec succès :", response.data);
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
          
      
          async deleteRegistration(id) {
            try {
              await axios.delete(`http://localhost:4000/api/registrations/${id}`);
              // Optionnel : Mettez à jour la liste des utilisateurs si elle est gérée globalement
              this.registrations = this.registrations.filter((registration) => registration.id !== id);
            } catch (error) {
              console.error("Erreur lors de la suppression de l'apprenant :", error);
              throw error;
            }
          },
    }

})