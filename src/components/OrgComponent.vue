<template>
  <v-container>
    <v-row v-if="currentOrg">
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title>{{ currentOrg.name }}</v-card-title>
          <v-card-text>
            <p><strong>ID:</strong> {{ currentOrg._id }}</p>
            <p><strong>Nom:</strong> {{ currentOrg.name }}</p>
            <p><strong>Mot de passe:</strong> {{ currentOrg.secret }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="editOrg">Modifier</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <v-alert type="error">Aucune organisation sélectionnée.</v-alert>
        <v-btn color="primary" @click="goToList">Retour à la liste des organisations</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          Modifier l'organisation
        </v-btn>
      </template>

      <v-card>
        <v-card-title>Modifier l'organisation</v-card-title>

        <v-card-text>
          <v-form @submit.prevent="saveOrg">
            <v-text-field v-model="editedOrg.name" label="Nom" required></v-text-field>
            <v-text-field v-model="editedOrg.secret" label="Mot de passe" required></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Annuler
          </v-btn>

          <v-btn color="blue darken-1" text @click="saveOrg">
            Sauvegarder
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-row v-if="currentOrg">
      <v-col>
        <h2>Liste des équipes</h2>
        <ul>
          <li v-for="(team, index) in teams" :key="index">
            {{ team.name }}
            <v-btn color="primary" text @click="selectTeam(team._id)">Sélectionner</v-btn>
            <v-btn color="error" text @click="confirmDeleteTeam(team._id)">Supprimer</v-btn>
          </li>
        </ul>

        <v-btn color="primary" @click="addTeamDialog = true">Ajouter une équipe</v-btn>

        <v-dialog v-model="addTeamDialog" max-width="500px">
          <v-card>
            <v-card-title>Ajouter une équipe</v-card-title>

            <v-card-text>
              <v-select v-model="selectedTeam" :items="availableTeams" label="Équipe"></v-select>
            </v-card-text>

            <v-card-actions>
              <v-btn color="blue darken-1" text @click="addTeamDialog = false">
                Annuler
              </v-btn>

              <v-btn :disabled="!selectedTeam" color="blue darken-1" text @click="addTeam">
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      dialog: false,
      editedOrg: {},
      addTeamDialog: false,
      selectedTeam: null
    }
  },
  computed: {
    currentOrg() {
      return this.$store.state.currentOrg;
    },

    org() {
      return this.$store.state.currentOrg;
    },
    teams() {
      return this.org ? this.org.teams : [];
      },
    recruitableTeams() {
      const currentTeamIds = this.teams.map((team) => team._id);
      return this.$store.state.teams.filter((team) => !currentTeamIds.includes(team._id));
    },

  },
  methods: {
    ...mapActions(['selectOrg']),
    async saveOrg() {
      await this.updateOrg(this.editedOrg);
      this.dialog = false;
    },
    editOrg() {
      this.editedOrg = Object.assign({}, this.org);
      this.dialog = true;
    },
    async selectTeam(team) {
      await this.getOrg(team.organizationId);
      await Promise.all(team.memberIds.map((id) => this.$store.dispatch('getUser', id)));
      this.$router.push(`/teams/${team._id}`);
    },
    async removeTeam(team) {
      const confirmDelete = await this.$confirm(`Êtes-vous sûr de vouloir supprimer l'équipe ${team.name} ?`, 'Confirmation', {
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
        type: 'warning',
      });

      if (confirmDelete) {
        await this.removeTeamFromOrg(team._id);
        await this.getOrg(this.org._id);
      }
    },
    async addTeam(team) {
      await this.addTeamToOrg(team._id);
      await this.getOrg(this.org._id);
      this.selectedTeamToAdd = null;
    },
    goToList() {
      this.$router.push('/orgs');
    }
  },
  mounted() {
    this.selectOrg(this.$route.params.id)
  }
}
</script>
