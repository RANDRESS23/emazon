import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ARROW_LEFT_ICON_PATH, ARROW_RIGHT_ICON_PATH } from '@src/app/shared/domain/constants/admin';

@Component({
  selector: 'atom-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  pathArrowLeft: string = ARROW_LEFT_ICON_PATH;
  pathArrowRight: string = ARROW_RIGHT_ICON_PATH;
  
  pages: number[] = [];
  pagesActives: number[] = [];
  pageMin = 0;
  pageMax = 0;
  showArrowLeft = false;
  showArrowRight = false;
	
  @Input() pageNumber: number = 0;
  @Input() totalPages: number = 0;
  @Output() pageNumberChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalPages']) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.pagesActives = this.pages.slice(this.pageNumber, this.pageNumber + 5);
      this.pageMin = Math.min(...this.pages);
      this.pageMax = Math.max(...this.pages);

      if (this.pageMax > 5) this.showArrowRight = true;
    }
  }

  changePage(event: any) {
    this.pageNumber = Number(event.srcElement.innerText) - 1;
    this.pageNumberChange.emit(this.pageNumber);
  }

  nextPage() {
    this.pageNumber++;

    if (!this.pagesActives.find((page) => page === this.pageNumber + 1)) {
      this.pagesActives = this.pages.slice(this.pagesActives[0], this.pagesActives[4] + 1)
    }

    if (!this.pagesActives.find((page) => page === this.pageMin)) {
      this.showArrowLeft = true;
    } else this.showArrowLeft = false;

    if (!this.pagesActives.find((page) => page === this.pageMax)) {
      this.showArrowRight = true;
    } else this.showArrowRight = false;

    this.pageNumberChange.emit(this.pageNumber);
  }

  previousPage() {
    this.pageNumber--;
    
    if (!this.pagesActives.find((page) => page === this.pageNumber + 1)) {
      this.pagesActives = this.pages.slice(this.pageNumber, this.pagesActives[4] - 1)
    }
    
    if (!this.pagesActives.find((page) => page === this.pageMin)) {
      this.showArrowLeft = true;
    } else this.showArrowLeft = false;

    if (!this.pagesActives.find((page) => page === this.pageMax)) {
      this.showArrowRight = true;
    } else this.showArrowRight = false;

    this.pageNumberChange.emit(this.pageNumber);
  }
}
