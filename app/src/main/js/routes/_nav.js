export default {
  items: [
    {
      name: 'Accueil',
      url: '/',
      icon: 'fa fa-home',
    },
    {
      divider: true,
    },
    {
      title: true,
      name: 'Galleries',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Galleries',
      url: '/galleries',
      icon: 'fa fa-image'
    },
    {
      name: 'Gallerie 1',
      url: '/galleries/1',
      icon: 'fa fa-image'
    },
    {
      divider: true,
    },
    {
      name: 'Exit',
      url: 'https://www.google.fr',
      icon: 'fa fa-power-off',
      variant: 'danger',
    },
  ],
};
