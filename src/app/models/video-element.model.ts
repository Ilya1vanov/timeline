import { Metadata } from './metadata';

export class VideoElement {
  constructor(
    readonly metadata: Metadata,
    readonly guid?: string,
  ) {
  }
}
