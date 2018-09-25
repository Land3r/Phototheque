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
      wrapper: { // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '', // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Galleries',
      url: '/galleries',
      icon: 'fa fa-image',
    },
    {
      divider: true,
    },
    {
      name: 'Quitter',
      url: '/exit',
      icon: 'fa fa-power-off',
      class: 'mt-auto',
      variant: 'danger',
    },
  ],
};
