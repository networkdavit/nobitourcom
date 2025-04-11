import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalUrlService {

  constructor(@Inject(DOCUMENT) private doc: any) { }
  createLinkForCanonicalURL(canonicalURL) {
    let oldlink: HTMLLinkElement = this.doc.querySelector('link[rel=canonical]');
    if (oldlink) {
    oldlink.remove();
    }
    let link: HTMLLinkElement = this.doc.createElement('link');
    link.setAttribute('rel', 'canonical');
    this.doc.head.appendChild(link);
    link.setAttribute('href', canonicalURL);
  }
}
