import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Dialog } from './dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import {FormControl} from '@angular/forms';
import { MatSelect} from '@angular/material/select';
export interface PeriodicElement {
    id: number;
    name?: string;
    position?: number;
    weight?: number;
    symbol?: string;
}
export type MyDataSource = PeriodicElement[];
export enum Columns {
    key = 'key',
    value = 'value'
}
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
    selector: 'app-root',
    styleUrls: ['app.component.less'],
    templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
    constructor(public dialog: MatDialog) { }
    toppings = new FormControl('');
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    selectOptions: string[] = ['position', 'name', 'weight', 'symbol'];
    columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
    defaultSource: MyDataSource = [
        { id: 1, position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    ];
    dataSource: MyDataSource = this.getData();
    dataToDisplay = new ExampleDataSource(this.dataSource);
    selectionChange(e: any) {
        this.columnsToDisplayWithExpand = [...e.value, 'expand'];
    }
    getData(): MyDataSource {
        return this.defaultSource;
    }
    addData() {
        const dialogRef = this.dialog.open(Dialog, {
            width: '500px',
            data: {
                title: 'add',
                list: [
                    {
                        key: 'position',
                        value: '',
                    },
                    {
                        key: 'name',
                        value: '',
                    },
                    {
                        key: 'weight',
                        value: '',
                    },
                    {
                        key: 'symbol',
                        value: '',
                    },
                ],
            },
        });
        dialogRef.afterClosed().subscribe((result: Record<string, string>[]) => {
            const obj: any = {
                id: this.dataSource[this.dataSource.length - 1].id + 1,
                position: 0,
                name: '',
                weight: 0,
                symbol: ''
            };
            result.forEach((item) => {
                obj[item['key']] = item['value'];
            });
            this.dataSource.push(obj);
            this.dataToDisplay.setData(this.dataSource);
        });
    }
    editData(obj: any) {
        const dialogRef = this.dialog.open(Dialog, {
            width: '500px',
            data: {
                title: 'edit',
                list: [
                    {
                        key: 'position',
                        value: obj['position'],
                    },
                    {
                        key: 'name',
                        value: obj['name'],
                    },
                    {
                        key: 'weight',
                        value: obj['weight'],
                    },
                    {
                        key: 'symbol',
                        value: obj['symbol'],
                    },
                ],
            },
        });
        dialogRef.afterClosed().subscribe((result: Record<string, string>[]) => {
            result.forEach((item) => {
                obj[item['key']] = item['value'];
            });
            for (let key of this.dataSource) {
                if (key.id === obj.id) {
                    key = obj;
                }
            }
            this.dataToDisplay.setData(this.dataSource);
        });
        
    }
    removeData(id: number) {
        for (let i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].id === id) {
                this.dataSource.splice(i, 1);
            }
        }
        this.dataToDisplay.setData(this.dataSource);
    }
}
class ExampleDataSource extends DataSource<PeriodicElement> {
    private _dataStream = new ReplaySubject<PeriodicElement[]>();

    constructor(initialData: PeriodicElement[]) {
        super();
        this.setData(initialData);
    }

    connect(): Observable<PeriodicElement[]> {
        return this._dataStream;
    }

    disconnect() { }

    setData(data: PeriodicElement[]) {
        this._dataStream.next(data);
    }
}
