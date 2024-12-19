import axios from "axios";
import { defineStore } from "pinia";

export const useGestionModuleStore = defineStore("gestionModule", {
  state: () => ({
    modules: [],
    searchQuery: "",

    currentIndex: 0,
    module: null,
  }),
  actions: {
    getModule() {
      return this.modules.filter((module) =>
        module.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    async getModuleById(id) {
      try {
        const resp = await axios.get(`http://localhost:4000/api/modules/${id}`);
        console.log("Module récupéré par ID :", resp.data);
        return resp.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du module :", error);
        return null;
      }
    },

    async fetchModules() {
      try {
        const resp = await axios.get("http://localhost:4000/api/modules");
        console.log("Modules récupérés:", resp.data); // Ajout du log ici
        return (this.modules = resp.data.map((module) => ({
          id: module.id,
          name: module.name,
          duration: module.duration,
          price: module.price,
          status: module.status,
        })));
      } catch (error) {
        console.error("Erreur lors de la récupération des modules :", error);
      }
    },

    async addModule(moduleData) {
      try {
        await axios.post("http://localhost:4000/api/modules", moduleData);
      } catch (error) {
        console.error("Erreur lors de l'ajout du module : ", error);
        throw error;
      }
    },

    async updateModule(id, data) {
      try {
        console.log("Données envoyées au backend pour la mise à jour:", data); // Vérifier les données envoyées
        const response = await axios.put(
          `http://localhost:4000/api/modules/${id}`,
          data
        );
        console.log("Réponse après mise à jour du module:", response.data); // Vérifier la réponse du backend
        // Mettez à jour le module dans le store si nécessaire
        const index = this.modules.findIndex((module) => module.id === id);
        if (index !== -1) {
          this.modules[index] = response.data; // Met à jour le module dans le store
        }
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

    async deleteModule(id) {
      try {
        await axios.delete(`http://localhost:4000/api/modules/${id}`);
        // Optionnel : Mettez à jour la liste des utilisateurs si elle est gérée globalement
        this.modules = this.modules.filter((module) => module.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'apprenant :", error);
        throw error;
      }
    },
  },
});
