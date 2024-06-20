import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, HostListener, Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConstants } from 'src/app/_helpers/app.constants';
import { AuthService } from 'src/app/_services/auth.service';
import { DeviceDetectorService } from '../../../_services/device-detector.service';
import { NavbarService } from '../../../_services/navbar.service';
import { MenuSettingsService } from '../../settings/menu-settings.service';
import { ThemeSettingsService } from '../../settings/theme-settings.service';

const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
  mozRequestFullScreen(): Promise<void>;
  webkitRequestFullscreen(): Promise<void>;
  msRequestFullscreen(): Promise<void>;
};

const docWithBrowsersExitFunctions = document as Document & {
  mozCancelFullScreen(): Promise<void>;
  webkitExitFullscreen(): Promise<void>;
  msExitFullscreen(): Promise<void>;
};
@Component({
  selector: 'app-header-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.css']
})
export class HorizontalComponent implements OnInit, AfterViewInit {

  insideTm: any;
  outsideTm: any;
  private _unsubscribeAll: Subject<any>;
  brandName: string;
  brandLogo: string;
  public currentUser: any;
  public _themeSettingsConfig: any;
  private _menuSettingsConfig: any;
  public displayName: boolean;
  public isHeaderSearchOpen: any;
  public maximize: any;
  public search: any;
  public internationalization: any;
  public notification: any;
  public email: any;
  public menu: any;
  // public collapseOne = false;
  // public collapseTwo = false;
  // public collapseThree = false;
  public selectedHeaderNavBarClass: string;
  public selectedNavBarHeaderClass: string;
  placement = 'bottom-right';

  public config: PerfectScrollbarConfigInterface = { wheelPropagation: false };
  @ViewChild(PerfectScrollbarComponent, { static: false }) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _renderer: Renderer2,
    private renderer: Renderer2,
    private navbarService: NavbarService,
    public authService: AuthService,
    private router: Router,
    private _menuSettingsService: MenuSettingsService,
    private _themeSettingsService: ThemeSettingsService,
    private deviceService: DeviceDetectorService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    const _self = this;
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    // Subscribe to config changes
    this._themeSettingsService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this._themeSettingsConfig = config;
        this.refreshView();
      });
    this._menuSettingsService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this._menuSettingsConfig = config;
      });
    const isMobile = this.deviceService.isMobile();
    this.handleBody(isMobile);
    this.maximize = this._themeSettingsConfig.headerIcons.maximize;
    this.search = this._themeSettingsConfig.headerIcons.search;
    this.internationalization = this._themeSettingsConfig.headerIcons.internationalization;
    this.notification = this._themeSettingsConfig.headerIcons.notification;
    this.email = this._themeSettingsConfig.headerIcons.email;
    this.menu = this._themeSettingsConfig.headerIcons.menu;
   }

  ngAfterViewInit(): void {
    this.refreshView();
  }

  handleBody(isMobile: boolean) {
    const _self = this;
    let currentBodyClassList = [];

    if (window.innerWidth < AppConstants.MOBILE_RESPONSIVE_WIDTH_HORIZONTAL && this._themeSettingsConfig.layout.style === 'horizontal') {
      currentBodyClassList = ['horizontal-layout', '2-columns', 'vertical-overlay-menu', 'menu-hide'];
      currentBodyClassList.push('fixed-navbar');
    }
    currentBodyClassList.forEach(function (c) {
      _self.renderer.addClass(document.body, c);
    });
  }

  logout() {
    if (localStorage.getItem('currentUser')) {
      this.authService.doLogout().then(res => {
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      });
    }
  }

  refreshView() {
    const topHeaderElement = document.getElementsByClassName('top-header');
    const menuColorElement = document.getElementsByClassName('menu-header');
    const navigationElement = document.getElementsByClassName('menu-header');
    if (topHeaderElement) {
      if (this._themeSettingsConfig.colorTheme === 'light') {
        this._renderer.removeClass(topHeaderElement.item(0), 'navbar-dark');
        this._renderer.addClass(topHeaderElement.item(0), 'navbar-light');
      } else if (this._themeSettingsConfig.colorTheme === 'dark') {
        this._renderer.addClass(topHeaderElement.item(0), 'navbar-dark');
        this._renderer.removeClass(topHeaderElement.item(0), 'navbar-light');
      }
    }
    if (this._themeSettingsConfig.layout.style === 'horizontal') {
      this.selectedHeaderNavBarClass = this._themeSettingsConfig.color;
    } else if (this._themeSettingsConfig.layout.style === 'horizontal') {
      this.selectedHeaderNavBarClass = this._themeSettingsConfig.color;
    }
    if (navigationElement) {
      if (this._themeSettingsConfig.navigation === 'navbar-icon-right') {
        this._renderer.addClass(navigationElement.item(0), 'navbar-icon-right');
      }
    }
    if (menuColorElement) {
      if (this._themeSettingsConfig.menuColor === 'navbar-dark') {
        this._renderer.removeClass(menuColorElement.item(0), 'navbar-light');
        this._renderer.addClass(menuColorElement.item(0), 'navbar-dark');
      } else if (this._themeSettingsConfig.menuColor === 'navbar-light') {
        this._renderer.removeClass(menuColorElement.item(0), 'navbar-dark');
        this._renderer.addClass(menuColorElement.item(0), 'navbar-light');
      }
    }
  }

  toggleFixMenu(e) {
    if (this.document.body.classList.contains('menu-expanded')) {
      // show the left aside menu
      this.document.body.classList.remove('menu-expanded');
      this.document.body.classList.add('menu-collapsed');
    } else {
      this.document.body.classList.remove('menu-collapsed');
      this.document.body.classList.add('menu-expanded');
    }
  }
  toggleNavbar(e) {
    const navbar = this.document.getElementById('navbar-mobile');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    } else {
      navbar.classList.add('show');
    }
  }
  toggleNavigation(e) {
    const sidenav = document.getElementById('sidenav-overlay');
    const sidebarLeft = document.getElementById('sidebar-left') || document.getElementById('email-app-menu') ||
    document.getElementById('sidebar-todo');
    const contentOverlay = document.getElementById('content-overlay');
    const navbar = this.document.getElementById('navbar-mobile');

    if (this.document.body.classList.contains('menu-hide')) {
      this.document.body.classList.remove('menu-hide');
      this._renderer.removeClass(sidenav, 'd-none');
      this._renderer.addClass(sidenav, 'd-block');
      this.document.body.classList.remove('menu-close');
      this.document.body.classList.add('menu-open');
      this.document.body.classList.add('menu-expanded');
      navbar.classList.remove('show');
    } else if (!this.document.body.classList.contains('menu-hide') && !this.document.body.classList.contains('menu-open') ) {
      this.document.body.classList.add('menu-open');
      this._renderer.addClass(sidenav, 'd-block');
      this._renderer.removeClass(sidenav, 'd-none');
    } else {
      this._renderer.removeClass(sidenav, 'd-block');
      this.document.body.classList.remove('menu-open');
      this.document.body.classList.add('menu-hide');
      this._renderer.addClass(sidenav, 'd-none');
      navbar.classList.remove('show');
    }

    if (sidebarLeft) {
      this._renderer.removeClass(sidebarLeft, 'show');
      this._renderer.removeClass(contentOverlay, 'show');
    }
  }

  toggleFullScreen() {
    const toggleIcon = document.getElementsByClassName('ficon');

    if (toggleIcon.item(0).classList.contains('ft-maximize')) {
      this.openfullscreen();
      this._renderer.removeClass(toggleIcon.item(0), 'ft-maximize');
      this._renderer.addClass(toggleIcon.item(0), 'ft-minimize');
    } else if (toggleIcon.item(0).classList.contains('ft-minimize')) {
      this.closefullscreen();
      this._renderer.addClass(toggleIcon.item(0), 'ft-maximize');
      this._renderer.removeClass(toggleIcon.item(0), 'ft-minimize');
    }
  }

  openfullscreen() {
    // Trigger fullscreen
    // eslint-disable-next-line no-shadow,@typescript-eslint/no-shadow
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };

    if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
      docElmWithBrowsersFullScreenFunctions.requestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
      docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
    } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
    } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
      docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
    }
  }

  closefullscreen() {
    // eslint-disable-next-line no-shadow, @typescript-eslint/no-shadow
    const docWithBrowsersExitFunctions = document as Document & {
      mozCancelFullScreen(): Promise<void>;
      webkitExitFullscreen(): Promise<void>;
      msExitFullscreen(): Promise<void>;
    };
    if (docWithBrowsersExitFunctions.exitFullscreen) {
      docWithBrowsersExitFunctions.exitFullscreen();
    } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
      docWithBrowsersExitFunctions.mozCancelFullScreen();
    } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      docWithBrowsersExitFunctions.webkitExitFullscreen();
    } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
      docWithBrowsersExitFunctions.msExitFullscreen();
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const sidenav = document.getElementById('sidenav-overlay');
    if (event.target.innerWidth <= 767) {
      this.document.body.classList.add('vertical-overlay-menu');
      this._renderer.removeClass(sidenav, 'd-block');
      this._renderer.addClass(sidenav, 'd-none');
    }
  }

  public clickSearch() {
    if (this.isHeaderSearchOpen) {
      this.isHeaderSearchOpen = false;
    } else {
      this.isHeaderSearchOpen = true;
    }
  }
}
