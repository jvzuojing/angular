import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.html'
})
export class Dialog {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<Dialog>,
        
    ) {
    }
    ngOnInit() {
        console.log(this.data)
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
}