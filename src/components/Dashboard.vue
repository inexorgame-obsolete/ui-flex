<template>
  <div class="dashboard">
    <div class="container" style="margin: 10px;">
      <div class="row" style="margin: 10px;">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-header>
              <div class="md-title"><a href="#/profiles">Profiles</a></div>
              <div class="md-subhead">Profiles are containers for configurations</div>
            </md-card-header>
            <md-card-content>
              Using profiles you can create different set of settings for your instances. For example a production and a test environment.
            </md-card-content>
          </md-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-header>
              <div class="md-title"><a href="#/instances">Instances</a></div>
              <div class="md-subhead">Servers and clients</div>
            </md-card-header>
            <md-card-content>
              Here you can configure, start and stop servers and clients. Also you can navigate through their configuration trees or send commands to. 
            </md-card-content>
          </md-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-header>
              <div class="md-title"><a href="#/media">Media</a></div>
              <div class="md-subhead">Add and update media sources</div>
            </md-card-header>
            <md-card-content>
              Here you can add new sources for third party media repositories. Also you can update these repositories.
            </md-card-content>
          </md-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-header>
              <div class="md-title"><a href="#/servers">Server Network</a></div>
              <div class="md-subhead">Locate server providers and their provided servers</div>
            </md-card-header>
            <md-card-content>
              Here you add and update the list of server providers. Also you can start the client and instantly connect to the selected server.
            </md-card-content>
          </md-card>
        </div>
      </div>
      <div class="row" style="margin: 10px;">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-header>
              <div class="md-title"><a href="#/interfaces">Interfaces</a></div>
              <div class="md-subhead">Manage the user interfaces</div>
            </md-card-header>
            <md-card-content>
              Here you add and update the user interfaces like the HUD or a third party admin panel.
            </md-card-content>
          </md-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-header>
              <div class="md-title"><a href="#/logging">Logging</a></div>
              <div class="md-subhead">Configure log levels</div>
            </md-card-header>
            <md-card-content>
              In case you have to debug you can adjust the log levels.
            </md-card-content>
          </md-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <md-card>
            <md-card-media>
              <img src="../assets/inexor-logo.svg" alt="Inexor">
            </md-card-media>
            <md-card-header>
              <div class="md-title"><a href="https://www.inexor.org/">Inexor</a></div>
              <div class="md-subhead">An open-source first person shooter forked from Cube 2</div>
            </md-card-header>
            <md-card-content>
              For further information about Inexor check out the brand new website!
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>
