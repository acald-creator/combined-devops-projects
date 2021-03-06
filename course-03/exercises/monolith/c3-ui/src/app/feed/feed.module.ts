import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedProviderService } from './services/feed.provider.service';
import { FeedUploadComponent } from './feed-upload/feed-upload.component';
import { FeedListComponent } from './feed-list/feed-list.component';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedUploadButtonComponent } from './feed-upload/feed-upload-button/feed-upload-button.component';

const entryComponents = [FeedUploadComponent];
const components = [FeedListComponent, FeedItemComponent, FeedUploadComponent, FeedUploadButtonComponent];

@NgModule({
  declarations: components,
  imports: [
    CommonModule
  ],
  exports: components,
  entryComponents,
  providers: [FeedProviderService]
})
export class FeedModule { }
