import { SideBarModel, SideBarView, SideBarController } from '../layout/sidebar';

const sidebarModel = new SideBarModel();
const sidebarView = new SideBarView();
const sidebarController = new SideBarController(sidebarModel, sidebarView);

sidebarController.init();
