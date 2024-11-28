export type Message = {
  code: string;
  message: string;
  referencedBy: string;
};

export type ValidatorCreator = (
  path: string[],
  message: Message,
  overrideConfig?: object
) => [string[], [[(o: object) => boolean, string, [object]]]];

export type ValidatorFunction = (o: object) => boolean;

export type Wrapper = (
  validator: ValidatorFunction
) => (value: object) => boolean;


// types.ts

export interface LineItem {
  name: {
    en: string;
  };
  variant: {
    sku: string;
  };
  price: {
    value: {
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
  };
  quantity: number;
}

export interface Order {
  customerEmail: string;
  orderNumber: string;
  lineItems: LineItem[];
  totalPrice: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  store?: {
    typeId: string;
    key: string;
  };
}

export interface RawOrder {
  customerEmail: string;
  orderNumber: string;
  lineitems: {
    variant: {
      sku: string;
    };
    price: number;
    quantity: string;
  };
  totalPrice: number;
}
