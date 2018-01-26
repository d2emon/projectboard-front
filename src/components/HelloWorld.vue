<template>
  <v-container fluid>
    <div transition="fade-transition">
      <v-layout row wrap>
        <v-flex sm6 lg3>
          <v-card dark color="primary">
            <v-card-text class="width: 100%;">
              <v-btn icon slot="activator" absolute right>
                <v-icon>settings</v-icon>
              </v-btn>
              <v-menu>
                <v-btn icon slot="activator">
                  <v-icon>settings</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>Action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Another action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Something else here...</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title disabled>Disabled action</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <h4 class="mb-0">9.823</h4>
              <p>Members online</p>
              <div style="height: 200px;">Chart</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm6 lg3>
          <v-card dark color="primary">
            <v-card-text class="width: 100%;">
              <v-btn icon slot="activator" absolute right>
                <v-icon>settings</v-icon>
              </v-btn>
              <v-menu>
                <v-btn icon slot="activator">
                  <v-icon>settings</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>Action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Another action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Something else here...</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title disabled>Disabled action</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <h4 class="mb-0">9.823</h4>
              <p>Members online</p>
              <div style="height: 200px;">Chart</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm6 lg3>
          <v-card dark color="primary">
            <v-card-text class="width: 100%;">
              <v-btn icon slot="activator" absolute right>
                <v-icon>settings</v-icon>
              </v-btn>
              <v-menu>
                <v-btn icon slot="activator">
                  <v-icon>settings</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>Action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Another action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Something else here...</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title disabled>Disabled action</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <h4 class="mb-0">9.823</h4>
              <p>Members online</p>
              <div style="height: 200px;">Chart</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm6 lg3>
          <v-card dark color="primary">
            <v-card-text class="width: 100%;">
              <v-btn icon slot="activator" absolute right>
                <v-icon>settings</v-icon>
              </v-btn>
              <v-menu>
                <v-btn icon slot="activator">
                  <v-icon>settings</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-title>Action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Another action</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title>Something else here...</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-title disabled>Disabled action</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
              <h4 class="mb-0">9.823</h4>
              <p>Members online</p>
              <div style="height: 200px;">Chart</div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex sm6 lg3>
           <v-card dark color="secondary" class="width: 100%;">
             <v-card-text class="px-0">
               Chart
             </v-card-text>
           </v-card>
        </v-flex>
        <v-flex sm6 lg3>
           <v-card dark color="secondary">
             <v-card-text class="px-0">6</v-card-text>
           </v-card>
        </v-flex>
        <v-flex sm6 lg3>
           <v-card dark color="secondary">
             <v-card-text class="px-0">6</v-card-text>
           </v-card>
        </v-flex>
      </v-layout>

      <v-layout column align-center>
        <img src="@/assets/logo.png" alt="Vuetify.js" class="mb-5">
        <blockquote>
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-layout>
    </div>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
