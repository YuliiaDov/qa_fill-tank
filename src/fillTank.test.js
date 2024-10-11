'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

let customer;

  beforeEach(() => {
    customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };
  });

  it('should fill tank fully if no amount provided', () => {
    fillTank(customer, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it(`should not exceed tank capacity if more fuel requested`, () => {
    fillTank(customer, 50, 50);
    expect(customer.vehicle.fuelRemains).toBe(40);
    expect(customer.money).toBe(1400);
  });

  it(`should not exceed customer's available money`, () => {
    customer.money = 500;
    fillTank(customer, 100, 20);
    expect(customer.vehicle.fuelRemains).toBe(13);
    expect(customer.money).toBe(0);
  });

  it(`should round fuel amount and price correctly`, () => {
    fillTank(customer, 47.567, 10);
    expect(customer.vehicle.fuelRemains).toBe(18);
    expect(customer.money).toBeCloseTo(2524.33);
  });

  it('should not pour fuel if rounded amount is less than 2 liters', () => {
    fillTank(customer, 1000, 1.5);
    expect(customer.vehicle.fuelRemains).toBe(8);
    expect(customer.money).toBe(3000);
  });
});
