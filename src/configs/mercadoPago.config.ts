import { MercadoPagoConfig, Payment } from 'mercadopago';
const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export const payment = new Payment(client);
