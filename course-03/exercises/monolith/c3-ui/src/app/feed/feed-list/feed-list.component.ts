import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedItem } from '../models/feed-item.model';
import { FeedProviderService } from '../services/feed.provider.service';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss'],
})
export class FeedListComponent implements OnInit {
  @Input() feedItems: FeedItem[];
  subscriptions: Subscription[] = [];

  constructor(private feed: FeedProviderService) { }

  async ngOnInit() {
    this.subscriptions.push(
      this.feed.currentFeed$.subscribe((items) => {
        this.feedItems = items;
      }));

      await this.feed.getFeed();
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }
}
