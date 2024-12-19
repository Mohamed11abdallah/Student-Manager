import axios from "axios";
import { defineStore } from "pinia";

export const useGestionStudentStore = defineStore("gestionStudent", {
  state: () => ({
    students: [],
    searchQuery: "",

    currentIndex: 0,
    student: null,
  }),
  actions: {
    getStudent() {
      return this.students.filter((student) =>
        student.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },

    async getStudentById(id) {
      try {
        const resp = await axios.get(
          `http://localhost:4000/api/students/${id}`
        );
        console.log(resp.data);

        return resp.data;
      } catch (error) {
        console.error("Erreur lors de la récupération de l'apprenant:", error);
        return null;
      }
    },
    async fetchStudents() {
      try {
        const resp = await axios.get("http://localhost:4000/api/students");
        return (this.students = resp.data.map((student) => ({
          id: student.id,
          name: student.fullName,
          email: student.email,
          phoneNumber: student.phoneNumber,
          address: student.address,
          tutor: student.tutor,
          status: student.status,
        })));
      } catch (error) {
        console.error("Erreur lors de la récupération des apprenants :", error);
      }
    },

    async addStudent(studentData) {
      try {
        await axios.post("http://localhost:4000/api/students", studentData);
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'apprenant : ", error);
        throw error;
      }
    },

    async updateStudent(id, data) {
      try {
        const response = await axios.put(
          `http://localhost:4000/api/students/${id}`,
          data
        );
        console.log("Student mis à jour :", response.data);
        return response.data;
      } catch (error) {
        console.error("Erreur lors de la mise à jour de l'étudiant : ", error);
        throw error;
      }
    },

    async deleteStudent(id) {
      try {
        await axios.delete(`http://localhost:4000/api/students/${id}`);
        // Optionnel : Mettez à jour la liste des utilisateurs si elle est gérée globalement
        this.students = this.students.filter((student) => student.id !== id);
      } catch (error) {
        console.error("Erreur lors de la suppression de l'apprenant :", error);
        throw error;
      }
    },
  },
});
