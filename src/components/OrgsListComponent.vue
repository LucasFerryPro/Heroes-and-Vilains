<template>
  <v-card>
    <v-card-title>Organisations</v-card-title>
    <v-card-text>
      <v-data-table
          :headers="headers"
          :items="orgs"
          :items-per-page="100"
          class="elevation-1"
          @click:row="selectOrg"
      ></v-data-table>
    </v-card-text>
    <v-card-actions>

      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
            Nouvelle organisation
          </v-btn>
        </template>

        <v-card>
          <v-card-title>{{ dialogTitle }}</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="createOrg">
              <v-text-field v-model="orgName" label="Nom" required></v-text-field>
              <v-text-field v-model="orgPassword" label="Mot de passe" required></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Annuler
            </v-btn>

            <v-btn color="blue darken-1" text @click="createOrg">
              Sauvegarder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      headers: [
        {text: "ID", value: "_id"},
        {text: "Nom", value: "name"},
        {text: "Actions", value: "actions", sortable: false},
      ],
      dialog: false,
      orgName: "",
      orgPassword: "",
      selectedOrgId: null,
    };
  },
  computed: {
    dialogTitle() {
      return this.selectedOrgId
          ? "Modifier l'organisation"
          : "Créer une organisation";
    },
    orgs () {
      return this.$store.state.orgs;
    },
  },
  methods: {
    ...mapActions(["fetchOrgs", "createNewOrg"]),
    selectOrg(org) {
      this.selectedOrgId = org._id;
      this.$router.push({name: "OrgDetails", params: {id: org._id}});
    },
    async createOrg() {
      const org = {
        name: this.orgName,
        secret: this.orgPassword
      };
      await this.$store.dispatch("createOrg", org);
      this.dialog = false;
    },
  },
  mounted() {
    this.fetchOrgs();
  },
};
</script>