import { SideBarModel } from './model';
import { SideBarView } from './view';

interface HandleSideBarController {
  init: () => void;
}

export class SideBarController implements HandleSideBarController {
  sidebarModel: SideBarModel;
  sidebarView: SideBarView;

  constructor(sidebarModel: SideBarModel, sidebarView: SideBarView) {
    this.sidebarModel = sidebarModel;
    this.sidebarView = sidebarView;
  }

  init(): void {
    this.sidebarView.initSideBar();
  }
}
