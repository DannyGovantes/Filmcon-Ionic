import { Component } from '@angular/core';
import { FeedPage } from "../feed/feed";
import { SearchPage } from "../search/search";
import { NotificationsPage } from "../notifications/notifications";



@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1Root=FeedPage;
  tab2Root=SearchPage;
  tab3Root=NotificationsPage;
}
