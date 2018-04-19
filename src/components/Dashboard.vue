<template>
  <div class="card-columns p-3">
    <div v-for="item in cardItems" class="card">
      <img v-if="item.cardImg != undefined && item.cardImg.position === 'top'" class="card-img-top img-fluid mx-auto" :src="item.cardImg.src" :alt="item.cardImg.alt">
      <div class="card-body">
        <h5 class="card-title"><a :href="'#' + item.route">{{ item.title }}</a></h5>
        <h6 class="card-subtitle mb-2">{{ item.subtitle }}</h6>
        <p class="card-text" v-html="item.content"></p>
      </div>
      <img v-if="item.cardImg != undefined && item.cardImg.position === 'bot'" class="card-img-bot img-fluid mx-auto" :src="item.cardImg.src" :alt="item.cardImg.alt">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardItems: [
        {
          route: '/profiles',
          title: 'Profiles',
          subtitle: 'Profiles are containers for configurations',
          content: 'Using profiles you can create different set of settings for your instances. For example a production and a test environment.',
        },
        {
          route: '/instances',
          title: 'Instances',
          subtitle: 'Servers and clients',
          content: 'Here you can configure, start and stop servers and clients. Also you can navigate through their configuration trees or send commands to.',
        },
        {
          route: '/media',
          title: 'Media',
          subtitle: 'Add and update media sources',
          content: 'Here you can add new sources for third party media repositories. Also you can update these repositories.',
        },
        {
          route: '/servers',
          title: 'Server Network',
          subtitle: 'Locate server providers and their provided servers',
          content: 'Here you add and update the list of server providers. Also you can start the client and instantly connect to the selected server.',
        },
        {
          route: '/interfaces',
          title: 'Interfaces',
          subtitle: 'Manage the user interfaces',
          content: 'Here you add and update the user interfaces like the HUD or a third party admin panel.',
        },
        {
          route: '/info',
          title: 'Information',
          subtitle: 'Information about the server.',
          content: 'You can find system information and logs here.',
        },
        {
          route: '/releases',
          title: 'Releases',
          subtitle: 'Manage Inexor-releases',
          content: 'See and manage old and new inexor releases.',
        },
        {
          route: '/logging',
          title: 'Logging',
          subtitle: 'Configure log levels',
          content: 'In case you have to debug you can adjust the log levels.',
        },
        {
          route: 'https://www.inexor.org/',
          title: 'Inexor',
          subtitle: 'An open-source first person shooter forked from Cube 2',
          // cardImg: {
          //   position: 'bot',
          //   src: '/static/img/inexor-logo.svg',
          //   alt: 'Inexor Logo',
          // },
          content: 'For further information about Inexor check out the brand new website! <img class="d-block mx-auto" style="max-width: 100px;" src="/static/img/inexor-logo.svg" alt="Inexor Logo">',
        },
      ],
    };
  },
};
</script>
