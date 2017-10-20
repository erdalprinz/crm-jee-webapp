import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
    constructor(private customerService: CustomerService) { }

    customers: Customer[];
    selectedCustomer: Customer;

    onSelect(customer: Customer): void {
        this.selectedCustomer = customer;
    }

    getCustomers(): void {
        this.customerService.getCustomers().then(customers => this.customers = customers);
    }

    ngOnInit(): void {
        this.getCustomers();
    }

    addCustomer(customer: Customer): void {
        if (!customer) { return; }
        this.customerService.addCustomer(customer).
            then(customer => {
                this.customers.push(customer);
                this.selectedCustomer = null;
            });
    }

    deleteCustomer(customer: Customer): void {
        this.customerService.deleteCustomer(customer.id)
            .then(() => {
                this.customers = this.customers.filter(c => c !== customer);
                if (this.selectedCustomer === customer) {
                    this.selectedCustomer = null;
                }
            });
    }

}