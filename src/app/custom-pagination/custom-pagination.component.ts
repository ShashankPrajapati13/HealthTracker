import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent implements OnChanges {
  @Input() id: string = '';
  @Input() maxSize: number = 5;
  @Input() directionLinks: boolean = true;
  @Input() autoHide: boolean = false;
  @Input() responsive: boolean = false;
  @Input() previousLabel: string = 'Previous';
  @Input() nextLabel: string = 'Next';
  @Input() page: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() data: any[] = [];

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['page'] || changes['data']) {
      this.checkPageData();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
      this.checkPageData(page);
    }
  }

  private checkPageData(currentPage?: number) {
    const page = currentPage || this.page;
    const startIdx = (page - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    const currentPageData = this.data.slice(startIdx, endIdx);

    if (currentPageData.length === 0 && page > 1) {
      this.changePage(page - 1);
    }
  }
}
