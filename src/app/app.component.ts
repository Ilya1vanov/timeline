import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { VIDEO_ELEMENTS } from './data/video-elements';
import { VideoElement } from './models/video-element.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  @Output() elementHover = new EventEmitter<VideoElement>();

  readonly colors = _.shuffle([
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ]);

  videoDuration = 60000;

  timelinePoints: number[];

  chunckedVideoElements: VideoElement[][];

  currentTime = 0;

  ngOnInit(): void {
    this.chunckedVideoElements = this.calculateChunks(VIDEO_ELEMENTS);

    this.timelinePoints = _.times(7, index => this.videoDuration / 6 * index);
  }

  onMouseOver(stitch: VideoElement): void {
    this.elementHover.emit(stitch);
  }

  moveCurrentTime(event: MouseEvent): void {
    this.currentTime = (event.x - 8) / 500 * this.videoDuration;
  }

  trackByGuid(item: VideoElement): string {
    return item.guid;
  }

  private calculateChunks(videoElements: VideoElement[]): VideoElement[][] {
    return _.reduce(
      videoElements,
      (accum, currentElement) => {
        const currentRow = _.last(accum);
        const lastElement = _.last(currentRow);
        if (!lastElement || lastElement.metadata.startTime + lastElement.metadata.duration < currentElement.metadata.startTime) {
          currentRow.push(currentElement);
          return accum;
        }
        accum.push([currentElement]);
        return accum;
      },
      [[]],
    );
  }
}
