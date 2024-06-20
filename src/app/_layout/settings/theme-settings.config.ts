// Default theme settings configurations

export const ThemeSettingsConfig = {
  colorTheme: 'dark', // light, semi-light, semi-dark, dark
  layout: {
    style: 'vertical', // style: 'vertical', horizontal,
    pattern: 'fixed' // fixed, boxed, static
  },
  menuColor: 'menu-dark', // Vertical: [menu-dark, menu-light] , Horizontal: [navbar-dark, navbar-light]
  navigation: 'menu-collapsible', // menu-collapsible, menu-accordation
  menu: 'expand', // collapse, expand
  header: 'fix', // fix, static
  footer: 'fix', // fix, static
  customizer: 'off', // on ,off
  headerIcons: {
    showmenu: 'off', // on, off
    maximize: 'off', // on, off
    search: 'off', // on, off
    internationalization: 'off', // on, off
    notification: 'off', // on, off
    email: 'off', // on, off
    menu: 'off' // on, off
  },
  brand: {
    brand_name: 'CAMovation Experten Seite',
    logo: {
      type: 'internal', // internal, url
      value: 'assets/images/bilder/logoname.png' // recommended location for custom images
      // type:'url',
      // value:'http://evolvision.com/wp-content/uploads/2018/01/envelope4-green.png'
    },
  },
  defaultTitleSuffix: 'CAMovation Experten Seite'
};
