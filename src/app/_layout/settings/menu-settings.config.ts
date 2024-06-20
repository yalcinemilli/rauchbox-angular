// Default menu settings configurations

import { UserResponse } from "src/app/open-api";

export interface MenuItem {
  title: string;
  icon: string;
  image: string;
  page: string;
  isExternalLink?: boolean;
  issupportExternalLink?: boolean;
  badge: { type: string, value: string };
  submenu: {
    items: Partial<MenuItem>[];
  };
  section: string;
  userLevelControl: boolean;
  userlevel: number;
}

export interface MenuConfig {
  vertical_menu: {
    items: Partial<MenuItem>[]
  };
}
var user: UserResponse = JSON.parse(sessionStorage.getItem('currentUser'));
var name: string = '';
var level: number = 0;
console.log(user);
if (user != null) {
  name = user.vorname + ' ' + user.nachname;
  level = user.userlevel;
}

export const MenuSettingsConfig: MenuConfig = {
  vertical_menu: {
    items: [
      {
        title:  name,
        image: 'assets/images/bilder/camologo.png',
        page: '/editprofil',
      },
      {
        title: 'Users',
        icon: 'la la-users',
        page: '/users',
        userLevelControl: true,
        userlevel: level
      },
      {
        title: 'Kunden',
        icon: 'la la-th',
        page: '/kunden'
      },
      {
        title: 'Leitstellen',
        icon: 'la la-phone',
        page: '/leitstellen'
      },
      {
        title: 'Lieferanten',
        icon: 'la la-truck',
        page: '/lieferanten'
      },
      {
        title: 'Logout',
        icon: 'feather ft-power',
        page: '/logout'
      }
    ]
  }

};





