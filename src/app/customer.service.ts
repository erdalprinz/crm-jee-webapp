import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Customer } from './customer';

@Injectable()
export class CustomerService {
    private customersUrl = 'http://localhost:8081/crm-jee/customer';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getCustomers(): Promise<Customer[]> {
        return this.http.get(this.customersUrl + '/getCustomerList')
            .toPromise()
            .then(response => response.json() as Customer[])
            .catch(this.handleError);
    }

    addCustomer(customer: Customer): Promise<Customer> {
        return this.http
            .post(this.customersUrl, JSON.stringify(customer), { headers: this.headers })
            .toPromise()
            .then(response => response.json() as Customer)
            .catch(this.handleError);
    }

    deleteCustomer(id: number): Promise<void> {
        return this.http.delete(this.customersUrl + '/' + id, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}